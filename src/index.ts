import express, { Express, Request, Response } from "express";
const app: Express = express();


app.use(express.json());

// root for the api endpoint
app.use("/concepts", require("./routes/routes"));

app.use((err: any, req: any, res: any, next: any) => {
    console.log(err.code);
    console.log(err.stack);
    console.log(err.name);

    res.status(500).json({
        "message": "error handling the request"
    });
});

app.listen(4000, () => {
 console.log(`App is listening on port 4000`);
});