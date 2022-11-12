const axios = require("axios");


const parseData = (data) => {
  const tab = [];
  tab.push(data.title);
  tab.push("");
  tab.push(data.explanation);
  tab.push("");
  tab.push(data.hdurl);

  return(tab.join('\n'));
};

exports.getLastPicture = async (req, res) => {
  const apiKey = process.env.NASA_TOKEN;

  await axios
    .get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
    .then((response) => {
      const prev = req.body.previous;
      const current = parseData(response.data);
      if (prev !== undefined && prev !== "" && prev != current)
        return res.status(201).json({"changed": true, "data": current});
      else
        return res.status(200).json({"changed": false, "data": current});
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({"changed": false, "data": req.body.previous, "error": err});
    });
};
