

# Use the official Node.js image as a base image
FROM node:alpine3.19

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Set environment variable for production
ENV NODE_ENV=production
ENV REACT_APP_BACKEND_URL=https://backend.caterorange.com

# Copy the remaining application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Serve the build using a static server
# We will use serve - a static server that lets you serve a static site / single page app
RUN npm install -g serve

# Expose the port that serve uses by default
EXPOSE 3000

# Command to run the application using serve
CMD ["serve", "-s", "build"]
