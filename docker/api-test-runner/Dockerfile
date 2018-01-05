## ----------------------
##
## BUILDING
##   (from project root directory)
## ----------------------
##
## BUILDING
##   (from project root directory)
##   $ docker build -t api-test-runner .
##
## RUNNING
##   $ docker run -d api-test-runner
##
## CONNECTING
##   Lookup the IP of your active docker host using:
##     $ docker-machine ip $(docker-machine active)
##   Connect to the container at DOCKER_IP:3000
##     replacing DOCKER_IP for the IP of your active docker host
##
## ----------------------
FROM node:8

# Override the NODE_ENV environment variable to 'dev', in order to get required test packages
ENV NODE_ENV dev

# RUN lets us execute a command, which in our case is to create a new directory.
RUN mkdir -p /usr/api-test-runner

# WORKDIR sets this newly created directory as the working directory for any COPY, RUN and CMD instructions that follow in the Dockerfile.
WORKDIR /usr/api-test-runner

COPY . /usr/api-test-runner/

# 1. Get test packages; AND
# 2. Install our test framework - mocha
# RUN npm update && \
#    npm install -g mocha

RUN npm update

#CMD ["mocha", "tests/test.js", "--reporter", "spec"]
#CMD ["tail", "-f", "/dev/null"]
CMD npm test && echo done
