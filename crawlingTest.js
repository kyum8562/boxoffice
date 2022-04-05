const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

const getHtml = async () => {
  try {
    return await axios.get("https://www.yna.co.kr/sports/all");
  } catch (error) {
    console.error(error);
  }
};

getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.list-type038 ul.list li").children("li div.item-box01");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).find('div.news-con a.tit-wrap strong.tit-news').text(),
          url: $(this).find('div.news-con a.tit-wrap').attr('href'),
          image_url: $(this).find('figure.img-con a img').attr('src'),
          image_alt: $(this).find('figure.img-con a img').attr('alt'),
          summary: $(this).find('div.news-con p.lead').text().slice(0, -11),
          date: $(this).find('div.info-box01 span.txt-time').text()
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(res => log(res));