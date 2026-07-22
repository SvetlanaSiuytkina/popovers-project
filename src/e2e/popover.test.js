import { afterAll, beforeAll, expect, test, describe } from "vitest";
import puppeteer from "puppeteer";

let browser;
let page;

describe('popover elements', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });
    
    page = await browser.newPage();
  });
  
  afterAll(async () => {
    await browser.close();
  });
  
  test('page loads and popover is initially hidden', async () => {
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });
    
    //пров кнопка есть
    await page.waitForSelector('.btn');

    //ищем элемент .popover
    const popover = await page.$('.popover');
    expect(popover).toBeDefined();

    //провер класс visible отсутств
    const isVisible = await page.evaluate(() => {
      const el = document.querySelector('.popover');
      return el && el.classList.contains('visible');
    });

    expect(isVisible).toBe(false);
  });
  
  test('popover appears after clicking the button', async () => {
    await page.click('.btn');

    //ждем пока появится класс visible
    await page.waitForFunction(() => {
      const el = document.querySelector('.popover');
      return el && el.classList.contains('visible');
    }, 10000);
    
    //теперь проверяем в тесте
    const isVisible = await page.evaluate(() => {
      const el = document.querySelector('.popover');
      return el && el.classList.contains('visible');
    });
    
    expect(isVisible).toBe(true);
  });
    
  test('popover title and content are correct', async () => {
    await page.click('.btn');

    //cначала ждём появления поповер
    await page.waitForSelector('.popover.visible', { timeout: 10000 });

    //ждем пока у него появится класс visible
    await page.waitForFunction(() => {
      const el = document.querySelector('.popover');
      return el && el.classList.contains('visible');
    });
    
     //потом забираем текст через evaluate
    const titleText = await page.evaluate(() => {
      const el = document.querySelector('.popover-title');
      return el && el.textContent.trim();
    });
    
    const contentText = await page.evaluate(() => {
      const el = document.querySelector('.popover-content')
      return el && el.textContent.trim();
    });
    
    expect(titleText).toBe('Popover title');
    expect(contentText).toBe('I love you');
  });
}, 15000);