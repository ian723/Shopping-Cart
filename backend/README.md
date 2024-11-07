# Shopping App

## Installation

`npm i`

## How to run the server and mpesa api locally

Create an account in Mpesa Daraja API website

Create an app in the safaricom portal

Copy the `.env.example` to `.env`:

```
cp .env.example .env
```

Copy your consumer key, secret and passkey (all accessible from
the mpesa daraja platform) to the `.env` file

Mpesa requires callback urls be served via https this can be achieved
through installing local tunneling apps e.g localtunnel, localhost.run, ngrok etc

Install localtunnel via `npm i -g localtunnel`

Run localtunnel in a new terminal via `lt --port 5000`

It will display a url, copy the url to the `.env` file in the `CALLBACK_URL` value and leave it running

You can leave the shortcode as it is for local testing.

To run the dev server do:

`npm run dev`

You can now test the payment by buying a product and checkout as cashless

Enter the phone number in the format `254...`
