import { Request, Response } from 'express';
import getJSON from '../utils/getJSON';
import { destinationHotelsURL } from '../constants';

const searchDestinationHotels = (req: Request, res: Response) => {
  const destination = req.query.destination as string | undefined;
  const jsonURL = destinationHotelsURL.replace('{{city}}', destination);
  if (destination) {
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

export default searchDestinationHotels;
