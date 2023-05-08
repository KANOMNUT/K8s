# Kubernetes Configuration Repository

This repository contains configuration files for various Kubernetes components used in our applications. The files are organized by component and stored in YAML format. The files are organized into the following folders

## Cert-Manager
Contains configuration files for the cert-manager, a Kubernetes add-on that provides automated certificate management. [Cert-Manager](https://cert-manager.io/)

## Strimzi Kafka
Contains configuration files for Apache Kafka, a distributed streaming platform. [Strimzi Kafka](https://strimzi.io/)

## Nginx Ingress
Contains configuration files for the Nginx Ingress Controller, a Kubernetes ingress controller that provides load balancing and SSL termination for HTTP requests. [Nginx Ingress](https://github.com/kubernetes/ingress-nginx)

## Traefik
Contains configuration files for Traefik, a modern HTTP reverse proxy and load balancer. [Traefik Ingress](https://traefik.io/)

## TiDB
Contains configuration files for TiDB, a distributed relational database. [TiDB](https://www.pingcap.com/)

## Prometheus 
Contains configuration files for Prometheus-operator, a Kubernetes operator for Prometheus. [Prometheus](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack)

## ECK
Contains configuration files for Elastic Cloud on Kubernetes (ECK), a managed Elasticsearch, Kibana, and Beats distribution for Kubernetes. [ECK](https://www.elastic.co/guide/en/cloud-on-k8s/current/k8s-quickstart.html)

## ELK
Contains configuration files for the ELK stack, a popular logging and monitoring solution. [ELK](https://www.elastic.co/what-is/elk-stack)

## Storage Class
The storage class configuration files have been updated to include Portworx local LVM and OpenEBS-ZFS local pv. To use these storage classes, you will need to have the Portworx or OpenEBS storage providers installed in your Kubernetes cluster.

For more information on Portworx, please visit [PortworX](https://www.portworx.com/)

For more information on OpenEBS, please visit [OpenEBS](https://openebs.io/)

## License
This repository is licensed under the MIT License. See the [LICENSE](https://github.com/KANOMNUT/K8s/blob/main/LICENSE) file for details.