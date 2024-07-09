import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import { getCount, incrementCount } from "./feedbacks.js";
import * as courseService from "./courses.js";

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const options = ["Poor", "Fair", "Good", "Very good", "Excellent"];

export const getFeedback = async (c) => {
  const id = c.req.param("id");
  const key = c.req.param("key");
  const count = await getCount(id, key);
  return c.text(`Course ${id}, Feedback ${key}: ${count}`);
};

export const postFeedback = async (c) => {
  const id = c.req.param("id");
  const key = c.req.param("key");
  await incrementCount(id, key);
  return c.redirect(`/courses/${id}`);
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
    eta.render("course.eta", {
      course: await courseService.getCourse(id),
      options,
    })
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
