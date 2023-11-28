import express, {Express, Request, Response} from "express";

const port = 3000;

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
    res.send("home");
});

app.get("/route", (req: Request, res: Response) => {
    res.send("secondary route");
});

app.listen(port, () => {
    console.log(`now listening on port ${port}`);
});
