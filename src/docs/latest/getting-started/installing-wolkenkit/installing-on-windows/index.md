# Installing on Windows

To run wolkenkit using Docker Machine on Windows Hyper-V you need to setup a few things.

## System requirements

- Windows 10 Anniversary Edition (Professional, Enterprise or Education in Version 1703 or newer)
- min. 4GB RAM
- Windows Subsystem for Linux (*Bash on Ubuntu on Windows*)

## Using Windows within a VM (VMWare Fusion)

If you are using Windows within VMWare Fusion VM, please check if the following requirements are given:

- 2 Processors
- min. 6GB RAM
- Enabled Hypervisor applications

### Enable Hypervisor applications

To run Docker Machine on Hyper-V within a VM you have to enable Hypervisor applications for your VM.

Shutdown your VM and go to **Settings** -> **System settings** -> **Processors and RAM** and open **advanced options**. Then select option **Enable Hypervisor application in this virtual machine** and close the settings.

Additionally open the `.vmx` file of the VM in the file system. Please note that this file is contained within an archive that contains the actual virtual machine.

In this file, check whether the following lines are there, and if not, add them:

```
hypervisor.cpuid.v0 = „FALSE“
vhv.enable = "TRUE"
```

After that, please start the VM again.

## Install and setting up Hyper-V

To install Hyper-V on your Windows 10 Anniversary Edition you have to open the *PowerShell as administrator* and execute the following commands:

```shell
$ Enable-WindowsOptionalFeature -Online -FeatureName containers -All
$ Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```
**Notice**: After that you have to restart your Windows system.

### Set up external Network Switch

If you want to make wolkenkit reachable from outside of Hyper-V you have to set up a external Network Switch in Hyper-V Manager, [follow the official docker guide](https://docs.docker.com/machine/drivers/hyper-v/#2-set-up-a-new-external-network-switch-optional).

**Notice:** Restart your Windows system to clear out any problems with the routing tables.

## Install the Windows Subsystem for Linux

To run wolkenkit on Windows you need to install the Windows Subsystem for Linux (*Bash on Ubuntu on Windows*).

Open *PowerShell as administrator* and run the following command:

```shell
$ Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

After that restart your VM and open the *Bash as administrator* to confirm installation of *Bash on Ubuntu on Windows*.

**Notice**: You have to reopen the *Bash* once.

## Setting up Docker

To run wolkenkit you need Docker <%= current.versions.docker %> or higher. To setup Docker using Docker Machine, [download and install Docker for Windows](https://docs.docker.com/docker-for-windows/install/).

### Using Docker commands on *Bash on Ubuntu on Windows*

If you want to run docker commands inside of *Bash on Ubuntu on Windows*, you have to create aliases in your `.bashrc` file.

Add the following lines to your `~/.bashrc` file in your user directory:

```
alias docker="/mnt/c/Program\ Files/Docker/Docker/resources/bin/docker.exe"
alias docker-machine="/mnt/c/Program\ Files/Docker/Docker/resources/bin/docker-machine.exe
alias docker-compose="/mnt/c/Program\ Files/Docker/Docker/resources/bin/docker-compose.exe"
```

### Create Docker Machine

Additionally, you have to setup the Hyper-V virtualization engine.

:::hint-warning
> **Enable VT-x**
>
> You may have to enable VT-x support in your machine's BIOS for Docker to work.
:::

To create a virtual machine using Hyper-V run the following command and set the right virtual network switch name, [see also the official docker guide](https://docs.docker.com/machine/drivers/hyper-v/#2-set-up-a-new-external-network-switch-optional):

```shell
$ docker-machine create --driver hyperv --hyperv-virtual-switch "<NameOfVirtualSwitch>" wolkenkit
```

### Setting up environment variables

Finally, you need to setup the environment variables `DOCKER_HOST`, `DOCKER_TLS_VERIFY` and `DOCKER_CERT_PATH`. To make Docker do this for you, run the following command:

```shell
$ eval $(docker-machine env --shell bash wolkenkit)
```

To have the environment variables set automatically each time you open a terminal, you need to add them to your `~/.bashrc` file. To do so, run:

```shell
$ docker-machine env --shell bash wolkenkit >> ~/.bashrc
```

## Setting up wolkenkit

To download and install wolkenkit, run the following command on *Bash on Ubuntu on Windows*:

```shell
$ curl https://install.wolkenkit.io | bash
```

Additionally you have to setup wolkenkit as command to your *Bash on Ubuntu on Windows* with adding the following line to your `~/.bashrc` file:

```
export PATH="$PATH:$HOME/.wolkenkit"
```

**Notice:** You have to restart the *Bash on Ubuntu on Windows as administrator*.

### Install GIT

To initialize a wolkenkit application you have to install GIT on your *Bash on Ubuntu on Windows* with the following commands:

```shell
$ apt-get update
$ apt-get install git
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

When developing wolkenkit applications you will usually run them on the domain `local.wolkenkit.io`. This means that you need to set up this domain inside your `/etc/hosts` file and make it point to the Docker server running on your previously created virtual machine. For that, run the following command on *Bash on Ubuntu on Windows*:

```shell
$ sudo sh -c 'echo $(docker-machine ip wolkenkit)\\tlocal.wolkenkit.io >> /etc/hosts'
```

After that add also the same line to `C:\Windows\system32\drivers\etc\hosts` file, to make wolkenkit application reachable on your Windows System.

**Notice:** You have to restart your Windows system.
