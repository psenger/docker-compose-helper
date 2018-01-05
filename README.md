# Docker Compose Helper

Uses Docker and Docker Compose to manage two containers.

## TOC

- [Docker Compose Helper](#docker-compose-helper)
  * [Details](#details)
    + [First time build containers.](#first-time-build-containers)
    + [Environment variables](#environment-variables)
      - [Passing environment variables through to containers](#passing-environment-variables-through-to-containers)
      - [Passing environment variables through compose ‘docker-compose run’](#passing-environment-variables-through-compose-docker-compose-run)
      - [Using environment variables in Compose files](#using-environment-variables-in-compose-files)
    + [Run a one off command in a container](#run-a-one-off-command-in-a-container)
    + [Listing](#listing)
      - [Containers](#containers)
      - [Images](#images)
    + [Deleting](#deleting)
      - [Images](#images-1)
      - [Containers](#containers-1)
    + [Logging into the container](#logging-into-the-container)
    + [Compose](#compose)

## Details

### First time, build all containers

```
docker-compose build
```

### Environment variables

#### Passing environment variables through to containers

```
docker run -e VARIABLE=VALUE ...
```

#### Passing environment variables through compose ‘docker-compose run’

```
docker-compose run -e DEBUG=true web python console.py
```

#### Using environment variables in Compose files

```
web:
  image: "webapp:${TAG}"
  environment:
    - DEBUG=true
```

using ``docker-compose config`` to see the product of the expanded compose environment variables

### Run a one off command in a container

```
docker-compose run <container name> <command>
```

These containers are tightly coupled, therefore, you can not run a command in one without the whole stack in place.

```bash
PS-MAC-AXI:api-docker psenger$ docker-compose up -d
Creating network "apidocker_default" with the default driver
Creating api-mongo ...
Creating api-mongo ... done
Creating api-docker ...
Creating api-docker ... done
PS-MAC-AXI:api-docker psenger$ docker-compose run api-mongo env
HOSTNAME=3962430d9983
MONGO_VERSION=3.4.7
TERM=xterm
MONGO_PACKAGE=mongodb-org
MONGO_REPO=repo.mongodb.org
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
GPG_KEYS=0C49F3730359A14518585931BC711F9BA15703C6
PWD=/
SHLVL=0
HOME=/root
MONGO_MAJOR=3.4
no_proxy=*.local, 169.254/16
GOSU_VERSION=1.7
PS-MAC-AXI:api-docker psenger$
```

### Listing

#### Containers

```-a``` means all containers, stopped or running.

```
docker ps -a
```

#### Images

```
docker images
```

### Deleting

#### Images

```
PS-MAC-AXI:api-docker psenger$ docker images
REPOSITORY                  TAG                 IMAGE ID            CREATED             SIZE
apidocker_api-test-runner   latest              030103749a09        20 minutes ago      907MB
apidocker_api-docker        latest              60171e62250c        21 minutes ago      907MB
node                        8                   2eeae8debf3d        3 weeks ago         676MB
node                        8.9.3               2eeae8debf3d        3 weeks ago         676MB
mongo                       latest              b39de1d79a53        4 months ago        359MB
PS-MAC-AXI:api-docker psenger$ docker image rm 030103749a09 60171e62250c
Untagged: apidocker_api-test-runner:latest
Deleted: sha256:030103749a093715880dc999185e1e86012a9e90cfaafc058b997a4030cf51d6
Deleted: sha256:d3165fe688407b6908fb0d9fb857c21d474ae95a33925fd3d39402a440456403
Deleted: sha256:46cc429384aa1a24fd553cc38d8a6901385c31de240a03aa048ff2dcb7ab5ce8
Deleted: sha256:72ad130449e63c764d2c19eacc5aeacafb08a5018d24860374b21ea46f11c976
Deleted: sha256:a03f97973b873760e116ce7e7eae2c10648d8d07a08a0d76f9faa8988c6c362b
Untagged: apidocker_api-docker:latest
Deleted: sha256:60171e62250cd9ffbe6ac95f50830383a8ca9dfe2432d3e633bfbb9719c5a0e2
Deleted: sha256:7a0e8c0a05481cd7e7af6fb0016c188dbdcde9185067ddbe16bcd765db5c10e4
Deleted: sha256:1a887330de2ec63f8d2eb0bf85a765dbe887d7d0c31014e319f0e7e4bcee5e89
Deleted: sha256:3332f86a8d1a914c164382f0ca6da68ec5e6d878b18c7dff48621418aa6013b3
Deleted: sha256:831129eee14ec0542ffe11dcf53b04c25df80fd04b46048b5616e4374c32a20a
Deleted: sha256:25a530bb950451f78b0daf83619d86b5ff00032c0e38f92fbbbea798fb50a72e
Deleted: sha256:2d08d2e58ab4299a04af0b43217db1eb0df787012b04b5f90bcafec2af3b7e07
Deleted: sha256:d8cedc9f362f8a855f727d91f4540b59672fef6db4ac1fad26e86e726fd98910
Deleted: sha256:33c60b368dce80c2c538b00596cb68b3696124c7c7b8141fc721e522ceaa0e9e
PS-MAC-AXI:api-docker psenger$
```

#### Containers

```bash
PS-MAC-AXI:api-docker psenger$ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
PS-MAC-AXI:api-docker psenger$ docker ps -a
CONTAINER ID        IMAGE                       COMMAND                  CREATED             STATUS                       PORTS                      NAMES
e25ae09d8e00        apidocker_api-test-runner   "tail -f /dev/null"      6 minutes ago       Exited (137) 2 minutes ago                              api-test-runner
10390c1a4573        apidocker_api-docker        "npm run start"          6 minutes ago       Exited (0) 2 minutes ago                                api-docker
4dad3fba2c1f        mongo                       "docker-entrypoint..."   6 minutes ago       Exited (0) 2 minutes ago                                api-mongo
73423ff17413        mongo:latest                "docker-entrypoint..."   4 months ago        Exited (255) 20 hours ago    0.0.0.0:32768->27017/tcp   mongo
PS-MAC-AXI:api-docker psenger$ docker rm e25ae09d8e00 10390c1a4573
e25ae09d8e00
10390c1a4573
PS-MAC-AXI:api-docker psenger$
```

### Logging into the container

```
docker exec -it <container name> /bin/bash
```

### Compose

Rebuild with attached terminal

```
docker-compose up --build
```

Rebuild with de-attached

```
docker-compose up --build -d
```

## TLDR; Just run the tests.

```bash
docker-compose up
ctrl-c
docker-compose down
```