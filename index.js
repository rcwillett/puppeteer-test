const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36');
        await page.goto('https://www.whatismybrowser.com/', { waitUntil: 'domcontentloaded' });
        const technicalInfo = await page.$$('#technical-details .tech-detail-item');
        const browserInfoArray = await Promise.all(technicalInfo.map(async (element) => {
            const key = await element.$eval('.key', (keyElem) => keyElem.innerText);
            const value = await element.$eval('.value', (keyElem) => keyElem.innerText);
            return `${key}: ${value}`;
        }));
        console.log(browserInfoArray.join('\n'));
        const browserAgent = await page.$eval('.user-agent a', (elem) => elem.innerText);
        console.log(`browser agent: ${browserAgent}`);
    } catch (error) {
        console.log(error);
    }
})();