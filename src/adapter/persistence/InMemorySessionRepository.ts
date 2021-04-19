import {SessionRepository} from "../../application/persistence/SessionRepository";
import {GameSession} from "../../application/entities/GameSession";
import {injectable} from "inversify";

@injectable()
export class InMemorySessionRepository implements SessionRepository {
    private readonly sessions: GameSession[] = [];

    load(sessionId: string): GameSession {
        return this.findSessionById(sessionId);
    }

    save(gameSession: GameSession): void {
        const index = this.sessions.findIndex(session => session.id === gameSession.id);

        if (index === -1) {
            this.sessions.push(gameSession);
        } else {
            this.sessions[index] = gameSession;
        }
    }

    private findSessionById(sessionId: string): GameSession {
        const gameSession = this.sessions.find(session => session.id === sessionId);

        if (!gameSession) {
            throw new Error("session not found");
        }

        return gameSession;
    }
}
