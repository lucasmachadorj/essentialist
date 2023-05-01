import { FirstName } from "./firstName";
import { LastName } from "./lastName";
import { StudentEmail } from "./studentEmail";

export type InvalidStudentProps<T> = {
  type: T;
  message: string;
};

export type StudentInputProps = {
  firstName: string;
  lastName: string;
};

export type StudentProps = {
  readonly firstName: FirstName;
  readonly lastName: LastName;
  readonly email: StudentEmail;
};
