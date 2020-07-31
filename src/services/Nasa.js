import { format } from "date-fns";

export class Nasa {
  constructor() {
    this.apiKey = "[Your api key]";
    this.api = "https://api.nasa.gov";
  }

  async Apod(date, hd) {
    const { api, apiKey } = this;
    const baseUrl = `${api}/planetary/apod`;
    const shortDateString = format(new Date(date), "yyyy-MM-dd");
    const url = `${baseUrl}/?date=${shortDateString}&hd=${hd}&api_key=${apiKey}`;
    const response = await fetch(url);
    return await response.json();
  }
}
