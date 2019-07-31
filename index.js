'use strict';

const puppeteer = require('puppeteer');
const { 'iPhone X': deviceModel } = require('puppeteer/DeviceDescriptors');
const { readFileSync } = require('fs');
const targetLinks = readFileSync('./target.txt', 'utf-8').split('\n').filter(n => n);
const elementsRemoved = "#J_footer-container,.page-navigation-container,.page-comments-container";

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.emulate(deviceModel);
    for (let i = 0, j = targetLinks.length; i < j; i++) {
        await page.goto(targetLinks[i]);
        await page.evaluate((selector) => {
            const elements = document.querySelectorAll(selector);
            for (let i = 0; i < elements.length; i++) {
                elements[i].parentNode.removeChild(elements[i]);
            }
        }, elementsRemoved)
        await page.screenshot({ path: `./blog-${i}.png`, fullPage: true });
    }
    await browser.close();
})();