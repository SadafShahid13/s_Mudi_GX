# Use an official Node.js runtime as the base image
FROM node:20.8.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code to the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port your application listens on
EXPOSE 80

# Define the command to run your application
CMD [ "node", "dist/index.js" ]
