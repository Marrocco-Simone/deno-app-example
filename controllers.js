import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import { getCount, incrementCount } from "./feedbacks.js";

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const data = {
  options: ["Poor", "Fair", "Good", "Very good", "Excellent"],
};

export const getIndexHtml = (c) => {
  return c.html(eta.render("index.eta", data));
};

export const getFeedback = async (c) => {
  const key = c.req.param("key");
  const count = await getCount(key);
  return c.text(`Feedback ${key}: ${count}`);
};

export const postFeedback = async (c) => {
  const key = c.req.param("key");
  await incrementCount(key);
  return c.redirect("/");
};
