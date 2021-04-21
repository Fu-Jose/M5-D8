import fs from "fs-extra";
import { join } from "path";
import PdfPrinter from "pdfmake";
import { pipeline } from "stream";
import { promisify } from "util";
import { dataFolder } from "../lib/people.services.js";

const asyncPipeline = promisify(pipeline);

export const generatePdf = async (data) => {
  try {
    const fonts = {
      Roboto: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique",
      },
    };
    const docDefinition = {
      content: [`Hello ${data.name} this is a test pdf ${data.number}`],
    };

    const printer = new PdfPrinter(fonts);

    const pdfReadableStream = printer.createPdfKitDocument(docDefinition);

    pdfReadableStream.end();

    const path = join(dataFolder, "example.pdf");
    await asyncPipeline(pdfReadableStream, fs.createWriteStream(path));
    return path;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred when creating PDF");
  }
};
