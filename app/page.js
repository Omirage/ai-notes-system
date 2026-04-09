"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [noteName, setNoteName] = useState("");
  const [detail, setDetail] = useState("");
  const [deadline, setDeadline] = useState("");
  const [importance, setImportance] = useState("Medio");
  const [tags, setTags] = useState(["Trabajo", "Idea"]);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSave = () => {
    console.log("Saving note:", { noteName, detail, deadline, importance, tags });
    // Aquí integraremos el guardado real y el sonido
  };

  return (
    <div className="bg-surface font-body text-on-background min-h-screen pb-32">
      {/* TopAppBar */}
      <header className="bg-[#f9f9fc] shadow-[4px_4px_10px_#d3dbe4,-4px_-4px_10px_#ffffff] flex justify-between items-center px-6 py-4 w-full sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button className="text-[#4f4ccd] hover:bg-[#f0f0f3] transition-colors p-2 rounded-xl active:shadow-[inset_4px_4px_10px_#d3dbe4,inset_-4px_-4px_10px_#ffffff]">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="font-manrope headline-sm tracking-tight text-xl font-bold text-[#4f4ccd]">Nueva Nota</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-[#596067] hover:bg-[#f0f0f3] p-2 rounded-xl active:shadow-[inset_2px_2px_5px_#d3dbe4,inset_-2px_-2px_5px_#ffffff]">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="text-[#596067] hover:bg-[#f0f0f3] p-2 rounded-xl active:shadow-[inset_2px_2px_5px_#d3dbe4,inset_-2px_-2px_5px_#ffffff]">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 py-8 space-y-8">
        <section className="space-y-6">
          {/* Note Name */}
          <div className="space-y-2">
            <label className="text-on-surface-variant text-sm font-semibold px-2 uppercase tracking-wider">Nombre de la Nota</label>
            <div className="inset-shadow bg-surface rounded-xl p-1">
              <input 
                className="w-full bg-transparent border-none focus:ring-0 px-4 py-3 text-on-surface placeholder:text-outline-variant" 
                placeholder="Escribe el título..." 
                type="text"
                value={noteName}
                onChange={(e) => setNoteName(e.target.value)}
              />
            </div>
          </div>

          {/* Detail */}
          <div className="space-y-2">
            <label className="text-on-surface-variant text-sm font-semibold px-2 uppercase tracking-wider">Detalle</label>
            <div className="inset-shadow bg-surface rounded-xl p-1">
              <textarea 
                className="w-full bg-transparent border-none focus:ring-0 px-4 py-3 text-on-surface placeholder:text-outline-variant resize-none" 
                placeholder="¿En qué estás pensando?" 
                rows="4"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Deadline */}
            <div className="space-y-2">
              <label className="text-on-surface-variant text-sm font-semibold px-2 uppercase tracking-wider">Fecha Límite</label>
              <div className="inset-shadow bg-surface rounded-xl p-1 flex items-center pr-3">
                <input 
                  className="w-full bg-transparent border-none focus:ring-0 px-4 py-3 text-on-surface" 
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
                <span className="material-symbols-outlined text-outline">calendar_today</span>
              </div>
            </div>

            {/* Importance */}
            <div className="space-y-2">
              <label className="text-on-surface-variant text-sm font-semibold px-2 uppercase tracking-wider">Nivel de Importancia</label>
              <div className="bg-surface-container-low rounded-xl p-1 flex justify-between gap-1 h-12">
                {["Bajo", "Medio", "Alto"].map((level) => (
                  <button 
                    key={level}
                    onClick={() => setImportance(level)}
                    className={`flex-1 rounded-lg text-xs font-bold transition-all ${
                      importance === level 
                        ? "bg-surface-container-lowest text-primary shadow-sm extruded-shadow-sm" 
                        : "text-on-surface-variant hover:bg-surface-container-high"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-on-surface-variant text-sm font-semibold px-2 uppercase tracking-wider">Etiquetas</label>
            <div className="inset-shadow bg-surface rounded-xl p-1 flex flex-wrap gap-2 px-3 py-2">
              {tags.map(tag => (
                <div key={tag} className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 extruded-shadow-sm">
                  <span>{tag}</span>
                  <span className="material-symbols-outlined text-[14px] cursor-pointer" onClick={() => removeTag(tag)}>close</span>
                </div>
              ))}
              <input 
                className="bg-transparent border-none focus:ring-0 text-xs py-1 w-20" 
                placeholder="Añadir..." 
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
              />
            </div>
          </div>

          {/* AI Assistant Section */}
          <div className="pt-4">
            <div className="bg-surface-container-lowest rounded-2xl p-5 extruded-shadow flex items-start gap-4 border border-white/50">
              <div className="bg-primary-container p-3 rounded-xl shadow-inner">
                <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-on-surface text-sm">IA Assistant</h3>
                <p className="text-on-surface-variant text-xs leading-relaxed">¿Deseas que analice tu nota para generar un resumen automático y tareas pendientes?</p>
                <button className="text-primary text-xs font-bold mt-2 flex items-center gap-1 hover:underline">
                  Optimizar con IA <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-6 pb-12">
            <button 
              onClick={handleSave}
              className="w-full py-4 bg-gradient-to-br from-primary to-primary-dim text-on-primary font-bold rounded-2xl extruded-shadow hover:scale-[1.01] active:scale-[0.98] transition-all flex justify-center items-center gap-2"
            >
              <span className="material-symbols-outlined">save</span>
              Guardar Nota
            </button>
          </div>
        </section>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-[#f9f9fc] shadow-[0_-10px_20px_rgba(211,219,228,0.4)] rounded-t-[1.5rem]">
        <div className="flex flex-col items-center justify-center text-[#4f4ccd] shadow-[inset_2px_2px_5px_#d3dbe4,inset_-2px_-2px_5px_#ffffff] rounded-xl px-4 py-2">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
          <span className="font-manrope text-[11px] font-medium uppercase tracking-wider mt-1">Notes</span>
        </div>
        <div className="flex flex-col items-center justify-center text-[#596067] px-4 py-2 hover:text-[#4f4ccd] transition-all cursor-pointer">
          <span className="material-symbols-outlined">search</span>
          <span className="font-manrope text-[11px] font-medium uppercase tracking-wider mt-1">Search</span>
        </div>
        <div className="flex flex-col items-center justify-center text-[#596067] px-4 py-2 hover:text-[#4f4ccd] transition-all cursor-pointer">
          <span className="material-symbols-outlined">auto_awesome</span>
          <span className="font-manrope text-[11px] font-medium uppercase tracking-wider mt-1">AI Assistant</span>
        </div>
        <div className="flex flex-col items-center justify-center text-[#596067] px-4 py-2 hover:text-[#4f4ccd] transition-all cursor-pointer">
          <span className="material-symbols-outlined">person</span>
          <span className="font-manrope text-[11px] font-medium uppercase tracking-wider mt-1">Profile</span>
        </div>
      </nav>

      {/* Floating AI Bubble / Avatar Companion */}
      <div className="fixed bottom-24 right-6 group z-50">
        <div className="avatar-glass w-20 h-20 rounded-full flex items-center justify-center relative group-hover:scale-110 transition-all cursor-pointer">
          <Image 
            src="/omirage_avatar.png" 
            alt="AI Companion" 
            width={80} 
            height={80} 
            className="animate-pulse"
          />
          <div className="absolute -top-12 -left-32 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs font-bold text-primary">
            ¡Hola! Estoy listo para ayudarte ✨
          </div>
        </div>
      </div>
    </div>
  );
}
