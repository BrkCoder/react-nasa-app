import { addDays } from "date-fns";
import startOfWeek from "date-fns/startOfWeek";
import startOfToday from "date-fns/startOfToday";

export class Apod {
  constructor() {
    this.API_KEY = "[Your API Key]";
    this.BASE_URL = "https://api.nasa.gov/planetary/apod";
  }

  async getPictureOfTheDay(date, hd) {
    const current = date || new Date();
    const dateParam = `${current.getFullYear()}-${
      current.getMonth() + 1
    }-${current.getDate()}`;
    const isHDParam = hd ? true : false;
    let response = await fetch(
      `${this.BASE_URL}?api_key=${this.API_KEY}&date=${dateParam}&hd=${isHDParam}`
    );
    let data = await response.json();
    return data;
  }

  async getAstronomyPicturesOfTheWeek() {
    const current = startOfToday();
    const past = startOfWeek(current);
    const pictures = [];
    for (let date = past; date <= current; date = addDays(date, 1)) {
      try {
        const picture = await this.getPictureOfTheDay(date, true);
        pictures.push(picture);
      } catch (e) {
        console.error(e);
      }
    }
    return pictures;
  }
}
