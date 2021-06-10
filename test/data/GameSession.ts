import {GameSession} from "../../src/application/entities/GameSession";
import {uuid} from "../../src/application/util/util";

export function someGameSession(overrides: Partial<GameSession> = {}): GameSession {
    const defaults = {
        id: uuid(),
        done: false,
        cards: []
    };

    const values = {...defaults, ...overrides}
    return new GameSession(values.id, values.done, values.cards);
}
