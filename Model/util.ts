import { ICoordinates, IORServiceModel } from "./Interfaces";
import { METRICS, UNITS } from "../controller"

import rateChart = require("./rateChart.json");

export function toReqModelConverter(locList: ICoordinates[]): IORServiceModel {
  let model: IORServiceModel = {
    locations: []
  }

  locList.forEach(item => {
    let arr = [];
    arr.push(item.x);
    arr.push(item.y);
    model.locations.push(arr);
  });
  model.metrics = METRICS;
  model.units = UNITS;

  return model;
}

export function calculateEmission (distance: number, transportation: string): string {
  let rates = JSON.parse(rateChart.toString());
  return (distance * rates[transportation]) + " " + rates.unit;
}