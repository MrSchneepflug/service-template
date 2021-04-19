## Service Template

This is just a snapshot of a service I am currently working on. This repository should serve as
an evolving template for services following hexagonal architecture in TypeScript.

#### A bit of context:
The initial service should serve as an API for a very simple board game. Games are generally
very well suited to train software modeling in my opinion, as they are full of business rules
and events (hence the event bus).

I'm happy with most parts. Some parts still suck though.

**The good parts:**
- testing is really fun due to actors and data providers
> Cheers to my current team. This repository is influenced a lot by my daily work.
- dependency injection with Inversify
- scaffolding for custom Jest matchers
- scaffolding of command processor and event bus

**Things to reconsider:**
- splitting commands into command/handler
