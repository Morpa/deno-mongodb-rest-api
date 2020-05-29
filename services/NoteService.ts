import NotesRepository from "../repositories/NoteRepository.ts";
import INote from "../entities/INotes.ts";

class NoteService {
  private notesRepository = new NotesRepository();

  getAllNotes = async () => {
    return await this.notesRepository.getAll();
  };

  getSingleNote = async (id: string) => {
    return await this.notesRepository.getOne(id);
  };

  updateNote = async (id: string, data: INote) => {
    return await this.notesRepository.update(id, data);
  };

  createNote = async (note: INote) => {
    return await this.notesRepository.create(note);
  };

  deleteNote = async (id: string) => {
    return await this.notesRepository.delete(id);
  };
}

export default NoteService;
