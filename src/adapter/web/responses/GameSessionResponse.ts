import {Card} from "../../../application/entities/Card";

export interface GameSessionResponse {
    readonly id: string;
    readonly done: boolean;
    readonly cards: Card[];
}
