import { MigrationInterface, QueryRunner } from "typeorm";

export class CurrencyExchangeRateMigration1679937846885 implements MigrationInterface {
    name = 'CurrencyExchangeRateMigration1679937846885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "currency_exchange_rate" (
                "id" character varying NOT NULL,
                "code" character varying NOT NULL, 
                "rate" double precision,
                "expires_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '1' DAY),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_ce2b10b88ec4ab139c2ace41610" PRIMARY KEY ("id"),
                CONSTRAINT "REL_a1907072c67d6327098c93d193" UNIQUE ("code"), 
                CONSTRAINT "FK_a1907072c67d6327098c93d193c" FOREIGN KEY ("code") REFERENCES "currency"("code") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "currency_exchange_rate"`);
    }
}
