import express from "express";
import { getPeople, writePeople } from "../lib/people.services.js";
import sgMail from "@sendgrid/mail";
import { generatePdf } from "../lib/createpdf.js";

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

router.get("/pdf", async (req, res, next) => {
  try {
    await generatePdf({
      name: "Juan",
      number: 999,
    });
    console.log("ok");
    res.send("PDF was generated");
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const persons = await getPeople();
    const newPeople = { ...req.body };
    persons.push(newPeople);
    await writePeople(persons);
    // res.send(persons);
    const message = {
      // to: `${req.body.email}`,
      to: `juanjose1@live.it`,
      from: "juanjose1@live.it",
      subject: "TEST",
      text: "HELLO THIS IS A TEST",
    };
    await sgMail.send(message);
    res.send("Email sent");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
