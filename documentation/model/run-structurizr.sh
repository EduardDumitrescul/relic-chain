#!/bin/sh

# Define variables for easier modification
IMAGE="structurizr/lite"
HOST_PORT=8080
CONTAINER_PORT=8080
VOLUME_SOURCE="/home/eduard/repos/relic-chain/documentation/model/"
VOLUME_TARGET="/usr/local/structurizr"
URL="http://localhost:${HOST_PORT}"

brave "${URL}"
# Run the Docker command
docker run -it --rm -p ${HOST_PORT}:${CONTAINER_PORT} -v ${VOLUME_SOURCE}:${VOLUME_TARGET} ${IMAGE}

# Wait a few seconds to ensure the container starts
# sleep 3

# Open the localhost website in Brave

