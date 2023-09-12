# Use official Node.js
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the application is running on
EXPOSE 8080

# Start the Node.js application
CMD ["node", "main.js"]
