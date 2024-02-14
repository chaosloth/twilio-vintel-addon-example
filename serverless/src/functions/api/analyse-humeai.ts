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

    const rsp = await fetch(
      `https://ai.twilio.com/v1/Services/${context.VINTEL_SERVICE_SID}/Transcripts/${event.transcriptionSid}/Sentences?PageSize=5000`,
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
    const { sentences } = data;
    const text: string[] = [];

    (sentences as Sentence[]).forEach(({ transcript }) =>
      text.push(transcript)
    );

    const hume_rsp = await fetch(`https://api.hume.ai/v0/batch/jobs`, {
      method: "POST",
      headers: {
        accept: "application/json; charset=utf-8",
        "content-type": "application/json; charset=utf-8",
        "X-Hume-Api-Key": context.HUMEAI_API_KEY,
      },
      body: JSON.stringify({
        models: {
          language: { granularity: "conversational_turn" },
        },
        notify: false,
        callback_url: `https://${context.DOMAIN_NAME}/api/callback-humeai?transcriptionSid=${event.transcriptionSid}`,
        text,
      }),
    });

    const hume_json = await hume_rsp.json();

    /*
     * CREATE SYNC DOC
     */

    const sync_data: any = {
      ...hume_json,
      status: "pending",
    };

    try {
      let client = context.getTwilioClient();
      let result = await client.sync.v1
        .services(context.SYNC_SERVICE_SID)
        .syncMaps(`TRANSCRIPT_${event.transcriptionSid}`)
        .syncMapItems.create({ key: "humeai", data: sync_data })
        .then((sync_map_item) => {
          console.log("Created new sync map item: ", sync_map_item);
        });

      response.setBody({ status: "created", pending: result });

      return callback(null, response);
    } catch (error) {
      console.log("Opps, an error happened", error);
    }

    throw new Error("An error occured, please check the logs");
  };
