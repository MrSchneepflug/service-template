import {Player} from "./Player";
import {uuid} from "../util/util";

export class GameSession {
    constructor(
        readonly id: string,
        readonly players: ReadonlyArray<Player>,
    ) {}

    static create(playerNames: ReadonlyArray<string>) {
        const players = playerNames.map(Player.create);
        return new GameSession(uuid(), players);
    }

    private findPlayerById(playerId: string): Player {
        const player = this.players.find(player => player.id === playerId);

        if (!player) {
            throw new Error("player not found");
        }

        return player;
    }
}
