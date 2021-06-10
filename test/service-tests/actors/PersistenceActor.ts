import {GameSessionRepository} from "../../../src/application/persistence/GameSessionRepository";
import {GameSession} from "../../../src/application/entities/GameSession";
import {someGameSession} from "../../data/GameSession";
import {Connection} from "typeorm";

export class PersistenceActor {
    constructor(
        private readonly sessionRepository: GameSessionRepository,
        private readonly connection: Connection
    ) {}

    async withGameSession(gameSession: GameSession = someGameSession()) {
        await this.sessionRepository.save(gameSession);
    }

    async clearTables() {
        const tables = ["game_sessions", "cards"];
        await Promise.all(tables.map(table => this.connection.query(`delete from ${table}`)));
    }
}
