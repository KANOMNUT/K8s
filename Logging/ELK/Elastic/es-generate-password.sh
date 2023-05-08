#!/bin/bash

kubectl exec -it $(kubectl get pods -n logging | grep elasticsearch-client | sed -n 1p | awk '{print $1}') -n logging -- bin/elasticsearch-setup-passwords auto -b
