# Installing using Docker Machine

To run wolkenkit using Docker Machine you need to setup a few things.

## Setting up Docker

To run wolkenkit you need Docker <%= current.versions.docker %> or higher. To setup Docker using Docker Machine, [download and install Docker Toolbox](https://www.docker.com/products/docker-toolbox).

Additionally, setup a virtualization engine such as VMware Fusion or VirtualBox. You can find the complete list of supported virtualization engines in the [Docker documentation](https://docs.docker.com/machine/drivers/).

:::hint-warning
> **Enable VT-x**
>
> You may have to enable VT-x support in your machine's BIOS for Docker to work.
:::

### Using VMware Fusion

To create a virtual machine using VMware Fusion run the following command:

```shell
$ docker-machine create --driver vmwarefusion wolkenkit
```

### Using VirtualBox

To create a virtual machine using VirtualBox run the following command:

```shell
$ docker-machine create --driver virtualbox wolkenkit
```

:::hint-warning
> **VirtualBox and macOS**
>
> Currently there is a bug within VirtualBox on macOS that affects running DNS queries from within virtual machines. Hence, after having created the virtual machine you need to run the following command:
>
> `$ VBoxManage modifyvm wolkenkit --natdnsproxy1 off --natdnshostresolver1 off`
:::

### Setting up environment variables

Finally, you need to setup the environment variables `DOCKER_HOST`, `DOCKER_TLS_VERIFY` and `DOCKER_CERT_PATH`. To make Docker do this for you, run the following command:

```shell
$ eval $(docker-machine env wolkenkit)
```

To have the environment variables set automatically each time you open a terminal, you need to add them to your `~/.profile` file. To do so, run:

```shell
$ docker-machine env wolkenkit >> ~/.profile
```

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

## Setting up local.wolkenkit.io

When developing wolkenkit applications you will usually run them on the domain `local.wolkenkit.io`. This means that you need to set up this domain inside your `/etc/hosts` file and make it point to the Docker server running on your previously created virtual machine. For that, run the following command:

```shell
$ sudo sh -c 'echo $(docker-machine ip wolkenkit)\\tlocal.wolkenkit.io >> /etc/hosts'
```
