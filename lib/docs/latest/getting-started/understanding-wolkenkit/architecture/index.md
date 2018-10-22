# Architecture

Any wolkenkit application runs as a set of Docker containers. The heart of the application consists of two containers that are responsible for [the write model and the read model](../data-flow/). These two containers are called `core` and `broker`.

The *core* contains the actual domain code and publishes events based on commands. It is also responsible for storing the published events in the event store, or retrieving a replay from there. The core is not directly accessible from the outside, but works as a service in the background.

In contrast, the *broker* takes care of the read model, which primarily means that it executes the application's projections and updates the lists. The broker runs as a public-facing service, which means that it is responsible for the HTTP and websocket interface of the API.

By default, the *event store* is a PostgreSQL database, and the *read model* uses a MongoDB database. For the reliable delivery of internal messages between core and broker RabbitMQ is used as *message queue*. When the broker sends a command to the core, it uses the *command bus*; when the core sends an event to the broker, it uses the *event bus*.

![Architecture](/architecture/architecture.svg)

In addition, there is also a Docker container called `flows`, which is responsible for running the *stateless and stateful flows*. As the flows react to events, they need to be notified by the core about new events. For this, there is the *flow bus*, which is basically another message queue.

Furthermore, the Docker container `depot` provides a *blob storage* service, and the `node_modules` container finally contains all the application's dependencies that are installed by npm.

As you can see, some of these docker containers are application-specific, while others provide generic infrastructure. There are base images for all of them, but new images are built locally for the application-specific ones. All these Docker containers and images are managed by the *CLI* called `wolkenkit`.

## Finding the code

The code for the various components is located in repositories on [GitHub](https://github.com/thenativeweb). On [Docker Hub](https://hub.docker.com/r/thenativeweb/), there is an automated build for each repository that is responsible for building the respective Docker image:

| Component | Repository | Docker image |
|-|-|-|
| wolkenkit (CLI) | [wolkenkit](https://github.com/thenativeweb/wolkenkit) | n/a |
| Broker | [wolkenkit-broker](https://github.com/thenativeweb/wolkenkit-broker) | [wolkenkit-broker](https://hub.docker.com/r/thenativeweb/wolkenkit-broker/) |
| Core | [wolkenkit-core](https://github.com/thenativeweb/wolkenkit-core) | [wolkenkit-core](https://hub.docker.com/r/thenativeweb/wolkenkit-core/) |
| Flows | [wolkenkit-flows](https://github.com/thenativeweb/wolkenkit-flows) | [wolkenkit-flows](https://hub.docker.com/r/thenativeweb/wolkenkit-flows/) |
| Blob storage | [wolkenkit-depot](https://github.com/thenativeweb/wolkenkit-depot) | [wolkenkit-depot](https://hub.docker.com/r/thenativeweb/wolkenkit-depot/) |
| Event store (PostgreSQL) | [wolkenkit-box-postgres](https://github.com/thenativeweb/wolkenkit-box-postgres) | [wolkenkit-postgres](https://hub.docker.com/r/thenativeweb/wolkenkit-postgres/) |
| Read model (MongoDB) | [wolkenkit-box-mongodb](https://github.com/thenativeweb/wolkenkit-box-mongodb) | [wolkenkit-mongodb](https://hub.docker.com/r/thenativeweb/wolkenkit-mongodb/) |
| Message queue (RabbitMQ) | [wolkenkit-box-rabbitmq](https://github.com/thenativeweb/wolkenkit-box-rabbitmq) | [wolkenkit-rabbitmq](https://hub.docker.com/r/thenativeweb/wolkenkit-rabbitmq/) |
| Shared Node.js modules | [wolkenkit-box-node-modules](https://github.com/thenativeweb/wolkenkit-box-node-modules) | [wolkenkit-node-modules](https://hub.docker.com/r/thenativeweb/wolkenkit-node-modules/) |
