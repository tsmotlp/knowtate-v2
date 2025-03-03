"use client"

import { useState } from "react"
import { PaperNote } from "./paper-note"
import { PaperWithNotes } from "@/types/types"
import { NoteSidebar } from "./note-sidebar"

interface PaperNotesProps {
  paperWithNotes: PaperWithNotes
}

export const PaperNotes = ({
  paperWithNotes
}: PaperNotesProps) => {
  const [noteType, setNoteType] = useState("markdown")
  const handleClick = (key: string) => {
    setNoteType(key)
  }
  return (
    <div className="h-full w-full flex">
      <div className="flex flex-grow">
        {noteType === "markdown" && (
          <PaperNote note={paperWithNotes.notes[0]} />
        )}
        {noteType === "whiteboard" && (
          <PaperNote note={paperWithNotes.notes[1]} />
        )}
      </div>
      <div className="w-16 border-l">
        <NoteSidebar noteSidebarType={noteType} handleClick={handleClick} />
      </div>
    </div>
  )
}