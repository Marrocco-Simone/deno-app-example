import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { getCount, incrementCount } from "./feedbacks.js";
import * as courseService from "./courses.js";

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const options = ["Poor", "Fair", "Good", "Very good", "Excellent"];

const validator = z.object({
  name: z
    .string({
      message: "The course name should be a string of at least 4 characters.",
    })
    .min(4, {
      message: "The course name should be a string of at least 4 characters.",
    }),
});

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

export const showForm = async (c, extra_args = {}) => {
  return c.html(
    eta.render("courses.eta", {
      courses: await courseService.listCourses(),
      ...extra_args,
    })
  );
};

export const createCourse = async (c) => {
  const body = await c.req.parseBody();
  const validationResult = validator.safeParse(body);
  if (!validationResult.success) {
    const errors = validationResult.error.format();
    console.log(errors);
    return showForm(c, { ...body, errors });
  }
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
