import dotenv from "dotenv";
import { Worker } from "bullmq";

dotenv.config();

interface Payload {
  from: string;
  to: string;
  subject: string;
  body: string;
}

async function mockSendEmail(payload: Payload) {
  return new Promise((res, _) => {
    setTimeout(() => {
      console.log(payload);
      res(1);
    }, 5000);
  });
}

const emailWorker = new Worker(
  <string>process.env.QUEUE,
  async (job) => {
    const data = <Payload>job.data;
    console.log("Job ID: ", job.id);
    console.log("Job name: ", job.name);

    await mockSendEmail({
      from: data.from,
      to: data.to,
      subject: data.subject,
      body: data.body,
    });
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
    },
  }
);
