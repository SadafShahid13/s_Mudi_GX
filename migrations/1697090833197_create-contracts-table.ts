import { MigrationBuilder, ColumnDefinitions } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("contracts", {
    id: "SERIAL PRIMARY KEY",
    client_id: "INTEGER",
    start_at: "DATE",
    end_at: "DATE",
    created_at: "DATE",
    price_sold_at: "INTEGER",
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("contracts");
}
