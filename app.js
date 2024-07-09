import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import { getFeedback, getIndexHtml, postFeedback } from "./controllers.js";

const app = new Hono();

app.get("/", getIndexHtml);
app.get("/feedbacks/:key", getFeedback);
app.post("/feedbacks/:key", postFeedback);

export default app;
