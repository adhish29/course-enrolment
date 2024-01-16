import moment from "moment";
import { EnrolmentModel } from "../model/Enrolment";
import { ulid } from "ulid";
import { uniqueNamesGenerator, Config, names } from "unique-names-generator";

interface Enrolment {
  _id: string;
  name: string;
  course_name: string;
  enrolment_date: string;
}

function coursepicker(): string {
  const coursenames = [
    "The Complete Python Bootcamp From Zero to Hero in Python",
    "Automate the Boring Stuff with Python Programming",
    "100 Days of Code: The Complete Python Pro Bootcamp",
    "Machine Learning A-Z: AI, Python & R + ChatGPT Prize [2024]",
    "The Complete JavaScript Course 2024: From Zero to Expert!",
  ];
  const randomIndex = Math.floor(Math.random() * coursenames.length);
  return coursenames[randomIndex];
}

export async function enrolUserToCourse(): Promise<Enrolment | null> {
  try {
    const newEnrolmentObject = {
      _id: ulid(),
      name: uniqueNamesGenerator({
        dictionaries: [names],
      }),
      course_name: coursepicker(),
      enrolment_date: moment(Date.now()).format("yyyy-MM-DD hh:mm:ss zz"),
    };
    // const newEnrolment = new EnrolmentModel(newEnrolmentObject);
    // await newEnrolment.save();
    await EnrolmentModel.create(newEnrolmentObject);
    return newEnrolmentObject;
  } catch (error) {
    console.log("error in enrolUserToCourse ", error);
    return null;
  }
}
