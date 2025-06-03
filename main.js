const puppeteer = require('puppeteer');

let browser;
let page;

(async () => {
    const { startCountdown } = await import('./auto.mjs');
    startCountdown().catch(console.error);
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        });
        page = await browser.newPage();

        /* Login */
        await page.goto('https://www.faucetearner.org/login.php', { waitUntil: 'domcontentloaded', timeout: 0 });
        await page.locator("input#email").fill("Daniella");
        await page.locator("input#password").fill("yNBp!$5cQEE0ItZ");
        await page.locator("button.btn-submit").click();

        let claimSelector = '#body > div.wrapper-parent.mm-show > div.content-wrap > div.main-content > div > div.row.mt-0 > div.col-12.col-md-8.col-lg-6.order-md-2.mb-4.text-center > form > button';

        /* Begin Automation */
        // Check for "Claim Now Button"
        await page.waitForSelector(claimSelector, {timeout: 0});
        console.log('Login Successful');
        let randomDelay = (()=>{ return Number((Math.random() * 10000).toFixed(0))})();
        let i = 0;
        while(true) {
            await page.waitForFunction(() => {
                const timeElement = document.querySelector('b#second');
                return timeElement && timeElement.innerHTML === '00';
            }, { timeout: 0});
            await new Promise(resolve=>setTimeout(resolve,randomDelay))
            await page.locator('#body > div.wrapper-parent.mm-show > div.content-wrap > div.main-content > div > div.row.mt-0 > div.col-12.col-md-8.col-lg-6.order-md-2.mb-4.text-center > form > button').click();
            await new Promise(resolve=>setTimeout(resolve,1500))
            await page.locator('button.btn-close')?.click();
            i++;
            console.log('Claimed ' + i + ' times')
        }
    } catch (error) {
        console.error('Error:', error);
    }
})();
