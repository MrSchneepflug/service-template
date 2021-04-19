import {uuid} from "../util/util";

export class Player {
    constructor(
        readonly id: string,
        readonly name: string,
    ) {
    }

    static create(name: string) {
        return new Player(uuid(), name);
    }
}
