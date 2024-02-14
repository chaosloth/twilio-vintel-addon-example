# Voice Intelligence Add Ons
A simple react based Web UI that uses Twilio Voice Intelligence and 3rd party AI to do cool stuff

In this example we use:
- Twilio Voice Intelligence
- Hume AI for emotion detection
- Open AI for summarisation and predictions
 
## Requirements
- A Twilio account
- API keys for Hume and Open AI
- Someone to call :)


![demo](/docs/screen1.png)
![demo](/docs/screen2.png)
![demo](/docs/screen3.png)


# Twilio Console Config

## API Keys
1. In Console, open Account > API Keys
2. Create a new API key
3. Put the values in the `serverless/.env` file


# App Build

## Configuration
In the `serverless` folder create an `.env` file using the `.env.example`, populate the required values (from above)

## Build the Next App
In the `client-ui` folder, run `yarn build` or `npm run build`.  This will create the next app and move the output to the `../serverless/dist/assets` folder

## Deploy serverless
Deploy the application to Twilio serverless 
```sh
serverless $ twilio serverless deploy
```
