const {
  NODE_ENV,
  APP_NAME,
  APP_PROTOCOL,
  APP_HOST,
  APP_PORT,
  MS_1,
  MS_2,
  MS_3,
} = process.env;

let env = NODE_ENV === 'development' || NODE_ENV === 'dev' ? 'dev' : 'dev';
env = NODE_ENV === 'test' ? 'test' : env;
env = NODE_ENV === 'staging' || NODE_ENV === 'stag' ? 'stag' : env;
env = NODE_ENV === 'production' || NODE_ENV === 'prod' ? 'prod' : env;

const dev = {
  env,
  protocol: APP_PROTOCOL,
  appName: APP_NAME,
  appHost: APP_HOST,
  appPort: APP_PORT,
  ms1: MS_1,
  ms2: MS_2,
  ms3: MS_3,
};

const test = {
  env,
  protocol: APP_PROTOCOL,
  appName: APP_NAME,
  appHost: APP_HOST,
  appPort: APP_PORT,
  ms1: MS_1,
  ms2: MS_2,
  ms3: MS_3,
};

const stag = {
  env,
  protocol: APP_PROTOCOL,
  appName: APP_NAME,
  appHost: APP_HOST,
  appPort: APP_PORT,
  ms1: MS_1,
  ms2: MS_2,
  ms3: MS_3,
};

const prod = {
  env,
  protocol: APP_PROTOCOL,
  appName: APP_NAME,
  appHost: APP_HOST,
  appPort: APP_PORT,
  ms1: MS_1,
  ms2: MS_2,
  ms3: MS_3,
};

let config = dev;

if (NODE_ENV === 'dev') {
  config = dev;
}
if (NODE_ENV === 'test') {
  config = test;
}
if (NODE_ENV === 'stag') {
  config = stag;
}
if (NODE_ENV === 'prod') {
  config = prod;
}

module.exports = config;
