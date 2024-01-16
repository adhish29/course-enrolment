import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Queue } from "bullmq";

import { enrolUserToCourse } from "./utils/enrolUser";
import { sendMail } from "./utils/sendMail";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const enrolmentEmailQueue = new Queue(<string>process.env.QUEUE, {
  connection: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  },
});

mongoose
  .connect(<string>process.env.MONGO_URI)
  .then(() => console.log("connected to MongoDB successfully"))
  .catch((e) => console.log(e));

app.get("/", (_: Request, res: Response) => {
  res.json({ status: "Healthy" });
});

app.post("/enrol", async (_: Request, res: Response) => {
  try {
    const enrolled = await enrolUserToCourse();
    // await sendMail();
    await enrolmentEmailQueue.add(
      `${Date.now()}`,
      {
        from: "adhish.de.dev@gmail.com",
        to: "student@gmail.com",
        subject: `Congrats on enrolling in ${enrolled?.course_name} Course`,
        body: `Dear ${enrolled?.name}, You have been enrolled to ${enrolled?.course_name} Course.`,
      },
      {
        removeOnComplete: true,
        removeOnFail: 500,
      }
    );
    res.json({ status: "success", ...enrolled });
  } catch (error) {
    res.json({ status: "Error", error });
  }
});

app.listen(PORT, () =>
  console.log(`server is listening to http://localhost:${PORT}`)
);
