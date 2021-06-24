import {uuid} from "../util/util";
import {Card} from "./Card";

export class GameSession {
    constructor(
        readonly id: string,
        readonly done: boolean,
        readonly cards: Card[],
    ) {}

    static create() {
        return new GameSession(uuid(), false, []);
    }
}
