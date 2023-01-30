FROM node:16

WORKDIR /app

# package.json file to the container
COPY package.json .

# Install required packages
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the default port for the Angular application
EXPOSE 4200

# Run the command to start the Angular application
CMD ["npm", "start"]
