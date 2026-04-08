"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeNote, setActiveNote] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("omirage-notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  const saveToLocal = (newNotes) => {
    localStorage.setItem("omirage-notes", JSON.stringify(newNotes));
    setNotes(newNotes);
  };

  const handleAddNote = () => {
    if (!title && !content) return;
    const newNote = {
      id: Date.now(),
      title: title || "Sin título",
      content: content,
      date: new Date().toLocaleDateString(),
      aiSummary: ""
    };
    const updated = [newNote, ...notes];
    saveToLocal(updated);
    setTitle("");
    setContent("");
  };

  const handleDelete = (id) => {
    const updated = notes.filter(n => n.id !== id);
    saveToLocal(updated);
  };

  const handleAIAction = async (note) => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({ content: note.content, action: "summarize" }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      const updated = notes.map(n => n.id === note.id ? { ...n, aiSummary: data.result } : n);
      saveToLocal(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Omirage Notes</h1>
        <p style={{ opacity: 0.7 }}>Tu sistema personal de notas con inteligencia artificial.</p>
      </header>

      <section className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <input 
          className="input-field" 
          placeholder="Título de la nota..." 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: '1rem', fontSize: '1.2rem' }}
        />
        <textarea 
          className="input-field" 
          placeholder="Cuerpo de la nota..." 
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ marginBottom: '1rem', resize: 'none' }}
        />
        <button className="btn-primary" onClick={handleAddNote}>
          Guardar Nota
        </button>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {notes.map(note => (
          <div key={note.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <h3>{note.title}</h3>
              <small style={{ opacity: 0.5 }}>{note.date}</small>
            </div>
            <p style={{ whiteSpace: 'pre-wrap' }}>{note.content}</p>
            
            {note.aiSummary && (
              <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
                <strong style={{ display: 'block', fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>RESUMEN IA</strong>
                <p style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>{note.aiSummary}</p>
              </div>
            )}

            <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
              <button 
                className="btn-primary" 
                style={{ padding: '0.5rem 1rem', background: 'var(--accent)' }}
                onClick={() => handleAIAction(note)}
                disabled={isProcessing}
              >
                {isProcessing ? 'Procesando...' : 'Resumir con IA'}
              </button>
              <button 
                style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer' }}
                onClick={() => handleDelete(note.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
