import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import { getCount, incrementCount } from "./feedbacks.js";
import * as courseService from "./courses.js";

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

// * ----------------------------------------------------------

export const showForm = async (c) => {
  return c.html(
    eta.render("courses.eta", { courses: await courseService.listCourses() })
  );
};

export const createCourse = async (c) => {
  const body = await c.req.parseBody();
  await courseService.createCourse(body);
  return c.redirect("/courses");
};

export const showCourse = async (c) => {
  const id = c.req.param("id");
  return c.html(
    eta.render("course.eta", { course: await courseService.getCourse(id) })
  );
};

export const updateCourse = async (c) => {
  const id = c.req.param("id");
  const body = await c.req.parseBody();
  await courseService.updateCourse(id, body);
  return c.redirect(`/courses/${id}`);
};

export const deleteCourse = async (c) => {
  const id = c.req.param("id");
  await courseService.deleteCourse(id);
  return c.redirect("/courses");
};
