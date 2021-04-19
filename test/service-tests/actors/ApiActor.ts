import axios from "axios";
import {DEFAULT_PLAYER_NAMES} from "../../data/GameSession";

export class ApiActor {
    constructor(private readonly servicePort: number) {}

    async initializeGameSession(playerNames: string[] = DEFAULT_PLAYER_NAMES) {
        return await axios.post(`http://localhost:${this.servicePort}/sessions`, {playerNames});
    }

    async retrieveGameSession(gameSessionId: string) {
        return await axios.get(`http://localhost:${this.servicePort}/sessions/${gameSessionId}`);
    }
}
