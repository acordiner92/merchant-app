# merchant-app

Merchant App which can create, update, delete, view and view multiple.

## Notes

A few things that are missing/enhancements from this project are the following:
Api:

- Events being emitted in the MerchantService and having an log subscriber to log the event for traceability

Client:

- Error handling on the client MerchantService to handle error views (e.g notifying an alert banner via redux store)
- Mounted tests for MerchantForm to test required field logic

## Requirements

- NodeJS 14.3 or higher
- docker

## Installation

- clone the project `git clone git@github.com:acordiner92/hcard-builder.git`
- cd in both /client and /api and `npm i`
- cd in /api and run docker-compose up and wait until postgres connection is up (takes a little bit on first go)
- run migration with `npm run db:migrate:all

## How to run

To run api:
`npm start`
which will be available on `http://localhost:8080/`

To run client:
`npm start`
which will be available on `http://localhost:3000/`

## How to run tests

To run api tests:
`npm run test`

To run client tests:
`npm run test`
