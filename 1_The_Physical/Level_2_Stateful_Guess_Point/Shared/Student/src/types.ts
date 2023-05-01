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
  readonly id: string;
  readonly firstName: FirstName;
  readonly lastName: LastName;
  readonly email: StudentEmail;
};

export enum MaybeType {
  Just = "Just",
  Nothing = "Nothing",
}

export interface Just<T> {
  type: MaybeType.Just;
  content: T;
}

export interface Nothing {
  type: MaybeType.Nothing;
}
