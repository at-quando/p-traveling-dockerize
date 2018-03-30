FROM node:9

# Create a directory where our app will be placed
RUN mkdir -p /travel-backend

# Change directory so that our commands run inside this new directory
WORKDIR /travel-backend

# Copy dependency definitions
COPY package.json /travel-backend

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /travel-backend

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]