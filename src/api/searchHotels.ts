import getURL from '../utils/getURL';
import scrapeHotels from '../scrape/searchHotels';

const searchHotels = () => {
  const url =
    'https://www.hoteldirect.co.uk/webapp/hoteldirect/servlet/HDSearchDate?maxage=2&bk=Full+English+Breakfast&doubleroom=1&twin=0&triple=0&single=0&family1=0&family2=0&family3=0&web=yes&purpose=findavailablehotels&currency=gbp&luxuryhotels=no&cheapesthotels=no&kidsfreehotels=no&mostpopularhotels=no&lastminutehotels=no&offerid=-&hiddengems=no&topreviews=no&pagetitle=&allhotels=&arrivemonth=1&arriveyear=2024&arriveday=Friday&departmonth=1&departyear=2024&departday=Sunday&adults=2&employee=admin&children=0&orderbyprice=yes&city=London&arrivedate=9&arrivedate2=1%7C2024&nights=2&departdate=11&departdate2=1%7C2024&rooms=1&roomtype1=doubleroom&roomtype2=&roomtype3=&roomtype4=&roomtype5=&kidsage=&submit=%C2%A0';

  try {
    return getURL(url, scrapeHotels);
  } catch (error) {
    console.error('Error in search function:', error);
    return null; // Handle the error gracefully, return null, or throw an exception
  }
};

export default searchHotels;
