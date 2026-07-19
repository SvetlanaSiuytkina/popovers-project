import { afterAll, beforeAll, expect, test } from "@jest/globals";
import puppeteer from "puppeteer";

describe('popover elements', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();
    
    test('form should render on page start', async () => {
      await page.goto('http://localhost:8080');
      await page.waitFor('.card-input');
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  test('the popover must be hidden', async () => {
    const popover = document.querySelector('.popover');
    expect().toBe();
  });
  
  test('the title and text should appear when you click', async () => {
    await page.click('.btn');
    
    expect().toBe();
  });
});