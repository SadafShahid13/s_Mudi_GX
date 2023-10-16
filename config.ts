import * as dotenv from "dotenv";
dotenv.config();

interface EnvVariables {
  DATABASE_URL: string;
  DATABASE_HOST: string;
  DATABASE_PASSWORD: string;
}

const env: EnvVariables = process.env as any;

export const databaseUrl =
  "postgresql://sMudi_GXU:" +
  env.DATABASE_PASSWORD +
  "@" +
  env.DATABASE_HOST +
  ":5432/sMudi_GXDB";

console.log(databaseUrl);
console.log(typeof env.DATABASE_PASSWORD);
