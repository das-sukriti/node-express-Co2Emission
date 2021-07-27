import { Request, Response } from "express";
import { IRouteServiceGetReq, ICoordinates, IORServiceModel } from "./Model/Interfaces";
import { fetchLocation, getDistance } from "./service";
import { toReqModelConverter, calculateEmission } from "./Model/util";

export const OPEN_ROUTE_KEY = '5b3ce3597851110001cf62486d95faac1f804c309b9cef5e1b8f89f9';
const LAYERS = 'locality';
export const METRICS = ['distance'];
export const UNITS = 'km';

//http://localhost:3000/api/co2Calculater/start/Hamburg/end/Berlin/transportation/small-diesel-car
const getEmission = async (req: Request, res: Response) => {

  let startLoc = req.params.start;
  let endLoc = req.params.end;
  let transportation = req.params.transportation;
  let locations: ICoordinates[] = [];

  //start location
  let openRouteReqStart: IRouteServiceGetReq = {
    key: OPEN_ROUTE_KEY,
    cityName: startLoc,
    layers: LAYERS
  };
  let startCoordinates: ICoordinates = await fetchLocation(openRouteReqStart);

  //end location
  let openRouteReqEnd: IRouteServiceGetReq = {
    key: OPEN_ROUTE_KEY,
    cityName: endLoc,
    layers: LAYERS
  };
  let endCoordinates: ICoordinates = await fetchLocation(openRouteReqEnd);

  locations.push(startCoordinates);
  locations.push(endCoordinates);
  let oRServiceModel: IORServiceModel = toReqModelConverter(locations);
  let distance:number = await getDistance(oRServiceModel);
  let emission:string = calculateEmission(distance, transportation);

  res.json({
    data: emission
  });
  res.sendStatus(200);
  return res;
}

const getTest = async (req: Request, res: Response) => {
  res.json({
    message: "test GET API"
  });
  res.sendStatus(200);
  return res;
}

export default { getEmission, getTest };