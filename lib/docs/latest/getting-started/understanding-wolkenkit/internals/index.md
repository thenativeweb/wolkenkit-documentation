# Internals

Any wolkenkit application runs as a set of Docker containers. The heart of the application consists of two containers that are responsible for [the write model and the read model](../architecture/). These two containers are called `core` and `broker`.

The *core* contains the actual domain code and publishes events based on commands. It is also responsible for storing the published events in the event store, or retrieving a replay from there. The core is not directly accessible from the outside, but works as a service in the background.

In contrast, the *broker* takes care of the read model, which primarily means that it executes the application's projections and updates the lists. The broker runs as a public-facing service, which means that it is responsible for the HTTP and websocket interface of the API.

By default, the *event store* is a PostgreSQL database, and the *read model* uses a MongoDB database. For the reliable delivery of internal messages between core and broker RabbitMQ is used as *message queue*.

![Internals](/internals/internals.svg)

In addition, there is also a Docker container called `flows`, which is responsible for running the *stateless and stateful flows*. The Docker container `depot` provides a *blob storage* service, and the `node_modules` container finally contains all the application's dependencies that are installed by npm.

As you can see, some of these docker containers are application-specific, while others provide generic infrastructure. There are base images for all of them, but new images are built locally for the application-specific ones. All these Docker containers and images are managed by the CLI.
