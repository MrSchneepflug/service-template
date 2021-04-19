import {injectable} from "inversify";
import {Command} from "./Command";
import {CommandError} from "./CommandError";

@injectable()
export class CommandProcessor {
    process<T>(command: Command<T>): T | CommandError  {
        let result: T;

        try {
            result = command.execute();
        } catch (error) {
            return {
                type: "error",
                message: error.message,
            };
        }

        return result;
    }
}
