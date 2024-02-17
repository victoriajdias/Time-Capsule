'use client'

import { MediaPicker } from "@/src/components/MediaPicker";
import { api } from "@/src/lib/api";
import { Camera, ChevronLeft } from "lucide-react";
import Link from "next/link";


export default function NewMemory() {
  async function handleCreateMemory(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement)
    
    const fileToUpload = formData.get('coverUrl')

    let coverUrl = ''

    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)

      const uploadResponse = await api.post('/upload', uploadFormData)

      coverUrl = uploadResponse.data.fileUrl
    }

    await api.post('./memories', {
      coverUrl,
      content: formData.get('content'),
      isPublic: formData.get('isPublic'),
    })
 
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar à timeline
      </Link>

      <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-4">
          <Camera className="h-4 w-4" />
          <label
            htmlFor="media"
            className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          >
            Anexar mídia
          </label>
          <label htmlFor="isPublic" className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100">
            <input type="checkbox" name="isPublic" id="isPublic" value="true"className="h-4 w-4 rounded border-gray-400 bg-gray-700"/>
            Tornar memória publica
          </label>
        </div>
        <MediaPicker />
        <textarea name="content" spellCheck={false} className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0" placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre"></textarea>
        <button type="submit" className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600">Salvar</button>
      </form>
    </div>
  );
}
