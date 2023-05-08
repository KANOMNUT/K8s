#!/bin/bash

helm repo add strimzi https://strimzi.io/charts
helm repo update
kubectl create ns kafka
helm install kafka-cluster strimzi/strimzi-kafka-operator --namespace kafka
