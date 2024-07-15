FROM node

WORKDIR /app

RUN npm install

# Expose the port the app will run on
EXPOSE 5173

# Command to run your app with serve
CMD ["npm", "run", "dev"]