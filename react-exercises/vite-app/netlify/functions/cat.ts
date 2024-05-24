/* eslint-disable @typescript-eslint/no-unused-vars */
import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import axios from "axios";

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const CAT_API = `https://randomfox.ca/floof/`;
  const response = await axios.get(CAT_API);
  const data = response.data;

  return {
    statusCode: 200,
    body: JSON.stringify({ data }),
  };
};

export { handler };
