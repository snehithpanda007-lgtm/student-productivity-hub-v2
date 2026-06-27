"use client";

import { useEffect, useState } from "react";
import { Note } from "./types";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");

    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const clearForm = () => {
    setTitle("");
    setContent("");
    setEditingId(null);
  };

  const addNote = () => {
    if (!title.trim() || !content.trim()) return;

    const newNote: Note = {
      id: Date.now(),
      title,
      content,
    };

    setNotes((prev) => [...prev, newNote]);

    clearForm();
  };

  const deleteNote = (id: number) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const editNote = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
  };

  const updateNote = () => {
    if (!title.trim() || !content.trim()) return;

    setNotes((prev) =>
      prev.map((note) =>
        note.id === editingId
          ? {
              ...note,
              title,
              content,
            }
          : note
      )
    );

    clearForm();
  };

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Notes Management
      </h1>

      <NoteForm
        title={title}
        content={content}
        setTitle={setTitle}
        setContent={setContent}
        onSubmit={editingId ? updateNote : addNote}
        editing={editingId !== null}
      />

      <NotesList
        notes={notes}
        onEdit={editNote}
        onDelete={deleteNote}
      />

    </div>
  );
}