# Chainlink Fixer External Adapter

This adapter is for [Fixer.io](https://fixer.io/) and supports the convert endpoint.

## Input Params

- `base` or `from`: The target currency to query (required)
- `quote` or `to`: The currency to convert to (required)
- `endpoint`: The endpoint to call (optional)
- `amount`: The amount to convert (optional)

## Output

```json
{
 "jobRunID": "1",
 "data": {
  "success": true,
  "query": {
   "from": "GBP",
   "to": "JPY",
   "amount": 1
  },
  "info": {
   "timestamp": 1519328414,
   "rate": 148.972231
  },
  "historical": "",
  "date": "2018-02-22",
  "result": 148.972231
 },
 "result": 148.972231,
 "statusCode": 200
}
```

## Install

```bash
yarn
```

## Test

```bash
yarn test
```

## Create the zip

```bash
zip -r cl-fixer.zip .
```

## Docker

If you wish to use Docker to run the adapter, you can build the image by running the following command:

```bash
docker build . -t fixer-adapter
```

Then run it with:

```bash
docker run -p 8080:8080 -e API_KEY='YOUR_API_KEY' -it fixer-adapter:latest
```

## Install to AWS Lambda

- In Lambda Functions, create function
- On the Create function page:
  - Give the function a name
  - Use Node.js 12.x for the runtime
  - Choose an existing role or create a new one
  - Click Create Function
- Under Function code, select "Upload a .zip file" from the Code entry type drop-down
- Click Upload and select the `cl-fixer.zip` file
- Handler should remain index.handler
- Add the environment variable (repeat for all environment variables):
  - Key: API_KEY
  - Value: Your_API_key
- Save


## Install to GCP

- In Functions, create a new function, choose to ZIP upload
- Click Browse and select the `cl-fixer.zip` file
- Select a Storage Bucket to keep the zip in
- Function to execute: gcpservice
- Click More, Add variable (repeat for all environment variables)
  - NAME: API_KEY
  - VALUE: Your_API_key
