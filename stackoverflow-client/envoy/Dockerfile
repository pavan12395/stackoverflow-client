FROM envoyproxy/envoy-dev:latest

# Copy your envoy.yaml into the container
COPY envoy.yaml /etc/envoy/envoy.yaml

# Create a shell script to perform sed replacements and start envoy
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Set the default values for your environment variables
# ENV GRPC_SOCKET_ADDRESS=host.docker.internal
# ENV GRPC_SOCKET_PORT=8080
# ENV ENVOY_PROXY_PORT=9090

# Specify the entrypoint script
ENTRYPOINT ["/entrypoint.sh"]