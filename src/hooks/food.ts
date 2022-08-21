import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useQuery } from "react-query";

interface Position {
  latitude: number;
  longitude: number;
}
interface DistanceMeasure {
  currentLatitude: number;
  currentLongitude: number;
  destinationLatitude: number;
  destinationLongitude: number;
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

const getDistance = async (params: DistanceMeasure) => {
  const url = `distancematrix/json?origins=${params.currentLatitude}%2C${params.currentLongitude}&destinations=${params.destinationLatitude}%2C${params.destinationLongitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  const { data }: { data: responseNearby } = await get(url, {
    params,
  });
  return data;
};
export const useGetDistance = (params: DistanceMeasure) => {
  return useQuery(["getDistance", params], () => getDistance(params));
};
