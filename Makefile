.PHONY : build
build:  ## Build all
	@echo "[Building all tools...]"
	docker-compose up --build
down:
	docker-compose down