#!/bin/bash
set -e

# Install K3s via K3sup
export NODE_1="10.195.100.11"
export NODE_2="10.195.100.12"
export NODE_3="10.195.100.13"
export NODE_4="10.195.100.14"
export NODE_5="10.195.100.15"
export USER=root
# The first server starts the cluster
INSTALL_K3S_VERSION=v1.20.8+k3s1

# The Master node Install
k3sup install \
  --k3s-version $INSTALL_K3S_VERSION \
  --k3s-extra-args="--node-external-ip $NODE_1 --kubelet-arg max-pods=500 --datastore-endpoint postgres://k3s:k3s@10.195.100.11:15432/k3s" \
  --cluster \
  --user $USER \
  --ip $NODE_1

k3sup install \
  --k3s-version $INSTALL_K3S_VERSION \
  --k3s-extra-args="--node-external-ip $NODE_2 --kubelet-arg max-pods=500 --datastore-endpoint postgres://k3s:k3s@10.195.100.11:15432/k3s" \
  --cluster \
  --user $USER \
  --ip $NODE_2


# The Worker node joins

k3sup join \
 --k3s-version $INSTALL_K3S_VERSION \
 --k3s-extra-args="--node-external-ip $NODE_3 --kubelet-arg max-pods=500" \
 --ip $NODE_3 \
 --user $USER \
 --server-user $USER \
 --server-ip $NODE_1

k3sup join \
 --k3s-version $INSTALL_K3S_VERSION \
 --k3s-extra-args="--node-external-ip $NODE_4 --kubelet-arg max-pods=500" \
 --ip $NODE_4 \
 --user $USER \
 --server-user $USER \
 --server-ip $NODE_1

k3sup join \
 --k3s-version $INSTALL_K3S_VERSION \
 --k3s-extra-args="--node-external-ip $NODE_5 --kubelet-arg max-pods=500" \
 --ip $NODE_5 \
 --user $USER \
 --server-user $USER \
 --server-ip $NODE_1



## Make .kube/config
sudo sh -c "echo 'K3S_KUBECONFIG_MODE=664'>> /etc/systemd/system/k3s.service.env"
sudo systemctl restart k3s
rm -rf ~/.kube && mkdir -p ~/.kube && sudo chown -R  $USER:$USER ~/.kube && sudo cat /etc/rancher/k3s/k3s.yaml > ~/.kube/config
