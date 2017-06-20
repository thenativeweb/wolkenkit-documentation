# Installing on Linux

To run wolkenkit on Linux you need to setup a few things.

## Setting up Docker

To run wolkenkit you need Docker <%= current.versions.docker %> or higher. To setup Docker on Linux, [follow the installation instructions](https://docs.docker.com/engine/installation/linux/) for the Linux distribution of your choice.

## Setting up wolkenkit

To download and install wolkenkit, run the following command:

```shell
$ curl https://install.wolkenkit.io | bash
```

## Setting up Node.js

While you don't need to have Node.js installed to run wolkenkit applications, it is definitely recommended for serious JavaScript development. We recommend to install [Node.js](https://nodejs.org/) <%= current.versions.node %> or higher using [nvm](https://github.com/creationix/nvm), which allows you to easily switch between different Node.js versions.

To do so, install nvm using this command:

```shell
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
```

Then, restart your terminal and install Node.js using the following commands:

```shell
$ nvm install <%= current.versions.node %>
$ nvm alias default <%= current.versions.node %>
$ nvm use <%= current.versions.node %>
```
