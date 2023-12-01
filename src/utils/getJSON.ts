import puppeteer from 'puppeteer';

const getJSON = async (jsonURL: string) => {
  return new Promise(async (resolve, reject) => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Enable request interception
    await page.setRequestInterception(true);

    // Listen for request events
    page.on('request', (request) => {
      // Allow the request to continue
      request.continue();
    });

    page.on('response', async (response) => {
      const contentType = response.headers()['content-type'];
      if (contentType && contentType.includes('application/json')) {
        const jsonContent = await response.json();
        resolve(jsonContent);
      }
    });

    await page.goto(jsonURL);

    setTimeout(async () => {
      await browser.close();

      // Reject the promise if no JSON content was found
      reject(new Error('No JSON content found in the response.'));
    }, 1000);
  });
};

export default getJSON;
