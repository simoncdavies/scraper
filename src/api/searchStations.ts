import { Request, Response } from 'express';
import getJSON from '../utils/getJSON';
import { stationsURL } from '../constants';

const searchStations = (req: Request, res: Response) => {
  const departure = req.query.departure as string | undefined;
  const jsonURL = stationsURL.replace('{{kw}}', departure);
  if (departure) {
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

export default searchStations;
