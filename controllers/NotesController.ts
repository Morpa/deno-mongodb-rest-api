import { RouterContext } from "https://deno.land/x/oak/mod.ts";

import NoteService from "../services/NoteService.ts";

const noteService = new NoteService();

export const getAllNotes = async (ctx: RouterContext) => {
  const { response } = ctx;

  response.body = await noteService.getAllNotes();
};

export const getOneNote = async (ctx: RouterContext) => {
  const { response } = ctx;

  const { id } = ctx.params as { id: string };

  const note = await noteService.getSingleNote(id);

  response.body = note;
};

export const updateNote = async (ctx: RouterContext) => {
  const { request, response } = ctx;
  const { id } = ctx.params as { id: string };

  const { value: { title, content } } = await request.body();

  const data = {
    title,
    content,
  };

  const { modifiedCount } = await noteService.updateNote(id, data);

  if (!modifiedCount) {
    response.status = 404;
    response.body = { message: "Note does not exist" };
    return;
  }

  response.body = await noteService.getSingleNote(id);
};

export const createNote = async (ctx: RouterContext) => {
  const { request, response } = ctx;

  if (!request.hasBody) {
    response.status = 400;
    response.body = { message: "Invalid note data" };
    return;
  }

  const { value: { title, content } } = await request.body();

  const date = new Date();

  const note = await noteService.createNote({ title, content, date });

  response.status = 201;
  response.body = note;
};

export const deleteNote = async (ctx: RouterContext) => {
  const { response } = ctx;
  const { id } = ctx.params as { id: string };

  const count = await noteService.deleteNote(id);

  if (!count) {
    response.status = 404;
    response.body = { message: "Note does not exist" };
    return;
  }

  response.status = 204;
};
