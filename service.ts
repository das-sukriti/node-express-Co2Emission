import { IRouteServiceGetReq, ICoordinates, IORServiceModel } from "./Model/Interfaces";
import { OPEN_ROUTE_KEY } from "./controller";
import axios, { AxiosRequestConfig } from "axios";
import https from "https";

//https://api.openrouteservice.org/geocode/search?api_key=5b3ce3597851110001cf62486d95faac1f804c309b9cef5e1b8f89f9&text=Hamburg&layers=locality
export async function fetchLocation(req: IRouteServiceGetReq): Promise<ICoordinates> {

  let fetchBaseURL = "https://api.openrouteservice.org/geocode/search?";
  let coord: ICoordinates;

  try {
    let fetchCoordURL = fetchBaseURL + "api_key=" + req.key + "&text=" + req.cityName + (req.layers ? "&layers=" + req.layers : '');

    let res: any = await axios.get(fetchCoordURL);
    console.log(res.data.feaures);
    coord = {
      x: res.data.features[0]?.geometry?.coordinates[0] ?? 0,
      y: res.data.features[0]?.geometry?.coordinates[1] ?? 0,
    };
    return coord;
  } catch (err) {
    console.log("Error fetching coordinates: " + err);
    throw err;
  }
}

export async function getDistance(req: IORServiceModel): Promise<number> {

  let oRServiceURL = "https://api.openrouteservice.org/v2/matrix/driving-car";
  let distance: number = 0;

  let reqOptions: AxiosRequestConfig = {
    method: "POST",
    url: oRServiceURL,
    data: req,
    headers: {
      "Authorization": OPEN_ROUTE_KEY
    }
  };

  try {

    let res: any = await axios(reqOptions);
    if (res.data) {
      distance = res.data.distances[0][1] ?? 0;
    }
    return distance;

  } catch (err) {
    console.log("Error calculating distance: " + err);
    throw err;
  }

};