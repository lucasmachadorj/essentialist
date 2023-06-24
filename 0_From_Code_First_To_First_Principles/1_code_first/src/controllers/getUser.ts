import { v4 as uuid } from "uuid";
import { db } from "../models";
import { users } from "../models/users";
import { z } from "zod";
import { eq } from "drizzle-orm";

const UserQuery = z.object({
  email: z.string().email("invalid email format"),
});

export const UserDTO = z.object({
  query: UserQuery,
});

export type GetUser = z.infer<typeof UserQuery>;

export type User = {
  id: string;
  name: string;
  email: string;
};

const getUser = async (user: GetUser): Promise<User> => {
  const data = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
    })
    .from(users)
    .where(eq(users.email, user.email))
    .execute();

  if (data.length === 0) {
    throw new Error("User not found");
  }

  return data[0];
};

export { getUser };
