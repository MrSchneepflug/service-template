import {v4} from "uuid";
import {CommandError} from "../commands/CommandError";

export function uuid() {
    return v4();
}

export function isCommandError(error: any): error is CommandError {
    return error.hasOwnProperty("type") &&
        error.hasOwnProperty("message") &&
        error.type === "error"
}
