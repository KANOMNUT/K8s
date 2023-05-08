#!/bin/bash

# Require helm version >= 3.9
# You need to assign LB IP to Traefik service 
# Map DNS A recodes with Traefik LB IP
helm repo add traefik https://helm.traefik.io/traefik
kubectl create ns traefik
helm install traefik traefik/traefik -n traefik
