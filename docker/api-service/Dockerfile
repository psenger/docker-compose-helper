## ----------------------
##
## BUILDING
##   (from project root directory)
##   $ docker build -t api-service .
##
## RUNNING
##   There has to be a MongoDB server running and the app-supervisor.conf has to be configured to connect to it.
##   $ docker run -d -p 3000:3000 api-service
##
## CONNECTING
##   Lookup the IP of your active docker host using:
##     $ docker-machine ip $(docker-machine active)
##   Connect to the container at DOCKER_IP:3000
##     replacing DOCKER_IP for the IP of your active docker host
##
## ----------------------
FROM node:8

# RUN lets us execute a command, which in our case is to create a new directory.
RUN mkdir -p /usr/api-service

# WORKDIR sets this newly created directory as the working directory for any COPY, RUN and CMD instructions that follow in the Dockerfile.
WORKDIR /usr/api-service

COPY . /usr/api-service/

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start" ]
