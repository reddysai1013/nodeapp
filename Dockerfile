# Use official Node.js image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app code
COPY . .

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
