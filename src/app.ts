import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import routes from "./app/routes/index";
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Application router call
app.use("/api/v1", routes);

// Global Error Handler

app.use(globalErrorHandler);

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    statusCode: res.statusCode,
    request: true,
    message: "Success",
    data: null,
  });
});

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   Promise.reject(new Error('Unhandled Promise Rejection'));
// });

export default app;
