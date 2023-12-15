import express from "express";
import axios from "axios";
import ejs from "ejs";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", async (req, res) => {
    res.render("index.ejs");
});
app.post("/check-weather", async (req, res) => {
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    // console.log(latitude);
    // console.log(longitude);
    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: {q: `${latitude}, ${longitude}`},
        headers: {
          'X-RapidAPI-Key': 'f0a24dc6d4msh171c17786e66cc9p18985ajsn18a99fed4a5f',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        // console.log(response.data.current.condition.text);
        res.render("weather.ejs", {resPonse: response.data});
    } catch (error) {
        console.error(error);
    }
});

app.post("/check-weatherbyloc", async (req, res) => {
  const location = req.body.Location;
  // const longitude = req.body.longitude;
  // console.log(latitude);
  // console.log(longitude);
  const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/current.json',
      params: {q: `${location}`},
      headers: {
        'X-RapidAPI-Key': 'f0a24dc6d4msh171c17786e66cc9p18985ajsn18a99fed4a5f',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
  };
  try {
      const response = await axios.request(options);
      // console.log(response.data.current.condition.text);
      res.render("weather.ejs", {resPonse: response.data});
  } catch (error) {
      console.error(error);
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});