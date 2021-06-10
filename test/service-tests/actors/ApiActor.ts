import axios from "axios";

export class ApiActor {
    constructor(private readonly servicePort: number) {}

    async initializeGameSession() {
        return await axios.post(`http://localhost:${this.servicePort}/sessions`);
    }

    async retrieveGameSession(gameSessionId: string) {
        return await axios.get(`http://localhost:${this.servicePort}/sessions/${gameSessionId}`);
    }
}
