# Installing on Windows

To run wolkenkit on Windows you need to setup a few things.

## Preparing the system for Hyper-V

As wolkenkit uses Linux-based Docker images, you have to use Hyper-V and Docker Machine to run wolkenkit. Currently, wolkenkit does not support native Windows images.

:::hint-warning
> **Hyper-V support is experimental**
>
> Running wolkenkit on Windows using Hyper-V and Docker Machine is experimental, and not yet officially supported.
:::

### Using hardware

To run Windows directly on hardware, i.e. without any virtualization, you do not need to take any special steps.

:::hint-warning
> **Enable VT-x**
>
> You may have to enable VT-x support in your machine's BIOS for Docker to work.
:::

### Using VMware Fusion

To run Windows using VMware Fusion, you need to enable Hypervisor applications for your virtual machine. Shutdown the virtual machine and go to *Settings > System settings > Processors and RAM > Advanced options*. Ensure that *Enable Hypervisor applications in this virtual machine* is checked. Close the settings to save your changes.

Now locate the file that represents the virtual machine on your host computer. As this file is an archive, open it, and then open the included `.vmx` file. This file contains the settings for your virtual machine. If not yet present, add the following lines to the file:

```
hypervisor.cpuid.v0 = "FALSE"
vhv.enable = "TRUE"
```

After that, start your virtual machine and boot into Windows.

## Installing Hyper-V

To install Hyper-V run PowerShell using administrative privileges. Then run the following commands:

```shell
$ Enable-WindowsOptionalFeature -Online -FeatureName containers -All
$ Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```

:::hint-warning
> **Restart Windows**
>
> Don't forget to restart Windows once the commands have been completed.
:::

### Setting up the network

By default, Hyper-V virtual machines are not accessible from the outside. To change this you need to set up an external network switch. For details on how to do this, please [refer to the Docker documentation](https://docs.docker.com/machine/drivers/hyper-v/#2-set-up-a-new-external-network-switch-optional)

:::hint-warning
> **Restart Windows**
>
> From time to time Windows has problems with its routing tables after creating a new network switch. Hence it is recommended to restart Windows.
:::

## Installing the Windows Subsystem for Linux

To run wolkenkit on Windows you need to install the Windows Subsystem for Linux. For this, run PowerShell using administrative privileges, then run the following command:

```shell
$ Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

:::hint-warning
> **Restart Windows**
>
> Don't forget to restart Windows once the command has been completed.
:::

To confirm that the installation of the Windows Subsystem for Linux succeeded run Bash on Ubuntu on Windows using administrative privileges. From here on, Bash on Ubuntu on Windows is simply called *the terminal*.

## Setting up Docker

To run wolkenkit you need Docker <%= current.versions.docker %> or higher. To setup Docker using Docker Machine, [download and install Docker for Windows](https://docs.docker.com/docker-for-windows/install/).

### Aliasing Docker commands

To run Docker commands from within the terminal you need to setup some aliases in your `~/.bashrc` file. Open the terminal and run the following commands:

```shell
$ echo 'alias docker="/mnt/c/Program\ Files/Docker/Docker/resources/bin/docker.exe"' >> ~/.bashrc
$ echo 'alias docker-machine="/mnt/c/Program\ Files/Docker/Docker/resources/bin/docker-machine.exe"' >> ~/.bashrc
$ echo 'alias docker-compose="/mnt/c/Program\ Files/Docker/Docker/resources/bin/docker-compose.exe"' >> ~/.bashrc
```

:::hint-warning
> **Restart Bash on Ubuntu on Windows**
>
> After having edited the `~/.bashrc` file you need to restart Bash on Ubuntu on Windows.
:::

### Creating a virtual machine

Now you need to setup a virtual machine using Hyper-V and Docker Machine.

Open the terminal and run the following command. Make sure that you provide the name of the Hyper-V network switch that you created a few steps ago:

```shell
$ docker-machine create --driver hyperv --hyperv-virtual-switch "..." wolkenkit
```

### Setting up environment variables

Finally, you need to setup the environment variables `DOCKER_HOST`, `DOCKER_TLS_VERIFY` and `DOCKER_CERT_PATH`.

To have the environment variables set automatically each time you open a terminal, you need to add them to your `~/.bashrc` file. To do so, run:

```shell
$ docker-machine env --shell bash wolkenkit >> ~/.bashrc
```

Please note that the `DOCKER_CERT_PATH` environment variables contains a wrong path, so you need to fix it manually: Open the `~/.bashrc` file and turn

```
export DOCKER_CERT_PATH="C:\Users\...\.docker\machine\machines\wolkenkit"
```

into:

```
export DOCKER_CERT_PATH="/mnt/c/Users/.../.docker/machine/machines/wolkenkit"
```

## Setting up Node.js

To run wolkenkit you need Node.js <%= current.versions.node %> or higher. We recommend installing Node.js using [nvm](https://github.com/creationix/nvm), which enables switching between different Node.js versions.

First, install nvm using this command:

```shell
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
```

Then, restart your terminal and install Node.js using the following commands:

```shell
$ nvm install <%= current.versions.node %>
$ nvm alias default <%= current.versions.node %>
$ nvm use <%= current.versions.node %>
```

## Setting up wolkenkit

To download and install wolkenkit, run the following command:

```shell
$ npm install -g wolkenkit
```

## Setting up local.wolkenkit.io

When developing wolkenkit applications you will usually run them on the domain `local.wolkenkit.io`. This means that you need to set up this domain inside your `/etc/hosts` file and make it point to the Docker server running on your previously created virtual machine. For that, run the following command:

```shell
$ sudo sh -c -e "echo '$(docker-machine ip wolkenkit)\\tlocal.wolkenkit.io' >> /etc/hosts"
```

:::hint-warning
> **Persisting data in /etc/hosts**
>
> By default, Windows recreates the `/etc/hosts` file everytime you start Bash on Ubuntu on Windows. To ensure that your changes are actually persisted, remove the line that says that the file is *automatically generated by WSL*. Please note that you need administrative privileges to edit the `/etc/hosts` file.
:::

Additionally, you need to add the same line to your host's `C:\Windows\System32\drivers\etc\hosts` file. Open PowerShell using administrative privileges and run the following command:

```shell
$ Add-Content C:\Windows\System32\drivers\etc\hosts "$(docker-machine ip wolkenkit)`tlocal.wolkenkit.io"
```

:::hint-warning
> **Restart Windows**
>
> Finally, restart Windows one last time.
:::
