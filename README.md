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
- [class-validator guide to understand how to validate](https://github.com/typestack/class-validator)

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

## Keep in mind
- we are using Express v4 (v5 still in Beta1) so we have to use the package [express-async-errors](https://www.npmjs.com/package/express-async-errors)
to be able to Error handle async route calls with the normal Error middleware

## DynamoDb Local
After you started the project and it is up and running the DynamoDb is also running
to be able to have something like PhpMyAdmin or Adminer.

#### Start DynamoDb-Admin
````shell
dynamodb-admin
````
#### Result
````shell
  DYNAMO_ENDPOINT is not defined (using default of http://localhost:8000)
  database endpoint:    http://localhost:8000                                                                      
  region:               local                                                                                      
  accessKey:            key                                                                                        
                                                                                                                   
  dynamodb-admin listening on http://:::8001 (alternatively http://0.0.0.0:8001)                                   
(node:21757) NOTE: We are formalizing our plans to enter AWS SDK for JavaScript (v2) into maintenance mode in 2023.
                                                                                                                   
Please migrate your code to use AWS SDK for JavaScript (v3).                                                       
For more information, check the migration guide at https://a.co/7PzMCcy                                            
(Use `node --trace-warnings ...` to show where the warning was created)     
````
To visit the UI of Dynamodb-Admin you have to use localhost:8001 in this case
