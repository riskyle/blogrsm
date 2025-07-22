<script setup>
import {
  Bold,
  Code,
  Code2,
  CornerDownLeft,
  CornerDownLeftIcon,
  Ellipsis,
  Eraser,
  Heading1,
  Heading2,
  Heading3,
  ImageDown,
  Italic,
  Link,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  Redo2,
  Strikethrough,
  Type,
  Undo,
  Undo2,
  X,
} from "lucide-vue-next";
import { useEditor } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent as TiptapEditorContent } from "@tiptap/vue-3";
import Image from "@tiptap/extension-image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Image.configure({
      inline: true,
      allowBase64: true,
      HTMLAttributes: {
        class: "max-w-full h-auto rounded-lg shadow-sm",
      },
    }),
  ],
  onUpdate: ({ editor }) => {
    emit("update:modelValue", editor.getHTML());
  },
  editorProps: {
    attributes: {
      class: "focus:outline-none",
    },
  },
});

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please select an image file");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("Image size should be less than 5MB");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const src = e.target.result;
    if (editor.value) {
      editor.value.chain().focus().setImage({ src }).run();
    }
  };
  reader.readAsDataURL(file);

  event.target.value = "";
};

const addImageFromUrl = () => {
  const url = prompt("Enter image URL:");
  if (url && editor.value) {
    if (!isValidImageUrl(url)) {
      alert("Please enter a valid image URL");
      return;
    }
    editor.value.chain().focus().setImage({ src: url }).run();
  }
};

const isValidImageUrl = (url) => {
  const pattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;
  return pattern.test(url) || url.startsWith("data:image/");
};

onBeforeUnmount(() => {
  if (unref(editor)) {
    unref(editor).destroy();
  }
});
</script>

<template>
  <div
    class="border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden"
  >
    <div
      v-if="editor"
      class="border-b border-gray-200 dark:border-gray-800 overflow-x-auto"
    >
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center space-x-3">
          <!-- Text Formatting Group -->
          <div
            class="flex items-center border-r border-gray-200 dark:border-gray-800"
          >
            <button
              @click="editor.chain().focus().toggleBold().run()"
              :disabled="!editor.can().chain().focus().toggleBold().run()"
              :class="{
                'bg-blue-100 text-blue-700 shadow-sm': editor.isActive('bold'),
                'text-gray-600 hover:text-gray-800': !editor.isActive('bold'),
              }"
              class="p-2 m-1 rounded-lg transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              title="Bold"
            >
              <Bold size="16" />
            </button>

            <button
              @click="editor.chain().focus().toggleItalic().run()"
              :disabled="!editor.can().chain().focus().toggleItalic().run()"
              :class="{
                'bg-blue-100 text-blue-700 shadow-sm':
                  editor.isActive('italic'),
                'text-gray-600 hover:text-gray-800': !editor.isActive('italic'),
              }"
              class="p-2 m-1 rounded-lg transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              title="Italic"
            >
              <Italic size="16" />
            </button>

            <button
              @click="editor.chain().focus().toggleStrike().run()"
              :disabled="!editor.can().chain().focus().toggleStrike().run()"
              :class="{
                'bg-blue-100 text-blue-700 shadow-sm':
                  editor.isActive('strike'),
                'text-gray-600 hover:text-gray-800': !editor.isActive('strike'),
              }"
              class="p-2 m-1 rounded-lg transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              title="Strike"
            >
              <Strikethrough size="16" />
            </button>

            <button
              @click="editor.chain().focus().toggleCode().run()"
              :disabled="!editor.can().chain().focus().toggleCode().run()"
              :class="{
                'bg-blue-100 text-blue-700 shadow-sm': editor.isActive('code'),
                'text-gray-600 hover:text-gray-800': !editor.isActive('code'),
              }"
              class="p-2 m-1 rounded-lg transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              title="Code"
            >
              <Code size="16" />
            </button>
          </div>

          <!-- Block Elements Group -->
          <div
            class="flex items-center border-r border-gray-200 dark:border-gray-800 pr-3"
          >
            <button
              @click="editor.chain().focus().setParagraph().run()"
              :class="{
                'bg-blue-100 text-blue-700 shadow-sm':
                  editor.isActive('paragraph'),
                'text-gray-600 hover:text-gray-800':
                  !editor.isActive('paragraph'),
              }"
              class="p-2 m-1 rounded-lg transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              title="Paragraph"
            >
              <Type size="16" />
            </button>

            <button
              @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
              :class="{
                'bg-blue-100 text-blue-700 shadow-sm': editor.isActive(
                  'heading',
                  { level: 1 }
                ),
                'text-gray-600 hover:text-gray-800': !editor.isActive(
                  'heading',
                  { level: 1 }
                ),
              }"
              class="p-2 m-1 rounded-lg transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              title="Heading 1"
            >
              <Heading1 size="16" />
            </button>

            <button
              @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
              :class="{
                'bg-blue-100 text-blue-700 shadow-sm': editor.isActive(
                  'heading',
                  { level: 2 }
                ),
                'text-gray-600 hover:text-gray-800': !editor.isActive(
                  'heading',
                  { level: 2 }
                ),
              }"
              class="p-2 m-1 rounded-lg transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              title="Heading 2"
            >
              <Heading2 size="16" />
            </button>

            <button
              @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
              :class="{
                'bg-blue-100 text-blue-700 shadow-sm': editor.isActive(
                  'heading',
                  { level: 3 }
                ),
                'text-gray-600 hover:text-gray-800': !editor.isActive(
                  'heading',
                  { level: 3 }
                ),
              }"
              class="p-2 m-1 rounded-lg transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              title="Heading 3"
            >
              <Heading3 size="16" />
            </button>
          </div>

          <!-- Lists and Blocks Group -->
          <div
            class="flex items-center border-r border-gray-200 dark:border-gray-800 pr-3"
          >
            <button
              @click="editor.chain().focus().toggleBulletList().run()"
              :class="{
                'bg-blue-100 text-blue-700 shadow-sm':
                  editor.isActive('bulletList'),
                'text-gray-600 hover:text-gray-800':
                  !editor.isActive('bulletList'),
              }"
              class="p-2 m-1 rounded-lg transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              title="Bullet list"
            >
              <List size="16" />
            </button>

            <button
              @click="editor.chain().focus().toggleOrderedList().run()"
              :class="{
                'bg-blue-100 text-blue-700 shadow-sm':
                  editor.isActive('orderedList'),
                'text-gray-600 hover:text-gray-800':
                  !editor.isActive('orderedList'),
              }"
              class="p-2 m-1 rounded-lg transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              title="Ordered list"
            >
              <ListOrdered size="16" />
            </button>

            <button
              @click="editor.chain().focus().toggleCodeBlock().run()"
              :class="{
                'bg-blue-100 text-blue-700 shadow-sm':
                  editor.isActive('codeBlock'),
                'text-gray-600 hover:text-gray-800':
                  !editor.isActive('codeBlock'),
              }"
              class="p-2 m-1 rounded-lg transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              title="Code block"
            >
              <Code2 size="16" />
            </button>

            <button
              @click="editor.chain().focus().toggleBlockquote().run()"
              :class="{
                'bg-blue-100 text-blue-700 shadow-sm':
                  editor.isActive('blockquote'),
                'text-gray-600 hover:text-gray-800':
                  !editor.isActive('blockquote'),
              }"
              class="p-2 m-1 rounded-lg transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              title="Blockquote"
            >
              <Quote size="16" />
            </button>
          </div>

          <!-- Insert Elements Group -->
          <div class="flex items-center pr-0">
            <!-- Image Upload Button -->
            <div class="relative">
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button
                class="p-2 m-1 rounded-lg transition-all duration-200 hover:bg-gray-100 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                title="Insert image"
              >
                <ImageDown size="16" />
              </button>
            </div>

            <!-- Image URL Button -->
            <button
              @click="addImageFromUrl"
              class="p-2 m-1 rounded-lg transition-all duration-200 hover:bg-gray-100 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              title="Insert image from URL"
            >
              <Link size="16" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button
                  class="bg-transparent border-0 text-gray cursor-pointer"
                  variant="default"
                >
                  <Ellipsis size="16" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  @click="editor.chain().focus().toggleBlockquote().run()"
                  as-child
                  class="min-[969px]:hidden"
                >
                  <Quote size="16" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>

    <!-- Editor Content Area -->
    <div class="bg-white dark:bg-inherit">
      <TiptapEditorContent
        :editor="editor"
        class="min-h-46 max-h-126 overflow-auto p-6 prose prose-sm max-w-2xl focus:outline-none"
      />
    </div>
  </div>
