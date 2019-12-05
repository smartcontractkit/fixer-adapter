const request = require('request')

const createRequest = (input, callback) => {
  let url = 'https://data.fixer.io/api/'
  const endpoint = input.data.endpoint || 'convert'
  url = url + endpoint

  const from = input.data.from || 'EUR'
  const to = input.data.to || 'USD'
  const amount = input.data.amount || '1'

  const queryObj = {
    access_key: process.env.API_KEY,
    from: from,
    to: to,
    amount: amount
  }

  const options = {
    url: url,
    qs: queryObj,
    json: true
  }
  request(options, (error, response, body) => {
    if (error || response.statusCode >= 400) {
      callback(response.statusCode, {
        jobRunID: input.id,
        status: 'errored',
        error: body,
        statusCode: response.statusCode
      })
    } else {
      const result = body.result
      callback(response.statusCode, {
        jobRunID: input.id,
        data: body,
        result: result,
        statusCode: response.statusCode
      })
    }
  })
}

exports.gcpservice = (req, res) => {
  createRequest(req.body, (statusCode, data) => {
    res.status(statusCode).send(data)
  })
}

exports.handler = (event, context, callback) => {
  createRequest(event, (statusCode, data) => {
    callback(null, data)
  })
}

exports.handlerv2 = (event, context, callback) => {
  createRequest(JSON.parse(event.body), (statusCode, data) => {
    callback(null, {
      statusCode: statusCode,
      body: JSON.stringify(data),
      isBase64Encoded: false
    })
  })
}

module.exports.createRequest = createRequest
