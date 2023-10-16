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

export const listUserProcedure = adminProcedure
  .output(
    z.object({
      contracts: z.array(userSchema),
    })
  )
  .query(async () => {
    return { contracts: mockUserData };
  });
