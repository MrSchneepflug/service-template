import {GameSession} from "../entities/GameSession";

export interface SessionRepository {
    load(sessionId: string): GameSession;
    save(gameSession: GameSession): void;
}
