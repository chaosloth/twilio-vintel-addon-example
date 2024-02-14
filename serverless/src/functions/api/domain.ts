// Imports global types
import "@twilio-labs/serverless-runtime-types";
// Fetches specific types
import {
  Context,
  ServerlessCallback,
  ServerlessFunctionSignature,
} from "@twilio-labs/serverless-runtime-types/types";
import { Sentence } from "../../types/Sentences";

const { OpenAI } = require("openai");

type MyContext = {
  ACCOUNT_SID: string;
  AUTH_TOKEN: string;
  TWILIO_API_KEY: string;
  TWILIO_API_SECRET: string;
  VINTEL_SERVICE_SID: string;
  HUMEAI_API_KEY: string;
  DOMAIN_OVERRIDE: string;
};

type MyEvent = {
  transcriptionSid: any;
};

export const handler: ServerlessFunctionSignature<MyContext, MyEvent> =
  async function (
    context: Context<MyContext>,
    event: MyEvent,
    callback: ServerlessCallback
  ) {
    console.log(">>> INCOMING TOKEN REQUEST >>>");
    console.log(event);
    console.log("Domain name", context.DOMAIN_NAME);

    return callback(null, { domain: context.DOMAIN_NAME });
  };
