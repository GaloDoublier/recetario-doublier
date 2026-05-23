"use client";

import { useState, useRef } from "react";
import { Receta } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { StarRating } from "./star-rating";
import { CldUploadWidget } from "next-cloudinary";
import {
  ArrowLeft,
  Bold,
  Italic,
  List,
  Eye,
  Edit3,
  Save,
  Loader2,
  AlertCircle,
  ImagePlus,
  Trash2,
  ImageIcon
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { newRecipeHolder } from "@/src/app/constants/newRecipeHolder";

interface RecipeEditorProps {
  recipe?: Receta | null;
}

export function RecipeEditor({ recipe }: RecipeEditorProps) {
  const router = useRouter();
  const isEditing = !!recipe;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [title, setTitle] = useState(recipe?.title || "");
  const [description, setDescription] = useState(recipe?.description || "");
  const [difficulty, setDifficulty] = useState(recipe?.difficulty || "Media");
  const [totalTime, setTotalTime] = useState(recipe?.totalTime ?? 30);
  const [ricor, setRicor] = useState(recipe?.ricor || 3);
  const [imagenUrl, setImagenUrl] = useState(recipe?.imagen_url || "");
  const [contenido, setContenido] = useState(recipe?.contenido_markdown || newRecipeHolder);

  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const insertFormatting = (type: "bold" | "italic" | "list") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = contenido.substring(start, end);

    let replacement = "";
    switch (type) {
      case "bold":
        replacement = `**${selected || "texto en negrita"}**`;
        break;
      case "italic":
        replacement = `*${selected || "texto en cursiva"}*`;
        break;
      case "list":
        replacement = selected
          ? selected.split("\n").map((l) => `- ${l}`).join("\n")
          : "- Elemento";
        break;
    }

    const next = contenido.substring(0, start) + replacement + contenido.substring(end);
    setContenido(next);

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + replacement.length, start + replacement.length);
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      const body = {
        title,
        description,
        difficulty,
        totalTime: Number(totalTime),
        ricor: Number(ricor),
        imagen_url: imagenUrl || null,
        contenido_markdown: contenido,
      };

      let res: Response;

      if (isEditing && recipe?.id) {
        res = await fetch(`/api/recetas/${recipe.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch("/api/recetas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al guardar");
      }

      router.push("/admin/panel");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar la receta");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" asChild className="gap-2">
            <Link href="/admin/panel">
              <ArrowLeft className="w-4 h-4" />
              Volver al panel
            </Link>
          </Button>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 p-4 text-sm text-red-800 bg-red-50 dark:text-red-200 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-muted/30">
            <h1 className="text-xl font-semibold text-foreground">
              {isEditing ? "Editar Receta" : "Nueva Receta"}
            </h1>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium text-foreground">
                  Título de la Receta
                </label>
                <Input
                  id="title"
                  placeholder="Ej: Tortilla Española Clásica"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="difficulty" className="text-sm font-medium text-foreground">
                  Dificultad
                </label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="Baja">Baja</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-foreground">
                Descripción breve
              </label>
              <Input
                id="description"
                placeholder="Una breve descripción de tu receta..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="totalTime" className="text-sm font-medium text-foreground">
                  Tiempo total (minutos)
                </label>
                <Input
                  id="totalTime"
                  type="number"
                  min={1}
                  placeholder="30"
                  value={totalTime}
                  onChange={(e) => setTotalTime(Number(e.target.value))}
                />
              </div>

              {/* CLOUDINARY */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Imagen de la receta
                </label>
                
                <CldUploadWidget 
                  uploadPreset="recetario_fotos" 
                  onSuccess={(result: any) => {
                    if (result.info?.secure_url) {
                      setImagenUrl(result.info.secure_url);
                    }
                  }}
                >
                  {({ open }) => (
                    <div className="flex flex-col gap-3">
                      {imagenUrl ? (
                        <div className="relative w-full h-32 rounded-md overflow-hidden border border-border group">
                          <img 
                            src={imagenUrl} 
                            alt="Vista previa" 
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button 
                              type="button" 
                              variant="secondary" 
                              size="sm" 
                              onClick={() => open()}
                            >
                              Cambiar
                            </Button>
                            <Button 
                              type="button" 
                              variant="destructive" 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                setImagenUrl("");
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="h-32 w-full border-dashed flex flex-col gap-2 hover:bg-muted/50"
                          onClick={() => open()}
                        >
                          <ImagePlus className="w-6 h-6 text-muted-foreground" />
                          <span className="text-muted-foreground">Subir foto (Click acá)</span>
                        </Button>
                      )}
                    </div>
                  )}
                </CldUploadWidget>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Puntuación de Ricor (1-5 estrellas)
              </label>
              <StarRating
                rating={ricor}
                size="lg"
                interactive
                onChange={setRicor}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">
                  Contenido Markdown (Ingredientes y Preparación)
                </label>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant={!isPreview ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setIsPreview(false)}
                    className="gap-1.5 text-xs"
                  >
                    <Edit3 className="w-3 h-3" />
                    Editar
                  </Button>
                  <Button
                    type="button"
                    variant={isPreview ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setIsPreview(true)}
                    className="gap-1.5 text-xs"
                  >
                    <Eye className="w-3 h-3" />
                    Visualizar
                  </Button>
                </div>
              </div>

              {!isPreview && (
                <div className="flex items-center gap-1 p-2 bg-muted/50 rounded-t-lg border border-b-0 border-border">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => insertFormatting("bold")}
                    title="Negrita"
                  >
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => insertFormatting("italic")}
                    title="Cursiva"
                  >
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => insertFormatting("list")}
                    title="Lista"
                  >
                    <List className="w-4 h-4" />
                  </Button>

                  {/* Imagen en markdown */}
                  <div className="w-px h-4 bg-border mx-1" />
                  <CldUploadWidget 
                    uploadPreset="recetario_fotos"
                    onSuccess={(result: any) => {
                      if (result.info?.secure_url) {
                        const url = result.info.secure_url;
                        setContenido((prev) => 
                          prev.replace("![Cargando imagen...]()", `![Imagen de la receta](${url})`)
                        );
                      }
                    }}
                    onClose={() => {
                      setContenido((prev) => 
                        prev.replace("![Cargando imagen...]()", "")
                      );
                    }}
                  >
                    {({ open }) => (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          const textarea = textareaRef.current;
                          if (textarea) {
                            // Capturamos dónde está el cursor
                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const currentContent = contenido;
                            
                            // Inyectamos el texto de carga justo ahí
                            const placeholder = "![Cargando imagen...]()";
                            const next = currentContent.substring(0, start) + placeholder + currentContent.substring(end);
                            setContenido(next);
                          }
                          // Abrimos el subidor de Cloudinary
                          open();
                        }}
                        title="Insertar imagen en el texto"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </Button>
                    )}
                  </CldUploadWidget>
                </div>
              )}

              {isPreview ? (
                <div className="min-h-[300px] p-4 bg-muted/20 rounded-lg border border-border prose prose-stone dark:prose-invert max-w-none prose-headings:text-foreground prose-a:text-primary prose-li:text-muted-foreground prose-p:text-muted-foreground prose-strong:text-foreground">
                  {contenido ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {contenido}
                    </ReactMarkdown>
                  ) : (
                    <p className="text-muted-foreground italic">
                      Sin contenido — escribe algo en Markdown para ver la vista previa.
                    </p>
                  )}
                </div>
              ) : (
                <textarea
                  ref={textareaRef}
                  id="content-editor"
                  value={contenido}
                  onChange={(e) => setContenido(e.target.value)}
                  placeholder="Escribe tu receta en Markdown..."
                  className="w-full min-h-[300px] p-4 rounded-b-lg border border-border bg-background text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-mono"
                />
              )}

              <p className="text-xs text-muted-foreground">
                Usa Markdown para dar formato: **negrita**, *cursiva*, - para listas
              </p>
              <div className="flex justify-end mt-4">
                <Button
                  disabled={isSaving}
                  onClick={handleSave}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      {isEditing ? "Actualizar Receta" : "Guardar Receta"}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}