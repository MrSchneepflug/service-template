import {injectable} from "inversify";
import {Event} from "./Event";
import {EventHandler} from "./EventHandler";

@injectable()
export class EventBus {
    private readonly handlers: Map<string, ReadonlyArray<EventHandler>> = new Map();

    subscribe(type: string, handler: EventHandler) {
        const existingHandlers = this.handlers.get(type);

        if (!existingHandlers || existingHandlers.length === 0) {
            this.handlers.set(type, [handler]);
        } else {
            this.handlers.set(type, [...existingHandlers, handler]);
        }
    }

    send<T extends Event>(event: T) {
        const handlers = this.handlers.get(event.type);

        if (!handlers || handlers.length === 0) {
            return;
        }

        handlers.forEach(handler => handler.handle(event));
    }
}
