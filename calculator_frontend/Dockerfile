# Use a Node.js base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the remaining frontend files to the container
COPY . .

# Build the frontend application
RUN npm run build

# Expose the port that the React application will run on
EXPOSE 3000

# Run the React development server
CMD ["npm", "start"]
