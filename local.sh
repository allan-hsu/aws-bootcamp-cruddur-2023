#!/bin/bash -xe

docker compose --file ./docker-compose-local.yml --env-file .env.dev up