import mongoose, { Document, Schema, model } from "mongoose";

interface IEnrolment extends Document {
  _id: string;
  name: string;
  course_name: string;
  enrolment_date: string;
}

const enrolmentSchema = new Schema<IEnrolment>({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  course_name: {
    type: String,
    required: true,
  },
  enrolment_date: {
    type: String,
    required: true,
  },
});

export const EnrolmentModel = mongoose.connection
  .useDb("TestDB")
  .model("EnrolmentDetails", enrolmentSchema);
