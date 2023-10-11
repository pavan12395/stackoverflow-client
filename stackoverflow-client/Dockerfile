# Use an official Node.js runtime as the base image
FROM node:14

# Set working directory in the container
WORKDIR /app



# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application directory to the container
COPY . .


EXPOSE 3000

CMD export REACT_APP_WEB_SOCKET_END_POINT="http://${WEB_SOCKET_HOST}:${WEB_SOCKET_PORT}/" && \
    export REACT_APP_ENVOY_END_POINT="http://${ENVOY_HOST}:${ENVOY_PORT}/" && npm start

# Serve the built React app with a simple HTTP server



# WEB_SOCKET_HOST , WEB_SOCKET_PORT , ENVOY_HOST , ENVOY_PORT are the environment variables took in Frontend Application