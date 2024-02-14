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
  HUMEAI_API_KEY: string;
  SYNC_SERVICE_SID: string;
};

type MyEvent = {
  RecordingSid: string;
  CallSid: string;
  RecordingStatus: string;
};

export const handler: ServerlessFunctionSignature<MyContext, MyEvent> =
  async function (
    context: Context<MyContext>,
    event: MyEvent,
    callback: ServerlessCallback
  ) {
    console.log(">>> INCOMING REQUEST >>>");
    console.log(event);

    const response = new Twilio.Response();
    // Set the CORS headers to allow Flex to make an error-free HTTP request
    // to this Function
    response.appendHeader("Access-Control-Allow-Origin", "*");
    response.appendHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
    response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
    response.appendHeader("Content-Type", "application/json");

    if (!event.RecordingSid) {
      response.setBody({ error: "RecordingSid not provided" });
      response.setStatusCode(400);
      console.error("Missing RecordingSid in request");
      callback(null, response);
    }

    try {
      const { body } = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${context.ACCOUNT_SID}/Recordings/${event.RecordingSid}.mp3`
      );

      const hume_rsp = await fetch(
        `https://test-api.hume.ai/v0/registry/files`,
        {
          method: "POST",
          headers: {
            accept: "application/json; charset=utf-8",
            "content-type": "application/json; charset=utf-8",
            "X-Hume-Api-Key": context.HUMEAI_API_KEY,
          },
          body: JSON.stringify([
            {
              file: {
                name: `${event.RecordingSid}.mp3`,
                uri: `https://api.twilio.com/2010-04-01/Accounts/${context.ACCOUNT_SID}/Recordings/${event.RecordingSid}.mp3`,
                hume_storage: true,
                data_type: "audio/mp3",
                metadata: {
                  CallSid: event.CallSid,
                  RecordingSid: event.RecordingSid,
                },
              },
            },
          ]),
        }
      );

      // let client = context.getTwilioClient();

      // client.recordings('REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
      // .fetch()
      // .then(recording => console.log(recording.callSid));

      response.setBody({ status: "created", pending: result });

      return callback(null, response);
    } catch (error) {
      console.log("Opps, an error happened", error);
    }

    throw new Error("An error occured, please check the logs");
  };
