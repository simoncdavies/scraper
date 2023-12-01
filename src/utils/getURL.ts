import express, { Request, Response } from 'express';

const getURL = (url: string, searchFunction) => {
  const router = express.Router();

  router.get('/*', async (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader('Content-Type', 'application/json');

    // console.log('req params', req.params); // params after slashes
    // console.log('req query', req.query); // query string

    try {
      const value = await searchFunction(url);
      return res.send(value);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: 'Internal Server Error' });
    }
  });

  return router;
};

export default getURL;
