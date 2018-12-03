#!/usr/bin/env bash

docker-compose stop || true
docker rm mongodb || true
docker-compose up --build -d
sleep 30
npm run test
docker-compose stop || true
