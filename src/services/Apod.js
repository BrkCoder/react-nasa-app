export class Apod {
  constructor() {
    this.API_KEY = "[Your API KEY]";
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
}
