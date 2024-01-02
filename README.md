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

## You only need the following parts if you want to develop parts in kubernetes
## Kind (Kubernetes in docker)
Link: [Kind quick start guide](https://kind.sigs.k8s.io/docs/user/quick-start/#installing-with-a-package-manager)

To install Kind on linux you can follow these steps:
[release page](https://github.com/kubernetes-sigs/kind/releases)
````shell
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
# verify the installation
kind version

# Result should look like this
[12:15:42] [WSL/local] euronics-kurz ~$ kind version
kind v0.20.0 go1.20.4 linux/amd64
````

#### Create a new Kind Cluster
````shell
kind create cluster # Default cluster context name is `kind-kind`
````

## ArgoCD
Link: [ArgoCD](https://argo-cd.readthedocs.io/en/stable/getting_started/)

Notice: before you're able to install ArgoCD on you local Kind - Cluster you have to install kubectl[](https://kubernetes.io/de/docs/tasks/tools/install-kubectl-linux/)

#### Install ArgoCD
````shell
kubectl config current-context # should be kind-kind(local kind cluster) not prod context or anything else
# if you have to switch the context do the following
kubectl config get-contexts
# pick the correct Kind name to switch to you local context
kubectl config use-context kind-kind

# install argocd on cluster
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/core-install.yaml
````
#### Install ArgoCD CLI
Link: [CLI installation](https://argo-cd.readthedocs.io/en/stable/cli_installation/)


#### Expose ArgoCD UI via Port Forwarding
````shell
kubectl port-forward svc/argocd-server -n argocd 8080:443
````

### Login using the CLI
The initial password for the admin account is auto-generated and stored as clear
text in the field password in a secret named argocd-initial-admin-secret
in your Argo CD installation namespace. You can simply retrieve this password
using the argocd CLI:
````shell
argocd admin initial-password -n argocd
````

#### Login
Go to [locale ArgoCD](http://localhost:8080)

User: admin

PW: the one from the commandline above
