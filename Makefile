.PHONY: help
help: ## Display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_0-9-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

.PHONY: docker-build
docker-build: ## rebuild whole docker app wihtout cache
	docker-compose build --no-cache

.PHONY: start-server
start-server: ## Start the whole docker app
	docker-compose --env-file ./.env.develop up || true

.PHONY: start-server-silent
start-server-silent: ## Start the whole docker app without console output
	docker-compose --env-file ./.env.develop up -d || true

.PHONY: stop-server
stop-server: ##stop all running container
	docker-compose --env-file ./.env.develop down || true
