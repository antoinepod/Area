const axios = require("axios");


exports.getTemperature = async (req, res) => {
  const weatherToken = process.env.WEATHER_TOKEN;

  await axios
    .get(`http://api.weatherstack.com/current?access_key=${weatherToken}&query=${req.body.city}`)
    .then((response) => {
      const prev = req.body.previous;
      const current = response.data.current.temperature;
      if (prev !== undefined && prev !== "" && prev > 0 && current <= 0)
        return res.status(201).json({"changed": true, "data": current});
      else
        return res.status(200).json({"changed": false, "data": current});
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({"changed": false, "data": req.body.previous, "error": err});
    });
};

exports.getWeather = async (req, res) => {
  const weatherToken = process.env.WEATHER_TOKEN;

  await axios
    .get(`http://api.weatherstack.com/current?access_key=${weatherToken}&query=${req.body.city}`)
    .then((response) => {
      const prev = req.body.previous;
      const current = response.data.current.precip;
      if (prev !== undefined && prev !== "" && current !== prev && prev === 0 && current >= 0)
        return res.status(201).json({"changed": true, "data": current});
      else
        return res.status(200).json({"changed": false, "data": current});
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({"changed": false, "data": req.body.previous, "error": err});
    });
};
