import {GameSession} from "../../src/application/entities/GameSession";
import {uuid} from "../../src/application/util/util";
import {somePlayer} from "./Player";

export const DEFAULT_PLAYER_NAMES = ["Jill", "John"];

export function someGameSession(overrides: Partial<GameSession> = {}): GameSession {
    const defaults = {
        id: uuid(),
        players: DEFAULT_PLAYER_NAMES.map(name => somePlayer({name}))
    };

    const values = {...defaults, ...overrides}
    return new GameSession(values.id, values.players);
}
