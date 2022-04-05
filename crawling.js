const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;
const resultList = [];
const getHtml = async () => {
  try {
    return await axios.get("https://movie.naver.com/movie/bi/mi/basic.naver?code=190695#");
  } catch (error) {
    console.error(error);
  }
};

async function getData(){
await getHtml()
  .then(html => {
    let result = {};
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.mv_info_area").children("div.mv_info");
    var title ;
    var rating;
    var summary;
    $bodyList.each(function(i, elem) {
          result['title']= $(this).find('h3.h_movie a').text().slice(0,-3);
          result['rating']= $(this).find('div.main_score div.score a.ntz_score div.star_score span.st_off span.st_on').text().slice(7);
          result['summary']= $(this).find('dl.info_spec dd p span a').text();
    });

    return result;
  })
  .then(res => {
      resultList.push(res);
    //   log(res)
    });
}
getData();
console.log(resultList);


module.exports = { getData };
