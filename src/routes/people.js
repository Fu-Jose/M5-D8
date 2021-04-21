import express from "express";
import { getPeople, writePeople } from "../lib/people.services.js";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const persons = await getPeople();
    res.send(persons);
    console.log("ok");
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const persons = await getPeople();
    const newpeople = { ...req.body };
    persons.push(newpeople);
    await writePeople();
    res.send(persons);
    // const message = {
    //   to: `juanjose1@live.it`,
    //   from: "juanjose1@live.it",
    //   subject: "TEST",
    //   text: "HELLO THIS IS A TEST",
    // };
    // sgMail
    //   .send(message)
    //   .then((response) => console.log("Email sent!"))
    //   .catch((error) => console.log(error.message));
  } catch (error) {
    next(error);
  }
});

export default router;
