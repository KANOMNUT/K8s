#!/bin/bash

echo Input Elastic password
read es-pwd

kubectl create secret generic elasticsearch-pw-elastic -n logging --from-literal password=$es-pwd
