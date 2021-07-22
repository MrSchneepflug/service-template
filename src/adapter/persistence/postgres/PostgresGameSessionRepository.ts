import {injectable} from "inversify";
import {GameSessionRepository} from "../../../application/persistence/GameSessionRepository";
import {GameSession} from "../../../application/domain/GameSession";
import {GameSession as GameSessionEntity} from "../postgres/entities/GameSession";
import {Connection, Repository} from "typeorm";
import {EntityMapper} from "./EntityMapper";
import {SessionNotFoundError, SessionNotSavedError} from "./Errors";

@injectable()
export class PostgresGameSessionRepository implements GameSessionRepository {
    private readonly repository: Repository<GameSessionEntity>;

    constructor(private readonly entityMapper: EntityMapper, connection: Connection) {
        this.repository = connection.getRepository(GameSessionEntity);
    }

    async load(sessionId: string): Promise<GameSession> {
        const gameSession = await this.repository.findOne(sessionId, {relations: ["cards"]});

        if (!gameSession) {
            throw new SessionNotFoundError(sessionId);
        }

        return this.entityMapper.toGameSession(gameSession);
    }

    async save(gameSession: GameSession): Promise<void> {
        const gameSessionEntity = this.entityMapper.fromGameSession(gameSession);

        try {
            await this.repository.save(gameSessionEntity);
        } catch (error) {
            throw new SessionNotSavedError(gameSession.id, error);
        }
    }
}
