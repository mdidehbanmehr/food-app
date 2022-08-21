import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";

interface Position {
  latitude: number | undefined;
  longitude: number | undefined;
}

interface DestinationParams {
  origin: Position;
  destinations: Position[];
}
interface LocationResults
  extends Omit<google.maps.places.PlaceResult, "photos"> {
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

// interface responseDistance {
//   html_attributions: string[];
//   next_page_token: string;
//   results: google.maps.places.PlaceResult[];
//   status: string;
// }
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
export const useGetResturants = (params: Position) => {
  return useQuery(["getResturants", params], () => getResturants(params));
};

const getDistance = async (params: DestinationParams) => {
  let url = `distancematrix/json?origins=${params.origin.latitude}%2C${params.origin.longitude}&destinations=`;
  // ${params.destinationLatitude}%2C${params.destinationLongitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  for (let i = 0; i < params.destinations.length; i++) {
    url += `${params.destinations[i].latitude}%2C${params.destinations[i].longitude}%7C`;
  }
  url = url.slice(0, -2) + `&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  console.log(url);
  const { data }: { data: google.maps.DistanceMatrixResponse } = await get(
    url,
    {
      params,
    }
  );
  return data;
};
export const useGetDistance = (params: DestinationParams) => {
  return useQuery(
    ["getDistance", params],
    () => {
      getDistance(params);
    },
    { enabled: !!params }
  );
};
