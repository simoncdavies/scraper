import { Request, Response } from 'express';
import getJSON from '../utils/getJSON';
import { destinationStationsURL } from '../constants';

const searchDestinationStations = (req: Request, res: Response) => {
  const departureCode = req.query.departureCode as string | undefined;
  const destination = req.query.destination as string | undefined;
  const jsonURL = destinationStationsURL
    .replace('{{kw}}', departureCode)
    .replace('{{city}}', destination);
  if (departureCode && destination) {
    getJSON(jsonURL)
      .then((jsonContent) => {
        return res.send(jsonContent);
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  } else {
    return res.send({});
  }
};

export default searchDestinationStations;
