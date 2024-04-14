"use client"

import { PaperWithNotes } from "@/types/types"
import { MenuBar } from "./menu-bar"
import { PDFViewer } from "./pdf-viewer"
import { useState } from "react"
import { PaperNotes } from "./paper-notes"
import { PaperInfo } from "./paper-info"
import { PaperChat } from "./paper-chat"

interface PaperReaderProps {
  paperWithNotes: PaperWithNotes | undefined | null
}

export const PaperReader = ({
  paperWithNotes
}: PaperReaderProps) => {
  const [papeType, setPageType] = useState("notes")
  const handleClick = (type: string) => {
    setPageType(type)
  }

  return (
    <div className="h-full w-full flex flex-col">
      {!paperWithNotes || !paperWithNotes.url || paperWithNotes.url === "" ? (
        <>
          <div className="h-12">
            <MenuBar paperTitle={"没有文献"} pageType={papeType} handleClick={handleClick} />
          </div>
          <div className="flex-grow flex items-center justify-center text-lg text-red-500">
            出错了~
          </div>
        </>
      ) : (
        <>
          <div className="h-12">
            <MenuBar paperTitle={paperWithNotes.title} pageType={papeType} handleClick={handleClick} />
          </div>
          <div className="flex-grow flex">
            <div className="flex h-full w-full">
              <div className="flex-grow">
                <PDFViewer paper={paperWithNotes} />
              </div>
              <div className="w-1/3 overflow-auto border-l">
                {papeType === "info" && (
                  <PaperInfo />
                )}
                {papeType === "notes" && (
                  <PaperNotes paperWithNotes={paperWithNotes} />
                )}
                {papeType === "chat" && (
                  <PaperChat />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}