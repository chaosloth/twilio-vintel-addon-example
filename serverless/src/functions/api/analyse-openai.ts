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

    const formatMessage = (channel: number, text: string) => ({
      role: channel == 1 ? "user" : "assistant",
      content: text,
    });

    const prompt = [
      {
        role: "system",
        content: `Anaylse this customer service interaction, respond back with a JSON object with the keys {"sentiment","business_outcome","summary", "intervention_required","predicted_nps_score","predicted_csat_score"}`,
      },
    ];

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

    (sentences as Sentence[]).forEach(({ channel, transcript }) =>
      prompt.push(formatMessage(channel, transcript))
    );

    const openai = new OpenAI({
      apiKey: context.OPENAI_API_KEY,
    });

    /*
     * PERFORM ANALYSIS
     */
    const result = await openai.chat.completions.create({
      model: context.OPENAI_MODEL,
      messages: prompt,
      temperature: 0.3,
    });

    console.log("OpenAI input:", prompt);

    console.log(
      "OpenAI result:",
      JSON.stringify(result.choices[0].message.content)
    );

    if (result.choices[0].message.content) {
      const analysis = result.choices[0].message.content;
      response.setBody(analysis);
      /*
       * STORE IN SYNC DOC
       */
      console.log("OpenAI Analysis:", analysis);

      let sync_data = JSON.parse(analysis);
      let client = context.getTwilioClient();
      await client.sync.v1
        .services(context.SYNC_SERVICE_SID)
        .syncMaps(`TRANSCRIPT_${event.transcriptionSid}`)
        .syncMapItems.create({ key: "openai", data: sync_data })
        .then((sync_map_item) => {
          console.log("Created new sync map item: ", sync_map_item);
        });
      return callback(null, response);
    }

    throw new Error("Unable to analyse data recommendation.");
  };
