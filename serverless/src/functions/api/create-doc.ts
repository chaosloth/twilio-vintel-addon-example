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
  SYNC_SERVICE_SID: string;
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

    const response = new Twilio.Response();
    // Set the CORS headers to allow Flex to make an error-free HTTP request
    // to this Function
    response.appendHeader("Access-Control-Allow-Origin", "*");
    response.appendHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
    response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
    response.appendHeader("Content-Type", "application/json");

    if (!event.transcriptionSid) {
      response.setBody({ error: "transcriptionSid not provided" });
      response.setStatusCode(400);
      console.error("Missing transcriptionSid in request");
      callback(null, response);
    }

    /*
     * CREATE SYNC DOC
     */
    let client = context.getTwilioClient();
    let result = await client.sync.v1
      .services(context.SYNC_SERVICE_SID)
      .syncMaps.create({ uniqueName: `TRANSCRIPT_${event.transcriptionSid}` });

    response.setBody({ status: "created", sid: result.sid });
    return callback(null, response);
  };
