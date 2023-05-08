#!/bin/bash

kubectl create -f https://raw.githubusercontent.com/pingcap/tidb-operator/master/manifests/crd.yaml
helm repo add pingcap https://charts.pingcap.org/
kubectl create namespace tidb-operator
helm install --namespace tidb-operator tidb-operator pingcap/tidb-operator
