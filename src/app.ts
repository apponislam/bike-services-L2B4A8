import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundHandler from "./app/middlewares/notFoundRoute";

const app: Application = express();

app.use(
    cors({
        origin: ["http://localhost:3000", "https://bike-services-l2-b4-a8.vercel.app"],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send({
        Message: "Bike services",
    });
});

app.use("/api", router);
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
