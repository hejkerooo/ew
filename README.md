## Requirements
- NodeJS Version >= 14\
- Redis

## Run in docker

Run `docker-compose build -f docker-compose.yml api`  
Run `$ docker-compose up -d`

## Run without docker

1. Setup Redis
2. Run `$ cp .env.example .env`
3. Fill values in `.env`
4. Use `$ npm run start:dev` 

## API Docs

When application is live go to `{{HOST}}/docs`

## Run E2E tests

```bash
$ docker-compose -f docker-compose.e2e.yml build api_e2e
$ docker-compose -f docker-compose.e2e.yml up --abort-on-container-exit --force-recreate --exit-code-from api_e2e
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
