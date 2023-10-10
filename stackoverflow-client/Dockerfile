# Use an official Node.js runtime as the base image
FROM node:14

# Set environment variables
ENV REACT_APP_ENVOY_END_POINT=$REACT_APP_ENVOY_END_POINT
ENV REACT_APP_WEB_SOCKET_END_POINT=$REACT_APP_WEB_SOCKET_END_POINT

# Set the working directory in the container
WORKDIR /app

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
CMD ["npx", "http-server", "-p", "80", "./build"]