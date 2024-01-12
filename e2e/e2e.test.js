import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      headless: false, // show gui
      slowMo: 250,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('form should render on page start', async () => {
    await page.goto(baseUrl);

    await page.waitForSelector('.form');
  });

  test('form input should add class ".valid", if card number is valid', async () => {
    await page.goto(baseUrl);

    await page.waitForSelector('.form');

    const form = await page.$('.form');
    const input = await page.$('.input');
    const btn = await page.$('.btn');

    await input.type('4532835129103220');
    await btn.click();

    await page.waitForSelector('.form .input.valid');
  });

  test('form input should add class ".invalid", if card number is invalid', async () => {
    await page.goto(baseUrl);

    await page.waitForSelector('.form');

    const form = await page.$('.form');
    const input = await page.$('.input');
    const btn = await page.$('.btn');

    await input.type('4532835129');
    await btn.click();

    await page.waitForSelector('.form .input.invalid');
  });
});
