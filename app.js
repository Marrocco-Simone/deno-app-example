import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import {
  getFeedback,
  // getIndexHtml,
  postFeedback,
  createCourse,
  deleteCourse,
  showCourse,
  showForm,
  updateCourse,
} from "./controllers.js";

const app = new Hono();

app.get("/", (c) => c.redirect("/courses"));
app.get("/courses/:id/feedbacks/:key", getFeedback);
app.post("/courses/:id/feedbacks/:key", postFeedback);

app.get("/courses", showForm);
app.get("/courses/:id", showCourse);
app.post("/courses", createCourse);
app.post("/courses/:id", updateCourse);
app.post("/courses/:id/delete", deleteCourse);

export default app;
