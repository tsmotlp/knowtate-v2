"use client"

import { IconPicker } from "@/components/editors/icon-picker";
import { Button } from "@/components/ui/button"
import { Note, Paper } from "@prisma/client";
import axios from "axios";
import { ArrowUpRight, Download, FileSymlinkIcon, Library, Save, Smile } from "lucide-react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { BsFilePdf, BsFiletypePdf } from "react-icons/bs";
import TextareaAutosize from "react-textarea-autosize";

interface NoteNavbarProps {
  paper?: Paper,
  note: Note,
  handleSave: () => void
  handleDownload: (title: string) => void
  showDashboardIcon?: boolean
}

export const NoteNavbar = ({
  paper,
  note,
  handleSave,
  handleDownload,
  showDashboardIcon = true,
}: NoteNavbarProps) => {
  const router = useRouter()
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [icon, setIcon] = useState(note.icon);

  const enableInput = () => {
    setIsEditing(true);
    setTimeout(() => {
      setTitle(note.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onInput = async (value: string) => {
    setTitle(value);
    try {
      await axios.patch(`/api/note/${note.id}`, JSON.stringify({
        title: value || "Untitled"
      }));
    } catch (error) {
      console.error("Failed to update note title:", error);
    }
  };

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = async (icon: string) => {
    try {
      await axios.patch(`/api/note/${note.id}`, JSON.stringify({
        icon: icon
      }));
      setIcon(icon)
    } catch (error) {
      console.error("Failed to update note icon:", error);
    }
  }

  return (
    <div className="h-full flex items-center justify-between px-2 border-b">
      <div className="w-full flex items-center gap-x-1">
        {showDashboardIcon && (
          <Button
            variant="ghost"
            size="compact"
            onClick={() => router.push("/dashboard/library")}
          >
            <Library className="h-5 w-5 text-muted-foreground" />
          </Button>
        )}
        {!!icon && (
          <IconPicker onChange={onIconSelect}>
            <p className="hover:opacity-75 transition">
              {icon}
            </p>
          </IconPicker>
        )}
        {!icon && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-muted-foreground text-xs"
              variant="ghost"
              size="sm"
            >
              <Smile className="h-4 w-4 mr-2" />
            </Button>
          </IconPicker>
        )}
        {isEditing ? (
          <TextareaAutosize
            ref={inputRef}
            onBlur={disableInput}
            onKeyDown={onKeyDown}
            value={title!}
            onChange={(e) => onInput(e.target.value)}
            className="bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
          />
        ) : (
          <div
            onClick={enableInput}
            className="font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
          >
            {title}
          </div>
        )}
      </div>
      <div className="h-full flex items-center justify-center text-muted-foreground">
        {paper && paper.id && (
          <div className="flex items-center justify-center">
            <div className="text-muted-foreground">
              所属论文:
            </div>
            <Link href={`/papers/${paper.id}`}>
              <div className="flex items-center gap-x-1 text-sm text-muted-foreground underline">
                <FileSymlinkIcon className="h-4 w-4 text-red-400" />
                {paper.title}
              </div>
            </Link>
          </div>
        )}
        <Button
          variant="ghost"
          size="compact"
          onClick={handleSave}
        >
          <Save className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="compact"
          onClick={() => { handleDownload(title!) }}
        >
          <Download className="h-4 w-4 " />
        </Button>
      </div>
    </div>
  )
}