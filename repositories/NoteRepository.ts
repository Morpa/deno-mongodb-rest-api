import db from "../db/mongodb.ts";
import INote from "../entities/INotes.ts";

class NoteRepository {
  private notesCollection = db.findDatabase.collection("Notes");

  async getAll() {
    const notes = await this.notesCollection.find();

    return notes;
  }

  async getOne(id: string) {
    const note = await this.notesCollection.findOne({ _id: { $oid: id } });

    return note;
  }

  async update(id: string, data: INote) {
    const { title, content } = data;

    const note = await this.notesCollection.updateOne(
      { _id: { $oid: id } },
      {
        $set: {
          title,
          content,
        },
      },
    );

    return note;
  }

  async create(note: INote) {
    const { $oid } = await this.notesCollection.insertOne(note);

    return $oid;
  }

  async delete(id: string) {
    const count = await this.notesCollection.deleteOne({ _id: { $oid: id } });

    return count;
  }
}

export default NoteRepository;
