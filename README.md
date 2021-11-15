# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

build docker image
### docker build -t pizza-image .

remove container
### docker rm pizza-container -f

run container
### docker run --env-file ./.env -v "D:\Study\Project III\pizza-house\src:/pizza-house/src:ro" -d -p 3000:3000 --name pizza-container pizza-image

run docker compose
### docker-compose up -d

Change env variable
### docker-compose up -d --build