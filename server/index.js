const axios = require("axios");
const cheerio = require("cheerio");
var dayjs = require("dayjs");
dayjs().format();

async function getTournamentArray() {
  try {
    let start = dayjs().subtract(1, "week").format("YYYY-MM-DD");
    let end = dayjs().add(1, "week").format("YYYY-MM-DD");
    const { data } = await axios.get(
      `https://www.fencingtimelive.com/tournaments/list/data?from=${start}&to=${end}`
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function getEventIdentifierArray(tournamentID) {
  try {
    const { data: html } = await axios.get(
      `https://www.fencingtimelive.com/tournaments/eventSchedule/${tournamentID}`
    );
    const $ = cheerio.load(html);
    let eventArr = [];
    $(".clickable-row").each((i, elem) => {
      let eventID = $(elem).attr("data-href").substring(13);
      let eventName = $(elem).find("strong").text().replace(/\s+/g, " ").trim();
      eventArr.push({
        id: eventID,
        name: eventName,
      });
    });
    console.log(eventArr);
  } catch (error) {
    console.log(error);
  }
}

async function getRoundIdentifierArray(eventID) {
  try {
    const { data: html } = await axios.get(
      `https://www.fencingtimelive.com/events/competitors/${eventID}`
    );
    const $ = cheerio.load(html);
    let roundArr = [];
    $(".nav-link").each((i, elem) => {
      if ($(elem).text().includes("Pools")) {
        roundArr[0] = $(elem).attr("href").substring(47);
      } else if ($(elem).text().includes("Tableau")) {
        roundArr[1] = $(elem).attr("href").substring(50);
      }
    });
    console.log(roundArr);
  } catch (error) {
    console.log(error);
  }
}

async function getRoundSeeding(eventID, roundID) {
  try {
    const { data } = await axios.get(
      `https://www.fencingtimelive.com/rounds/seeding/data/${eventID}/${roundID}?order=asc`
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function getFencersInEvent(eventID) {
  try {
    const { data } = await axios.get(
      `https://www.fencingtimelive.com/events/competitors/data/${eventID}?sort=name&order=asc`
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function getRoundStripAssignments(eventID, roundID) {
  try {
    const { data } = await axios.get(
      `https://www.fencingtimelive.com/rounds/strips/data/${eventID}/${roundID}?sort=name&order=asc`
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function getFinalResults(eventID) {
  try {
    const { data } = await axios.get(
      `https://www.fencingtimelive.com/events/results/data/${eventID}?order=asc`
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
//getEventIdentifierArray("BBAA4DD351ED40458B4A439D7B805367");

//getTournamentArray();

//getRoundIdentifierArray("79473CECC5E94D97BF97C2DF5E4637B8");

/*
getRoundSeeding(
  "79473CECC5E94D97BF97C2DF5E4637B8",
  "243660BB6B654A54A6F2BEC02EB142CF"
);
*/

getRoundStripAssignments(
  "79473CECC5E94D97BF97C2DF5E4637B8",
  "243660BB6B654A54A6F2BEC02EB142CF"
);

//getFinalResults("79473CECC5E94D97BF97C2DF5E4637B8");
