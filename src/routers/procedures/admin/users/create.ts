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

export const createUserProcedure = adminProcedure
  .input(
    z.object({
      user_name: z.string(),
      email: z.string(),
      phone: z.string(),
      role: z.string(),
    })
  )
  .output(userSchema)
  .query(async (opts) => {
    const { input } = opts;
    const newId =
      mockUserData.length > 0
        ? mockUserData[mockUserData.length - 1].id + 1
        : 1;
    const newUser = {
      id: newId,
      password: new Date().toISOString(),
      ...input,
    };

    mockUserData.push(newUser);
    return newUser;
  });
