/*
@title Web Screen Grab
@input
{
  "content-type" : "text/uri-list",
  "example" : "http://google.com"
}
@output
{
  "content-type" : "image/png"
}
@pragma editor
*/

var puppeteer = require('puppeteer');

module.exports = async function(ctx, res) {
  const browser = await puppeteer.launch({
      headless: true,
      ignoreHTTPSErrors: true,
      timeout: 10000
  });

  const page = await browser.newPage();

  await page.setViewport({width: 1920, height: 1080});

  await page.goto('https://reddit.com/');

  let image = await page.screenshot({ fullPage: true });

  browser.close();

  res.set('Content-Type', 'image/png');

  return image;
};
