# Use an official Node.js runtime as the base image
FROM node:14

# Set working directory in the container
WORKDIR /app

# Define build-time variables
ARG REACT_APP_WEB_SOCKET_END_POINT
ARG REACT_APP_ENVOY_END_POINT

# Set environment variables
ENV REACT_APP_WEB_SOCKET_END_POINT=$REACT_APP_WEB_SOCKET_END_POINT
ENV REACT_APP_ENVOY_END_POINT=$REACT_APP_ENVOY_END_POINT

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application directory to the container
COPY . .

# Build the React app
RUN npm run build

# Expose a port (optional, if your app listens on a specific port)
EXPOSE 80

# Serve the built React app with a simple HTTP server
ENTRYPOINT ["npx", "http-server", "-p", "80", "./build"]
