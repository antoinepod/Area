const axios = require("axios");


function getCorrectDate(date) {
  return date.getDate() + " " + date.toLocaleString('en-US', {month: 'long'});
}

const parseData = (data) => {
  const tab = [];
  const results = data.MRData.RaceTable.Races[0].Results;
  tab.push("(F1 - Race) - Season " + data.MRData.RaceTable.Races[0].season + "\n");
  tab.push(data.MRData.RaceTable.Races[0].raceName + " - " + getCorrectDate(new Date(data.MRData.RaceTable.Races[0].date)));
  tab.push("");
  for (var i = 0; i < data.MRData.RaceTable.Races[0].Results.length; i++) {
    tab.push(results[i].position);
    tab[i + 3] += " - " + results[i].Driver.givenName + " " + results[i].Driver.familyName;
    tab[i + 3] += " (" + results[i].Constructor.name + ")";
  }

  return(tab.join('\n'));
};

exports.getLastRace = async (req, res) => {
  await axios
    .get(`http://ergast.com/api/f1/current/last/results.json`)
    .then((response) => {
      const prev = req.body.previous;
      const current = parseData(response.data);
      if (prev !== undefined && prev !== "" && prev != current)
        return res.status(201).json({"changed": true, "current": current});
      else
        return res.status(200).json({"changed": false, "current": current});
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({"changed": false, "current": req.body.previous, "error": err});
    });
};

const parseDataQua = (data) => {
  const tab = [];
  const results = data.MRData.RaceTable.Races[0].QualifyingResults;
  tab.push("(F1 - Qualifying) - Season " + data.MRData.RaceTable.Races[0].season + "\n");
  tab.push(data.MRData.RaceTable.Races[0].raceName + " - " + getCorrectDate(new Date(data.MRData.RaceTable.Races[0].date)));
  tab.push("");
  for (var i = 0; i < data.MRData.RaceTable.Races[0].QualifyingResults.length; i++) {
    tab.push(results[i].position);
    tab[i + 3] += " - " + results[i].Driver.givenName + " " + results[i].Driver.familyName;
    tab[i + 3] += " (" + results[i].Constructor.name + ")";
  }

  return(tab.join('\n'));
};

exports.getLastQualif = async (req, res) => {
  await axios
    .get(`http://ergast.com/api/f1/current/last/qualifying.json`)
    .then((response) => {
      const prev = req.body.previous;
      const current = parseDataQua(response.data);
      if (prev !== undefined && prev !== "" && prev != current)
        return res.status(201).json({"changed": true, "current": current});
      else
        return res.status(200).json({"changed": false, "current": current});
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({"changed": false, "current": req.body.previous, "error": err});
    });
};
