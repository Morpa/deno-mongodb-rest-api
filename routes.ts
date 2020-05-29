import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import db from "./mongodb.ts";

interface INote {
  _id?: string;
  title: string;
  content: string;
  date: Date;
}

const notesCollection = db.collection("notes");

const getNotes = async (ctx: RouterContext) => {
  const notes = await notesCollection.find();

  ctx.response.body = notes;
};

const getSingleNote = async (ctx: RouterContext) => {
  const id = ctx.params.id;

  const note = await notesCollection.findOne({_id: { $oid: id }});

  ctx.response.body = note;
};

const createNote = async (ctx: RouterContext) => {
  const { value: { title, content } } = await ctx.request.body()
  
  const note: INote = {
    title,
    content,
    date: new Date()
  }
  
 const id = await notesCollection.insertOne(note)

  note._id = id;
  ctx.response.status = 201;
  ctx.response.body = note;
};

const updateNote = async (ctx: RouterContext) => {
  const id = ctx.params.id;

  const { value: { title, content } } = await ctx.request.body()

  const { modifiedCount } = await notesCollection.updateOne({ _id: { $oid: id } }, {
    $set: {
      title,
      content
    }
  });

  if (!modifiedCount) {
    ctx.response.status = 404;
    ctx.response.body = { message: 'Note does not exist' }
    return;
  }

  ctx.response.body = await notesCollection.findOne({ _id: { $oid: id } });
};

const deleteNote = async (ctx: RouterContext) => {
  const id = ctx.params.id;

  const count = await notesCollection.deleteOne({ _id: { $oid: id } })

  if (!count) {
    ctx.response.status = 404;
    ctx.response.body = { message: 'Note does not exist' }
    return;
  }

  ctx.response.status = 204

};

export { getNotes, getSingleNote, createNote, updateNote, deleteNote };
