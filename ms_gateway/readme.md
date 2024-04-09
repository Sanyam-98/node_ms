
#  ms gateway readme file

# This is gateway microservice which is the only entry point of all API. Gateway microservice receive direct request from client (web/mobile) and forward to authentication microservice

> ## Create .env file in  the project root folder by adding following configuration parameters

```env
NODE_ENV="development|testing|staging|production"           # Node environment

APP_NAME="gateway" # Application name
APP_PROTOCOL="http|https"                                   # Http request protocol
APP_HOST="localhost|127.0.0.1|ip address|domain name"       # App host
APP_PORT=5100                                               # App port

MS_AUTH="http://localhost:5101"                             # Authentication microservice url
MS_USER="http://localhost:5102"                             # User microservice url
```

http://localhost:6200/api/v1/welcome
