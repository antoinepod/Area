const axios = require("axios");


function getCorrectDate(date) {
  return date.getDate() + " " + date.toLocaleString('en-US', {month: 'long'});
}

const parseData = (data) => {
  const tab = [];
  const results = data.MRData.RaceTable.Races[0].Results;
  tab.push("F1 - Season " + data.MRData.RaceTable.Races[0].season);
  tab.push(data.MRData.RaceTable.Races[0].raceName + " - " + getCorrectDate(new Date(data.MRData.RaceTable.Races[0].date)));
  tab.push("");
  for (var i = 0; i < data.MRData.RaceTable.Races[0].Results.length; i++) {
    tab.push(results[i].position);
    tab[i + 3] += " - " + results[i].Driver.givenName + " " + results[i].Driver.familyName;
    tab[i + 3] += " (" + results[i].Constructor.name + ")";
  }

  return(tab.join('%0A'));
};

exports.getLastRace = async (req, res) => {
  await axios
    .get(`http://ergast.com/api/f1/current/last/results.json`)
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
