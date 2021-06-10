import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCardsTable1623872729587 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "cards"
            (
                id              UUID        NOT NULL PRIMARY KEY,
                owner           VARCHAR(50) NOT NULL,
                card            CHAR(1)     NOT NULL,
                game_session_id UUID,
                CONSTRAINT fk_game_session
                    FOREIGN KEY (game_session_id)
                        REFERENCES game_sessions (id)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cards"`);
    }

}
