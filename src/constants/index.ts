export const domain: string = 'https://www.hoteldirect.co.uk';
export const stationsURL: string = `${domain}/webapp/hoteldirect/servlet/SearchKw?station=2&kw={{kw}}`;
export const destinationStationsURL: string = `${domain}/webapp/hoteldirect/servlet/SearchKw?station=3&kw={{kw}}&city={{city}}`;
export const destinationHotelsURL: string = `${domain}/webapp/hoteldirect/servlet/SearchKw?station=5&kw=hotels&city={{city}}`;
