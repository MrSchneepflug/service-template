import {Player} from "../../src/application/entities/Player";
import {uuid} from "../../src/application/util/util";
import {DEFAULT_PLAYER_NAMES} from "./GameSession";

export function somePlayer(overrides: Partial<Player> = {}): Player {
    const defaults = {
        id: uuid(),
        name: DEFAULT_PLAYER_NAMES[0],
    };

    const values = {...defaults, ...overrides}
    return new Player(values.id, values.name);
}
