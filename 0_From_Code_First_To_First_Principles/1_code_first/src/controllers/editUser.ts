import { v4 as uuid } from "uuid";
import { db } from "../models";
import { users } from "../models/users";
import { z } from "zod";
import { eq } from "drizzle-orm";

const EditUserBody = z.object({
  name: z.string(),
  email: z.string().email(),
});

const EditUserParams = z.object({
  userId: z.string(),
});

export const EditUserDTO = z.object({
  body: EditUserBody,
  params: EditUserParams,
});

export type EditUser = z.infer<typeof EditUserBody> &
  z.infer<typeof EditUserParams>;

const editUser = async (user: EditUser) => {
  const { userId, ...updateFields } = user;
  try {
    const user = await db
      .update(users)
      .set({
        ...updateFields,
      })
      .where(eq(users.id, userId))
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
      })
      .execute();
    return user[0];
  } catch (error) {
    throw error;
  }
};

export { editUser };
