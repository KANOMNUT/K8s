#!/bin/bash

kubectl create secret generic storage-config -n gitlab --from-file=config=storage.config
kubectl create secret generic object-storage -n gitlab --from-file=connection=s3-rail.yaml
kubectl create secret generic registry-storage -n gitlab --from-file=config=registry-minio.yaml
