import {Event} from "./Event";

export interface EventHandler {
    handle<T extends Event>(event: T): void;
}
