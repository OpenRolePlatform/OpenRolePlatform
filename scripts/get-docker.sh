#!/bin/bash

curl -fsSL https://get.docker.com -o install-docker.sh
sudo sh install-docker.sh
sudo groupadd docker
sudo usermod -aG docker $USER
