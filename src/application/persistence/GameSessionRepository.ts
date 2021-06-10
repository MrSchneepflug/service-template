import {GameSession} from "../entities/GameSession";

export interface GameSessionRepository {
    load(sessionId: string): Promise<GameSession>;
    save(gameSession: GameSession): Promise<void>;
}
