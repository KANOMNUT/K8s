#!/bin/bash

kubectl create ns akhq
helm repo add akhq https://akhq.io/
helm install akhq akhq/akhq -n akhq -f values.yaml