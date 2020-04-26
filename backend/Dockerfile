# https://stackoverflow.com/questions/55958498/go-docker-autoreload-with-compiledaemon

FROM golang:alpine3.11

RUN apk add --no-cache ca-certificates git
RUN go get github.com/githubnemo/CompileDaemon

WORKDIR /backend
COPY . .

RUN go get -d -v ./...
RUN go install -v ./...

ENTRYPOINT CompileDaemon -log-prefix=false -directory="." -build="go build backend" -command="./backend"