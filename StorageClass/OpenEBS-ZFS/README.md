# Get started OpenEBS ZFS

## Install ZFS package to K8s node

```Bash
apt-get install zfsutils-linux -y
```
## Configuration ZFS Pool
```Bash
zpool create <ZFS Pool name> <Disk name>
```

## Check ZFS Pool status
```Bash
zpool status
```

## Install OpenEBS ZFS
```Bash
kubectl apply -f install.yaml
kubectl get pods -n kube-system -l role=openebs-zfs
```

## Create StorageClass
Additional configuration https://github.com/openebs/zfs-localpv/blob/develop/docs/storageclasses.md
```Bash
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: openebs-zfspv
parameters:
  recordsize: "4k"
  compression: "off"
  dedup: "off"
  fstype: "zfs"
  poolname: "zfspv-pool"
  shared: "yes"
provisioner: zfs.csi.openebs.io
allowVolumeExpansion: true
allowedTopologies:
  - matchLabelExpressions:
      - key: kubernetes.io/hostname
        values:
          - "k8s1"
          - "k8s2"
          - "k8s3"
```

## Remark
- Cannot move mounting pod to another node.
