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

    if (!event.transcriptionSid) {
      response.setBody({ error: "transcriptionSid not provided" });
      response.setStatusCode(400);
      console.error("Missing transcriptionSid in request");
      return callback(null, response);
    }

    let client = context.getTwilioClient();

    try {
      const item = await client.sync.v1
        .services(context.SYNC_SERVICE_SID)
        .syncMaps(`TRANSCRIPT_${event.transcriptionSid}`)
        .syncMapItems("humeai")
        .fetch();

      const job_id = item.data.job_id;

      const rsp = await fetch(
        `https://api.hume.ai/v0/batch/jobs/${job_id}/predictions`,
        {
          method: "GET",
          headers: {
            accept: "application/json; charset=utf-8",
            "content-type": "application/json; charset=utf-8",
            "X-Hume-Api-Key": context.HUMEAI_API_KEY,
          },
        }
      );

      let data = await rsp.json();
      console.log("Predictions", data[0]);
      response.setBody(data[0]);
      console.log(response);
    } catch (err) {
      console.log("Error", err);
      response.setStatusCode(404);
    }
    callback(null, response);
  };
