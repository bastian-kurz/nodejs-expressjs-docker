# Express.js & Docker with dynamodb

Express.js & Docker with dynamodb is a skeleton which could be used as a
bae package to start a new project.

## TL;DR
````shell
make start-server
````

## Introduction

This Express.js application create a fully functional base application
with a single endpoint for health check. To be able to deploy and run those on
a kubernetes cluster.

## Prerequisites

- [nvm - Node Version Manager](https://github.com/nvm-sh/nvm)

## Before start

NOTE: Execute the given commands, in the projects root directory

````shell
nvm install
corepack enable
yarn install
````

## Base endpoints
| Endpoint | Description                               |
|----------|-------------------------------------------|
| /docs    | For Swagger api documentation             |
| /healthy | For health checks against the application |

