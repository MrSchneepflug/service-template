export class SessionNotFoundError extends Error {
    public readonly sessionId: string;

    constructor(sessionId: string) {
        super(`session with id ${sessionId} not found.`);
        this.sessionId = sessionId;
    }
}

export class SessionNotSavedError extends Error {
    public readonly sessionId: string;
    public readonly cause: Error;

    constructor(sessionId: string, cause: Error) {
        super(`session with id ${sessionId} could not be saved. Cause: ${cause.message}`);
        this.sessionId = sessionId;
        this.cause = cause;
    }
}
