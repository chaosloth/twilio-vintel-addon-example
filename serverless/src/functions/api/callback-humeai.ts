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
  OPENAI_MODEL: string;
  OPENAI_API_KEY: string;
  SYNC_SERVICE_SID: string;
};

type MyEvent = {
  predictions: any;
  transcriptionSid: string;
  job_id: string;
};

export const handler: ServerlessFunctionSignature<MyContext, MyEvent> =
  async function (
    context: Context<MyContext>,
    event: MyEvent,
    callback: ServerlessCallback
  ) {
    console.log(">>> INCOMING TOKEN REQUEST >>>");
    console.log(event);
    console.log(JSON.stringify(event.predictions));

    const response = new Twilio.Response();
    // Set the CORS headers to allow Flex to make an error-free HTTP request
    // to this Function
    response.appendHeader("Access-Control-Allow-Origin", "*");
    response.appendHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
    response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
    response.appendHeader("Content-Type", "application/json");

    let client = context.getTwilioClient();
    await client.sync.v1
      .services(context.SYNC_SERVICE_SID)
      .syncMaps(`TRANSCRIPT_${event.transcriptionSid}`)
      .syncMapItems("humeai")
      .update({
        data: {
          job_id: event.job_id,
          status: "complete",
        },
      })
      .then((sync_map_item) => {
        console.log("Updated sync map item: ", sync_map_item);
      });

    callback(null, { status: "ok" });
  };
