module.exports = {
  SESSION_TOKEN_KEY: 'token',
  backend: {
    hapiRemote: false,
    hapiLocal: true
  },
  HAPI: {
    local: {
      url: 'http://10.230.40.79:3000'
    },
    remote: {
      url: 'https://snowflakeserver-bartonhammond.rhcloud.com/'
    }
  }
}
