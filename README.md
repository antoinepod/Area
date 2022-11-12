## Build a Dockerfile in a repo
`docker build -t webapp .`

## Run a single dockerfile
`docker run -p 3000:3000 (-d) (-it) webapp`


## Build docker-compose (prod)
`docker-compose build`


## Run docker-compose (prod)
`docker-compose up`

## Build docker-compose (dev)
`docker-compose -f docker-compose.dev.yml build`

## Run docker-compose (prod)
`docker-compose -f docker-compose.dev.yml up`


## installer mongodb
