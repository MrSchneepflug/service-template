import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateGameSessionsTable1623872653449 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "game_sessions"
            (
                id   UUID NOT NULL PRIMARY KEY,
                done BOOLEAN DEFAULT false
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "game_sessions"`);
    }

}
