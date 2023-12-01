import express, { Express, Request, Response } from 'express';
import searchHotels from './api/searchHotels';
import searchStations from './api/searchStations';
import searchDestinationStations from './api/searchDestinationStations';
import searchDestinationHotels from './api/searchDestinationHotels';

const port = 3000;

const app: Express = express();

const searchHotelsFunction = searchHotels();
app.use('/search', searchHotelsFunction);

const searchStationsFunction = (req: Request, res: Response) =>
  searchStations(req, res);
app.use('/stations', searchStationsFunction);

const searchDestinationStationsFunction = (req: Request, res: Response) =>
  searchDestinationStations(req, res);
app.use('/destinationStations', searchDestinationStationsFunction);

const searchDestinationHotelsFunction = (req: Request, res: Response) =>
  searchDestinationHotels(req, res);
app.use('/destinationHotels', searchDestinationHotelsFunction);

app.use('/', (req: Request, res: Response) => {
  res.send('home');
});

app.use('/route', (req: Request, res: Response) => {
  res.send('secondary route');
});

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
