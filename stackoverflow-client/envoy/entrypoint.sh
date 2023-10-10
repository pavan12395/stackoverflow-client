#!/bin/sh

# Perform sed replacements in the envoy.yaml file
sed -i "s/GRPC_SOCKET_ADDRESS/$GRPC_SOCKET_ADDRESS/g" /etc/envoy/envoy.yaml
sed -i "s/GRPC_SOCKET_PORT/$GRPC_SOCKET_PORT/g" /etc/envoy/envoy.yaml
sed -i "s/ENVOY_PROXY_PORT/$ENVOY_PROXY_PORT/g" /etc/envoy/envoy.yaml

# Start the envoy command
exec envoy -c /etc/envoy/envoy.yaml