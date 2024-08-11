import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigration1723377828930 implements MigrationInterface {
    name = 'DbMigration1723377828930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("role_id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_df46160e6aa79943b83c81e496e" PRIMARY KEY ("role_id"))`);
        await queryRunner.query(`CREATE TABLE "review" ("review_id" SERIAL NOT NULL, "rating" integer NOT NULL, "review" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "bookingBookingId" integer, CONSTRAINT "PK_0106a233019ba9f4ee80aca2958" PRIMARY KEY ("review_id"))`);
        await queryRunner.query(`CREATE TABLE "payment" ("payment_id" SERIAL NOT NULL, "payment_method" character varying NOT NULL, "amount" integer NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "bookingBookingId" integer, CONSTRAINT "PK_9fff60ac6ac1844ea4e0cfba67a" PRIMARY KEY ("payment_id"))`);
        await queryRunner.query(`CREATE TABLE "booking" ("booking_id" SERIAL NOT NULL, "service" character varying NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "userUserId" integer, CONSTRAINT "PK_9ecc24640e39cd493c318a117f1" PRIMARY KEY ("booking_id"))`);
        await queryRunner.query(`CREATE TABLE "notification" ("notification_id" SERIAL NOT NULL, "message" character varying NOT NULL, "type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "read_at" TIMESTAMP, "userUserId" integer, CONSTRAINT "PK_fc4db99eb33f32cea47c5b6a39c" PRIMARY KEY ("notification_id"))`);
        await queryRunner.query(`CREATE TABLE "qr_code" ("qr_code_id" SERIAL NOT NULL, "qr_code_data" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "userUserId" integer, CONSTRAINT "PK_354d2deb45b7ac16c27d725af36" PRIMARY KEY ("qr_code_id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("user_id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "phone_number" character varying NOT NULL, "profile_picture" character varying, "address" character varying, "description" character varying, "roleRoleId" integer, CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_ec29b0fdd807b1d3b16cc146fb7" FOREIGN KEY ("bookingBookingId") REFERENCES "booking"("booking_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_9a7c61f2016a9202eba654cef50" FOREIGN KEY ("bookingBookingId") REFERENCES "booking"("booking_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_5882fb4c41bc21634bee36efdce" FOREIGN KEY ("userUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_03879f1bfdb3efdf24e732d8c73" FOREIGN KEY ("userUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "qr_code" ADD CONSTRAINT "FK_0ac1c768cf6d6de621c743faad3" FOREIGN KEY ("userUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_ffe3092db843bd8f90fcfe97da7" FOREIGN KEY ("roleRoleId") REFERENCES "role"("role_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_ffe3092db843bd8f90fcfe97da7"`);
        await queryRunner.query(`ALTER TABLE "qr_code" DROP CONSTRAINT "FK_0ac1c768cf6d6de621c743faad3"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_03879f1bfdb3efdf24e732d8c73"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_5882fb4c41bc21634bee36efdce"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_9a7c61f2016a9202eba654cef50"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_ec29b0fdd807b1d3b16cc146fb7"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "qr_code"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TABLE "booking"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
