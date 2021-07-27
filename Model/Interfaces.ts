interface tripDetails {
  startLocation: string,
  endLocation: string,
  transporation: string
}

//v1/search?layers=locality&text=new york
//https://api.openrouteservice.org/geocode/search?api_key=your-api-key&text=Namibian%20Brewery&layers=locality
export interface IRouteServiceGetReq {
  key: string,
  cityName: string,
  layers?: string
}

export interface ICoordinates {
  x: number,
  y: number
}

export interface IORServiceModel {
  locations: number[][],
  metrics?: string[],
  units?: string
}
