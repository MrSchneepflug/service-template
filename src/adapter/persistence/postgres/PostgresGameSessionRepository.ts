import {injectable} from "inversify";
import {GameSessionRepository} from "../../../application/persistence/GameSessionRepository";
import {GameSession} from "../../../application/entities/GameSession";
import {GameSession as GameSessionEntity} from "../postgres/entities/GameSession";
import {Connection, Repository} from "typeorm";
import {EntityMapper} from "./EntityMapper";

@injectable()
export class PostgresGameSessionRepository implements GameSessionRepository {
    private readonly repository: Repository<GameSessionEntity>;

    constructor(private readonly entityMapper: EntityMapper, connection: Connection) {
        this.repository = connection.getRepository(GameSessionEntity);
    }

    async load(sessionId: string): Promise<GameSession> {
        const gameSession = await this.repository.findOne(sessionId, {relations: ["cards"]});

        if (!gameSession) {
            throw new Error(`session with id ${sessionId} not found.`);
        }

        return this.entityMapper.toGameSession(gameSession);
    }

    async save(gameSession: GameSession): Promise<void> {
        const gameSessionEntity = this.entityMapper.fromGameSession(gameSession);
        await this.repository.save(gameSessionEntity);
    }
}
