import puppeteer from 'puppeteer';

type HotelData = {
  name: string;
  rating: number;
  reviews: {
    rating: string;
    percentage: string;
  };
  location: string;
  description: string;
  latest: string;
  viewing: string;
};

const scrape = async (url: string) => {
  console.log('url', url);
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // to log stuff within page.evaluate
    page.on('console', (consoleObj) => console.log(consoleObj.text()));

    await page.goto(url);

    const results: HotelData[] = await page.evaluate(() => {
      const hotels = document.querySelectorAll('.result');
      const data: HotelData[] = [];

      for (const hotel of hotels) {
        const nameElement: HTMLElement = hotel.querySelector('.hotel3');
        const ratingElement: HTMLElement = hotel.querySelector('.rating');
        const reviewsElement: HTMLElement = hotel.querySelector('.reviews');
        const locationElement: HTMLElement = hotel.querySelector('.location');

        const name: string = nameElement?.innerText || '';
        const rating: string =
          reviewsElement?.innerText.substring(
            0,
            reviewsElement.innerText.lastIndexOf(' ')
          ) || '';
        const percentage: string =
          reviewsElement?.innerText
            .substring(reviewsElement.innerText.lastIndexOf(' '))
            .trim() || '';
        const location: string =
          locationElement?.querySelectorAll('b')[0]?.innerText || '';
        const latestElement: HTMLElement =
          locationElement?.querySelector('.purple');
        const latest: string = latestElement?.innerText || '';
        const viewing: string =
          locationElement?.querySelector('span')?.innerText || '';

        const starRating: HTMLElement = ratingElement.querySelector('.stars');

        const stars = starRating
          ? parseFloat(
              starRating.classList[1].replace('stars-', '').replace('-', '.')
            )
          : 0;

        data.push({
          name,
          rating: stars,
          reviews: {
            rating,
            percentage,
          },
          location,
          description: '',
          latest,
          viewing,
        });
      }

      // send the data back into the teams variable
      return data;
    });

    // log the data for testing purposes
    // console.log(JSON.stringify(results, null, 2));
    await browser.close();
    return results;
  } catch (error) {
    console.log(error);
  }
};

export default scrape;
