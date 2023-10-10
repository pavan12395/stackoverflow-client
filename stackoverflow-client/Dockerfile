# Use an official Node.js runtime as the base image
FROM node:14

# Set environment variables
ENV REACT_APP_GRPC_SERVER_END_POINT="http://localhost:9090"
ENV REACT_APP_WEB_SOCKET_END_POINT="http://localhost:4000"

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