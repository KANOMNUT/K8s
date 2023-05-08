#!/bin/bash

kubectl create secret -n kafka docker-registry secret-docker --docker-server=https://index.docker.io/v1/ --docker-username=kanomnutt --docker-password=RBllGame0ver
# Create Secrect for username
kubectl apply -n kafka -f connect-user.yml
kubectl apply -n kafka -f connector-user.yaml
sleep 5
kubectl apply -n kafka -f kafka-connect.yml
