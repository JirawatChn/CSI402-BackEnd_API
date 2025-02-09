import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

let points = 1000;

app.post("/spumember/collectpoints", (req: Request, res: Response) => {
  const { stdId,amount } = req.body;
  if(!stdId || !amount) {
    res.status(400).json({
      status: 400,
      message: "Request body is invalid",
    });
  }else{
    let studentId = stdId;
    let getPoints = amount/100;
    let studentPoints = points + getPoints;
    points = points + getPoints; 

    res.status(200).json({
      status: 200,
      message: "Success",
      data: {
        studentId,
        getPoints,
        studentPoints
      }
    });
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})