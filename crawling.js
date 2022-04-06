const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs')
const log = console.log;
var result = new Array();
const getHTML = async () => {
  try {
    return await axios.get("https://movie.naver.com/movie/bi/mi/basic.naver?code=190695#");
  } catch (error) {
    console.error(error);
  }
};

(async (keyWord) => {
  const html = await getHTML(keyWord);
  const $ = cheerio.load(html.data);
  const $bodyList = $("div.mv_info_area").children("div.mv_info");
  
  result = [];

  $bodyList.each(function(i, elem) {
    result.push({
      title: $(elem).find('h3.h_movie a').text().slice(0,-3),
      rating: $(elem).find('div.main_score div.score a.ntz_score div.star_score span.st_off span.st_on').text().slice(7),
      summary: $(elem).find('dl.info_spec dd p span a').text()
    });
  });
  // log(result);
})()
.then((res) => {result=res;} );
console.log(`result : ${result}`)
