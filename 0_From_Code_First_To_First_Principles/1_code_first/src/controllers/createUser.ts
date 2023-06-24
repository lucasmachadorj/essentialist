import { v4 as uuid } from "uuid";
import { db } from "../models";
import { users } from "../models/users";
import { z } from "zod";

const CreateUserBody = z.object({
  name: z.string(),
  email: z.string().email("invalid email format"),
});

export const CreateUserDTO = z.object({
  body: CreateUserBody,
});

export type CreateUser = z.infer<typeof CreateUserBody>;

const createUser = async (user: CreateUser) => {
  const id = uuid();
  await db
    .insert(users)
    .values({ ...user, id })
    .execute();
};

export { createUser };
