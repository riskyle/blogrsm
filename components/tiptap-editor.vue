<template>
  <div class="tiptap-editor">
    <div class="toolbar" v-if="editor">
      <div class="toolbar-group">
        <button
          type="button"
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
          class="toolbar-button"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
          class="toolbar-button"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
          class="toolbar-button"
        >
          <s>S</s>
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor.isActive('code') }"
          class="toolbar-button"
        >
          Code
        </button>
      </div>

      <div class="toolbar-group">
        <button
          type="button"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          class="toolbar-button"
        >
          H1
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          class="toolbar-button"
        >
          H2
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
          class="toolbar-button"
        >
          H3
        </button>
        <button
          type="button"
          @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }"
          class="toolbar-button"
        >
          P
        </button>
      </div>

      <div class="toolbar-group">
        <button
          type="button"
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
          class="toolbar-button"
        >
          • List
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
          class="toolbar-button"
        >
          1. List
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }"
          class="toolbar-button"
        >
          Quote
        </button>
      </div>

      <div class="toolbar-group">
        <button
          type="button"
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'is-active': editor.isActive('codeBlock') }"
          class="toolbar-button"
        >
          Code Block
        </button>
        <button
          type="button"
          @click="editor.chain().focus().setHorizontalRule().run()"
          class="toolbar-button"
        >
          HR
        </button>
        <button
          type="button"
          @click="editor.chain().focus().setHardBreak().run()"
          class="toolbar-button"
        >
          Break
        </button>
      </div>

      <div class="toolbar-group">
        <button
          type="button"
          @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().chain().focus().undo().run()"
          class="toolbar-button"
        >
          Undo
        </button>
        <button
          type="button"
          @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().chain().focus().redo().run()"
          class="toolbar-button"
        >
          Redo
        </button>
      </div>

      <div class="toolbar-group">
        <button
          @click="
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          "
          class="toolbar-button"
        >
          Table
        </button>
        <button
          @click="editor.chain().focus().addColumnBefore().run()"
          :disabled="!editor.can().addColumnBefore()"
          class="toolbar-button"
        >
          + Col
        </button>
        <button
          @click="editor.chain().focus().deleteColumn().run()"
          :disabled="!editor.can().deleteColumn()"
          class="toolbar-button"
        >
          - Col
        </button>
        <button
          @click="editor.chain().focus().addRowBefore().run()"
          :disabled="!editor.can().addRowBefore()"
          class="toolbar-button"
        >
          + Row
        </button>
        <button
          @click="editor.chain().focus().deleteRow().run()"
          :disabled="!editor.can().deleteRow()"
          class="toolbar-button"
        >
          - Row
        </button>
        <button
          @click="editor.chain().focus().deleteTable().run()"
          :disabled="!editor.can().deleteTable()"
          class="toolbar-button"
        >
          Delete Table
        </button>
      </div>
    </div>

    <div class="editor-content">
      <EditorContent :editor="editor" />
    </div>

    <div class="output" v-if="showOutput">
      <h3>HTML Output:</h3>
      <pre><code>{{ editor ? editor.getHTML() : '' }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { onBeforeUnmount } from "vue";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  showOutput: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
  ],
  onUpdate: ({ editor }) => {
    emit("update:modelValue", editor.getHTML());
  },
});

watch(
  () => props.modelValue,
  (newContent) => {
    editor.value.commands.setContent(newContent);
  }
);

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});
</script>

<style scoped>
.tiptap-editor {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  overflow: hidden;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.toolbar-group {
  display: flex;
  gap: 4px;
}

.toolbar-button {
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.toolbar-button:hover {
  background: #f3f4f6;
}

.toolbar-button.is-active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.toolbar-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.editor-content {
  padding: 16px;
  min-height: 200px;
  max-height: 500px;
  overflow: auto;
}

.output {
  padding: 16px;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
}

.output pre {
  background: #1f2937;
  color: #f9fafb;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
}

/* TipTap Editor Styles */
:deep(.ProseMirror) {
  outline: none;
  line-height: 1.6;
}

:deep(.ProseMirror h1) {
  font-size: 2em;
  font-weight: bold;
  margin: 0.67em 0;
}

:deep(.ProseMirror h2) {
  font-size: 1.5em;
  font-weight: bold;
  margin: 0.83em 0;
}

:deep(.ProseMirror h3) {
  font-size: 1.17em;
  font-weight: bold;
  margin: 1em 0;
}

:deep(.ProseMirror p) {
  margin: 1em 0;
}

:deep(.ProseMirror ul, .ProseMirror ol) {
  margin: 1em 0;
  padding-left: 2em;
}

:deep(.ProseMirror blockquote) {
  border-left: 4px solid #e2e8f0;
  margin: 1em 0;
  padding-left: 1em;
  font-style: italic;
}

:deep(.ProseMirror code) {
  background: #f1f5f9;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: "Courier New", monospace;
}

:deep(.ProseMirror pre) {
  background: #1f2937;
  color: #f9fafb;
  padding: 1em;
  border-radius: 4px;
  overflow-x: auto;
  margin: 1em 0;
}

:deep(.ProseMirror pre code) {
  background: none;
  color: inherit;
  padding: 0;
}

:deep(.ProseMirror hr) {
  border: none;
  border-top: 2px solid #e2e8f0;
  margin: 2em 0;
}
</style>
