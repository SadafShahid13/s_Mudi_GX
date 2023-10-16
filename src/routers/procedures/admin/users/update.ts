import { adminProcedure } from "../../../../index";
import { z } from "zod";
import _ from "lodash";

const userSchema = z.object({
  id: z.number(),
  user_name: z.string(),
  email: z.string(), // Assuming date as a string, but you can use z.date() if you have Date objects
  phone: z.string(),
  password: z.string(),
  role: z.string(),
});

const mockUserData = [
  // Sample data - adjust as needed
  {
    id: 1,
    user_name: "James",
    email: "james@rodiguez.com",
    phone: "0123456789",
    password: "shhh",
    role: "Admin",
  },
  // ... more sample users
];

export const updateUserProcedure = adminProcedure
  .input(
    z.object({
      id: z.number(),
      start_at: z.string(),
      end_at: z.string(),
      price_sold_at: z.number(),
    })
  )
  .output(userSchema)
  .query(async (opts) => {
    const { input } = opts;
    const user = mockUserData.find((user) => user.id === input.id);

    if (!user) {
      throw new Error(`user with id ${input.id} not found.`);
    }

    Object.assign(user, input);
    return user;
  });
