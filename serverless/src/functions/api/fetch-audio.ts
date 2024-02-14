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
};

import nfetch from "node-fetch";

type MyEvent = { RecordingSid: string };

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
    response.appendHeader("Content-Type", "audio/mp3");

    nfetch(
      `https://api.twilio.com/2010-04-01/Accounts/${context.ACCOUNT_SID}/Recordings/${event.RecordingSid}.mp3`,
      {
        method: "GET",
        redirect: "follow",
        headers: {
          "Content-Type": "audio/mp3",
          Authorization:
            "Basic " + btoa(`${context.ACCOUNT_SID}:${context.AUTH_TOKEN}`),
        },
      }
    )
      .then((media_res: any) => media_res.arrayBuffer())
      .then((buff) => {
        console.log(buff);
        response.setBody(Buffer.from(buff));
      })
      .finally(() => {
        return callback(null, response);
      });
  };
