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

## Setting up Docker

To run wolkenkit you need Docker <%= current.versions.docker %> or higher. To setup Docker using Docker Machine, [download and install Docker for Windows](https://docs.docker.com/docker-for-windows/install/).

### Creating a virtual machine

Now you need to setup a virtual machine using Hyper-V and Docker Machine.

Open the terminal (`cmd.exe`) as administrator and run the following command. Make sure that you provide the name of the Hyper-V network switch that you created a few steps ago:

```shell
$ docker-machine create --driver hyperv --hyperv-virtual-switch "..." wolkenkit
```

### Setting up environment variables

Finally, you need to setup the environment variables `DOCKER_HOST`, `DOCKER_TLS_VERIFY` and `DOCKER_CERT_PATH`.

To do so, run at first the following command to show the environment variable values:

```shell
$ docker-machine env --shell cmd wolkenkit
```

After that, you have to set each environment variable manually:

```shell
$ setx DOCKER_TLS_VERIFY 1
$ setx DOCKER_HOST "..."
$ setx DOCKER_CERT_PATH "..."
```

:::hint-warning
> **Restart Terminal**
>
> Since the environment variables are only available after a restart of the terminal.
:::

## Setting up Node.js

While you don't need to have Node.js installed to run wolkenkit applications, it is definitely recommended for serious JavaScript development. We recommend to install [Node.js](https://nodejs.org/) <%= current.versions.node %> or higher using [nvm-windows](https://github.com/coreybutler/nvm-windows), which allows you to easily switch between different Node.js versions.

To do so, [download and install nvm-windows](https://github.com/coreybutler/nvm-windows#installation--upgrades).

Then, restart your terminal and install Node.js using the following command:

```shell
$ nvm install <%= current.versions.node %>
$ nvm use <%= current.versions.node %>
```

## Setting up wolkenkit

To download and install wolkenkit, open the terminal and run the following command:

```shell
$ npm install wolkenkit -g
```

## Setting up local.wolkenkit.io

When developing wolkenkit applications you will usually run them on the domain `local.wolkenkit.io`. This means that you need to set up this domain inside your `C:\Windows\System32\drivers\etc\hosts` file and make it point to the Docker server running on your previously created virtual machine. For that, open PowerShell using administrative privileges and run the following command:

```shell
$ Add-Content C:\Windows\System32\drivers\etc\hosts "$(docker-machine ip wolkenkit)`tlocal.wolkenkit.io"
```

:::hint-warning
> **Restart Windows**
>
> Finally, restart Windows one last time.
:::
