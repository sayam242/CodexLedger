import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import type { NoteResponse } from "../types/notes.types";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
} from "lucide-react";

import { useNotes } from "../hooks/useNotes";
import { useEffect } from "react";

interface NotesEditorProps {
  problemId: string;
  initialNote: NoteResponse;
}

const STATUS_LABEL: Record<string, string> = {
  saving: "Saving...",
  saved: "\u2713 Saved",
  unsynced: "Unsynced changes",
};

function ToolbarButton({
  onClick,
  active,
  children,
}: {
  onClick: () => void;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-1.5 rounded transition-colors ${
        active
          ? "bg-blue-100 text-blue-700"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}

export default function NotesEditor({ problemId, initialNote }: NotesEditorProps) {
  const { content, status, handleChange } = useNotes(problemId,initialNote);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder:
          "Write your understanding, intuition, mistakes, edge cases and revision notes...",
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "ProseMirror prose prose-sm max-w-none focus:outline-none min-h-full px-4 py-3",
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editor) return;

    if (editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);
  if (!editor) return null;


  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-1 px-3 border-b border-gray-200 bg-white rounded-t-lg flex-wrap">
        <ToolbarButton
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          active={editor.isActive("heading", { level: 1 })}
        >
          <Heading1 size={18} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
        >
          <Heading2 size={18} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
        >
          <Heading3 size={18} />
        </ToolbarButton>

        <span className="w-px h-5 bg-gray-200 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          <Bold size={18} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          <Italic size={18} />
        </ToolbarButton>

        <span className="w-px h-5 bg-gray-200 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          <List size={18} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        >
          <ListOrdered size={18} />
        </ToolbarButton>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto  bg-white">
        <EditorContent editor={editor} className="h-full" />
      </div>

      <div className="flex items-center justify-between px-3  text-xs text-gray-500 border-t-1">
        <span>
          {status !== "idle" ? STATUS_LABEL[status] ?? "" : ""}
        </span>
      </div>
    </div>
  );
}
