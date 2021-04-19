import {Player} from "../../../application/entities/Player";

export interface GameSessionResponse {
    readonly id: string;
    readonly players: ReadonlyArray<Player>;
}
