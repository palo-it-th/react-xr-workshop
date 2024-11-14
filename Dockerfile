# Use the official Node.js image as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy the rest of the application code to the working directory
COPY ./demo-app .
RUN rm -rf node_modules

# Install dependencies
RUN npm install

# Build the React application
RUN npm run build

# Use the official Nginx image to serve the built application
FROM nginx:alpine

# Copy the built application from the previous stage to the Nginx html directory
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]