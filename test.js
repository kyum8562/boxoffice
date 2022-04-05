const {getData} = require("./crawling.js");

async function handleAsync() {
    const data = await getData();
    console.log(data);
    return data;
}

handleAsync()
