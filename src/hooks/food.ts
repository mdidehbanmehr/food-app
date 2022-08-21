import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";

interface Position {
  latitude: number | undefined;
  longitude: number | undefined;
}

interface DestinationParams {
  origin: Position;
  destinations: Position[] | undefined;
}
interface LocationResults
  extends Omit<google.maps.places.PlaceResult, "photos" | "geometry"> {
  geometry: { location: { lat: number; lng: number } };
  photos: {
    height: number;
    html_attributions: object;
    photo_reference: string;
    width: number;
  }[];
}
interface responseNearby {
  html_attributions: string[];
  next_page_token: string;
  results: LocationResults[];
  status: string;
}
const API = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/",
  timeout: 10000,
});

const get = async <REQ, RES = undefined>(
  url: string,
  config?: AxiosRequestConfig | undefined
): Promise<AxiosResponse<RES>> => {
  return await API.get<REQ, AxiosResponse<RES>>(url, config);
};

const getResturants = async (params: Position) => {
  const url = `place/nearbysearch/json?location=${params.latitude}%2C${params.longitude}&type=restaurant&rankby=distance&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  const { data }: { data: responseNearby } = await get(url, {
    params,
  });
  return data;
};

const getDistance = async (
  params: DestinationParams
): Promise<google.maps.DistanceMatrixResponse> => {
  let url = `distancematrix/json?origins=${params.origin.latitude}%2C${params.origin.longitude}&destinations=`;
  if (params.destinations) {
    for (let i = 0; i < params.destinations.length; i++) {
      url += `${params.destinations[i].latitude}%2C${params.destinations[i].longitude}%7C`;
    }
    url =
      url.slice(0, -3) + `&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

    const { data }: { data: google.maps.DistanceMatrixResponse } = await get(
      url,
      {
        params,
      }
    );
    return data;
  }
  return Promise.reject(new Error("No location"));
};

export const useGetResturants = (params: Position) => {
  const { data: resturantsNearby } = useQuery(["getResturants", params], () =>
    getResturants(params)
  );
  const destinationCoords = resturantsNearby?.results.slice(10).map((res) => {
    return {
      latitude: res.geometry?.location?.lat,
      longitude: res.geometry?.location?.lng,
    };
  });
  const destinationQueryParams = {
    origin: params,
    destinations: destinationCoords,
  };
  const { data: resturantDistance, isLoading } = useQuery(
    ["getDistance", destinationQueryParams],
    () => getDistance(destinationQueryParams)
  );

  return { ...resturantsNearby, ...resturantDistance, isLoading };
};