</template>

<style scoped>
@import "tailwindcss";

:deep(.ProseMirror) {
  outline: none;
}

:deep(.ProseMirror h1) {
  @apply text-3xl font-bold mt-6 mb-4;
}

:deep(.ProseMirror h2) {
  @apply text-2xl font-bold mt-5 mb-3;
}

:deep(.ProseMirror h3) {
  @apply text-xl font-bold mt-4 mb-2;
}

:deep(.ProseMirror h4) {
  @apply text-lg font-bold mt-3 mb-2;
}

:deep(.ProseMirror h5) {
  @apply text-base font-bold mt-2 mb-1;
}

:deep(.ProseMirror h6) {
  @apply text-sm font-bold mt-2 mb-1;
}

:deep(.ProseMirror p) {
  @apply mb-4;
}

:deep(.ProseMirror ul) {
  @apply list-disc pl-6 mb-4;
}

:deep(.ProseMirror ol) {
  @apply list-decimal pl-6 mb-4;
}

:deep(.ProseMirror blockquote) {
  @apply border-l-4 border-gray-300 pl-4 italic my-4;
}

:deep(.ProseMirror pre) {
  @apply bg-gray-800 rounded-lg p-4 overflow-x-auto my-4;
}

:deep(.ProseMirror code) {
  @apply bg-gray-800 text-white px-2 py-1 rounded text-sm;
}

:deep(.ProseMirror hr) {
  @apply border-t border-gray-300 my-6;
}

:deep(.ProseMirror strong) {
  @apply font-bold;
}

:deep(.ProseMirror em) {
  @apply italic;
}

:deep(.ProseMirror img) {
  @apply max-w-full h-auto rounded-lg shadow-sm my-4 cursor-pointer transition-all duration-200;
}

:deep(.ProseMirror img:hover) {
  @apply shadow-md transform scale-105;
}

:deep(.ProseMirror img.ProseMirror-selectednode) {
  @apply ring-2 ring-blue-500;
}
</style>
