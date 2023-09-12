# Use the latest Node.js LTS (Long Term Support) version as the base image
FROM node:lts AS base

# Set the working directory in the container
WORKDIR /app

# Copy only the package.json and package-lock.json to leverage caching
COPY package*.json ./

# Install project dependencies
RUN npm install

# Create a build stage for the application code
FROM base AS build

# Copy the rest of the application code to the build stage
COPY . .

# Build the application
RUN npm run build

# Create the final production image
FROM base AS production

# Copy the built application from the build stage
COPY --from=build /app/dist ./dist

# Expose the port the application is running on
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
