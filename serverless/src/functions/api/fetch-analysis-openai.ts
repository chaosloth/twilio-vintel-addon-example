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
  TWIML_APP_SID: string;
  HUMEAI_API_KEY: string;
  SYNC_SERVICE_SID: string;
};

type MyEvent = { transcriptionSid: string };

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

    let client = context.getTwilioClient();

    try {
      const item = await client.sync.v1
        .services(context.SYNC_SERVICE_SID)
        .syncMaps(`TRANSCRIPT_${event.transcriptionSid}`)
        .syncMapItems("openai")
        .fetch();

      const { data } = item;
      response.setBody(data);
      console.log(response);
    } catch (error: any) {
      console.log("Error fetching", error);
      response.setStatusCode(404);
      response.setBody({ status: "not found" });
    }

    return callback(null, response);
  };
