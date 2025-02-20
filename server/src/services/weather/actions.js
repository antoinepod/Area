const axios = require("axios");

const weatherToken = process.env.WEATHER_TOKEN;


const parseTemperatureData = (data) => {
  if (data.current.temperature < 0)
    return "(Weather)\n\n" + data.request.query + "\n\nIt's freezing, get your coat ready !";
  else
    return "(Weather)\n\n" + data.request.query + "\n\nIt stopped freezing, you can put your coat away.";
};

exports.getTemperature = async (req, res) => {
  await axios
    .get(`http://api.weatherstack.com/current?access_key=${weatherToken}&query=${req.body.data}`)
    .then((response) => {
      const prev = req.body.previous;
      const current = parseTemperatureData(response.data);
      if (prev !== undefined && prev !== "" && prev !== current)
        return res.status(201).json({"changed": true, "current": current});
      else
        return res.status(200).json({"changed": false, "current": current});
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({"changed": false, "current": req.body.previous, "error": err});
    });
};

const parseWeatherData = (data) => {
  if (data.current.precip > 0)
    return "(Weather)\n\n" + data.request.query + "\n\nIt's raining, get your umbrella ready !";
  else
    return "(Weather)\n\n" + data.request.query + "\n\nIt stopped raining, you can put your umbrella away.";
};

exports.getWeather = async (req, res) => {
  await axios
    .get(`http://api.weatherstack.com/current?access_key=${weatherToken}&query=${req.body.data}`)
    .then((response) => {
      const prev = req.body.previous;
      const current = parseWeatherData(response.data);
      if (prev !== undefined && prev !== "" && current !== prev)
        return res.status(201).json({"changed": true, "current": current});
      else
        return res.status(200).json({"changed": false, "current": current});
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({"changed": false, "current": req.body.previous, "error": err});
    });
};

const parseWindData = (data) => {
  if (data.current.wind_speed > 80)
    return "(Weather)\n\n" + data.request.query + "\n\nIt's very windy, be careful when going out !";
  else
    return "(Weather)\n\n" + data.request.query + "\n\nThe wind has calmed down, you can go back outside quietly.";
};

exports.getWind = async (req, res) => {
  await axios
    .get(`http://api.weatherstack.com/current?access_key=${weatherToken}&query=${req.body.data}`)
    .then((response) => {
      const prev = req.body.previous;
      const current = parseWindData(response.data);
      if (prev !== undefined && prev !== "" && current !== prev)
        return res.status(201).json({"changed": true, "current": current});
      else
        return res.status(200).json({"changed": false, "current": current});
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({"changed": false, "current": req.body.previous, "error": err});
    });
};

const parseSunData = (data) => {
  if (data.current.is_day === "yes")
    return "(Weather)\n\n" + data.request.query + "\n\nThe sun is rising, have a nice day !";
  else
    return "(Weather)\n\n" + data.request.query + "\n\nThe sun is setting, good evening and good night !";
};

exports.getSun = async (req, res) => {
  await axios
    .get(`http://api.weatherstack.com/current?access_key=${weatherToken}&query=${req.body.data}`)
    .then((response) => {
      const prev = req.body.previous;
      const current = parseSunData(response.data);
      if (prev !== undefined && prev !== "" && current !== prev)
        return res.status(201).json({"changed": true, "current": current});
      else
        return res.status(200).json({"changed": false, "current": current});
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({"changed": false, "current": req.body.previous, "error": err});
    });
};