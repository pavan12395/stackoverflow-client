FROM envoyproxy/envoy-dev:latest

ARG GRPC_SOCKET_ADDRESS=host.docker.internal
ARG GRPC_SOCKET_PORT=8080
ARG ENVOY_PROXY_PORT=9090
COPY envoy.yaml /etc/envoy/envoy.yaml

RUN sed -ie "s/ENVOY_PROXY_PORT/$ENVOY_PROXY_PORT/g" /etc/envoy/envoy.yaml
RUN sed -ie "s/GRPC_SOCKET_ADDRESS/$GRPC_SOCKET_ADDRESS/g" /etc/envoy/envoy.yaml
RUN sed -i "s/GRPC_SOCKET_PORT/$GRPC_SOCKET_PORT/g" /etc/envoy/envoy.yaml

RUN chmod go+r /etc/envoy/envoy.yaml