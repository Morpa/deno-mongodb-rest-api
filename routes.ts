import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  getAllNotes,
  createNote,
  getOneNote,
  updateNote,
  deleteNote,
} from "./controllers/NotesController.ts";

const router = new Router();

router
  .get("/notes", getAllNotes)
  .post("/notes", createNote)
  .get("/notes/:id", getOneNote)
  .put("/notes/:id", updateNote)
  .delete("/notes/:id", deleteNote);

export default router;
