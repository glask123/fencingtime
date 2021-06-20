const express = require("express");
const router = express.Router();
const cheerio = require("cheerio");
const axios = require("axios");

router.get("/:memberid", async (req, res) => {
  try {
    const { data: html } = await axios.get(
      `https://member.usafencing.org/search/members?first=&last=&division=&inactive=&country=&id=${req.params.memberid}#find`
    );
    const $ = cheerio.load(html);
    let fencer = {
      division: "",
      club: "",
      country: "",
      membership: "",
      expires: "",
      foil: "",
      epee: "",
      sabre: "",
    };
    $('tr[itemprop="member"]').each(function (i, elem) {
      $(elem)
        .children()
        .each((index, element) => {
          switch (index) {
            case 2:
              fencer.division = $(element).text().trim();
              break;
            case 3:
              fencer.club = $(element).text().trim();
              break;
            case 4:
              fencer.country = $(element).text().trim();
              break;
            case 5:
              fencer.membership = $(element).text().trim();
              break;
            case 6:
              fencer.expires = $(element).text().trim();
              break;
            case 7:
              fencer.foil = $(element).text().trim();
              break;
            case 8:
              fencer.epee = $(element).text().trim();
              break;
            case 9:
              fencer.sabre = $(element).text().trim();
              break;
          }
        });
    });
    res.send(fencer);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
