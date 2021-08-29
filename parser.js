const PUPPETEER = require('puppeteer');

let link = 'https://mir-knig.com/joke?sort=new&p_=';

module.exports = async function() {
    let counter = Math.floor(Math.random() * 5015) + 1;

    try {
        let browser = await PUPPETEER.launch({
            headless: true,
            slowMo: 100,
            args: ["--no-sandbox"]
        });

        let page = await browser.newPage();
        await page.setViewport({
            width: 1400,
            height: 900
        });

        await page.goto(`${link}${counter}`);
        await page.waitForSelector('a.last');

        let text = await page.evaluate(async () => {
            try {
                let res = '';
                let allDivs = document.querySelectorAll('div.col-product div.item');
                let randomDiv = allDivs[Math.floor(Math.random() * allDivs.length)];
                let paragraphs = randomDiv.querySelectorAll('p');

                paragraphs.forEach(paragraph => {
                    res = res + paragraph.innerHTML + "\n";
                });

                return res;
            } catch(error) {
                console.error('ERROR: ' + error);
            }

        }, {waitUntil: 'a.last'});

        await browser.close();
        return text;
    } catch(error) {
        console.error('ERROR: ' + error);
        await  browser.close();
    }
}