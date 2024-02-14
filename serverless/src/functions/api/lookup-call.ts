// Imports global types
import "@twilio-labs/serverless-runtime-types";
// Fetches specific types
import {
  Context,
  ServerlessCallback,
  ServerlessFunctionSignature,
} from "@twilio-labs/serverless-runtime-types/types";

type MyContext = {
  ACCOUNT_SID: string;
  AUTH_TOKEN: string;
  TWILIO_API_KEY: string;
  TWILIO_API_SECRET: string;
  VINTEL_SERVICE_SID: string;
};

type MyEvent = {
  callSid: string;
};

const TOKEN_TTL_IN_SECONDS = 60 * 60 * 6;

export const handler: ServerlessFunctionSignature<MyContext, MyEvent> =
  async function (
    context: Context<MyContext>,
    event: MyEvent,
    callback: ServerlessCallback
  ) {
    console.log(">>> INCOMING TOKEN REQUEST >>>");
    console.log(event);

    const response = new Twilio.Response();
    // Set the CORS headers to allow Flex to make an error-free HTTP request
    // to this Function
    response.appendHeader("Access-Control-Allow-Origin", "*");
    response.appendHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
    response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
    response.appendHeader("Content-Type", "application/json");

    if (!event.callSid) {
      response.setBody({ error: "callSid not provided" });
      response.setStatusCode(400);
      console.error("Missing callSid in request");
      callback(null, response);
    }

    const rsp = await fetch(
      `https://ai.twilio.com/v1/Services/${context.VINTEL_SERVICE_SID}/Transcripts?CallSid=${event.callSid}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(
            context.ACCOUNT_SID + ":" + context.AUTH_TOKEN
          )})`,
        },
      }
    );

    let data = await rsp.json();
    console.log("Transcript", data);
    response.setBody(data);

    console.log(response);
    callback(null, response);
  };
