# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application directory to the container
COPY . .

# Build the React application (assumes you have a build script in your package.json)
RUN npm run build

# Install a simple web server to serve the build files
RUN npm install -g serve

# Expose the port that the server will listen on
EXPOSE 3000

# Start the server to serve the build files
CMD ["serve", "-s", "build"]
