/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("clients", {
    id: "SERIAL PRIMARY KEY",
    name: "VARCHAR(255)",
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("clients");
}
