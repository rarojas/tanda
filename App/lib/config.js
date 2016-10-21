module.exports = {
  SESSION_TOKEN_KEY: 'token',
  backend: {
    hapiRemote: false,
    hapiLocal: true
  },
  HAPI: {
    local: {
      url: 'http://192.168.0.140:3000'
    },
    remote: {
      url: 'https://snowflakeserver-bartonhammond.rhcloud.com/'
    }
  }
}
