# Server for the app friend-space

## Concepts

* REST API principals
  * CRUD
  * HTTP methods
* JWT & refresh tokens
* Request validation

## Technologies

* Node.js
* MongoDB with Mongoose
* TypeScript
* Express.js & Express.js middleware
* Zod validation

## Data flow

![data flow digram](./digrams/data-flow.png)

## Access & refresh token flow

![auth flow with token](./digrams/refresh-token-flow.png)

## Deployment

* Docker (image)
* docker-compose (container)
* Caddy - Web server
* DigitalOcean
