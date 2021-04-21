import fsx from "fs-extra";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const { readJSON, writeJSON } = fsx;

export const dataFolder = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data"
);

export const getPeople = async () => {
  return await readJSON(join(dataFolder, "people.json"));
};

export const writePeople = async (content) => {
  return await writeJSON(join(dataFolder, "people.json"), content);
};
