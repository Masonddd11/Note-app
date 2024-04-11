"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase/config"; // adjust this import to match your Firebase setup
import NoteCard from "./components/NoteCard";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editNote, setEditNote] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/sign-in");
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    let unsubscribe = null;

    if (user) {
      const q = query(collection(db, "notes"), where("userId", "==", user.uid));

      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newNotes = [];
        querySnapshot.forEach((doc) => {
          newNotes.push({ id: doc.id, ...doc.data() });
        });
        setNotes(newNotes);
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setContent("");
    setEditNote(null);
  };

  const addNote = async () => {
    await addDoc(collection(db, "notes"), {
      title: title,
      content: content,
      userId: user.uid,
    });
    handleClose();
  };

  const deleteNote = async (note) => {
    const noteRef = doc(db, "notes", note.id);
    await deleteDoc(noteRef);
  };

  const startEdit = (note) => {
    setEditNote(note);
    setTitle(note.title);
    setContent(note.content);
    handleOpen();
  };

  const saveEdit = async () => {
    const noteRef = doc(db, "notes", editNote.id);
    await updateDoc(noteRef, { title: title, content: content });
    handleClose();
  };

  return (
    <div>
      <h1 className="ml-[3px]">Welcome back, {user?.email}</h1>
      <Button onClick={handleOpen}>Add Note</Button>
      <Button onClick={() => signOut(auth)}>Logout</Button>
      {notes.map((note, index) => (
        <NoteCard
          key={index}
          note={note}
          onDelete={deleteNote}
          onEdit={startEdit}
        />
      ))}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: '10px'
          }}
        >
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button onClick={editNote ? saveEdit : addNote}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}
