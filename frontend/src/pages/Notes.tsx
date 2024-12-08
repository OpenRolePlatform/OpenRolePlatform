import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  Button,
  codeBlockPlugin,
  codeMirrorPlugin,
  CodeToggle,
  CreateLink,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  InsertCodeBlock,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  MDXEditorMethods,
  quotePlugin,
  Separator,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { FloppyDisk } from '@phosphor-icons/react';
import { Flex } from 'antd';
import { useRef, useState } from 'react';
import { updateNotes } from '../services/NotesServices';

export default function Notes() {
  const ref = useRef<MDXEditorMethods>(null);
  const [text, setText] = useState('# Hello world');

  async function imageUploadHandler(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    // send the file to your server and return
    // the URL of the uploaded image in the response
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const json = (await response.json()) as { url: string };
    return json.url;
  }

  async function saveNote() {
    console.log('pre');
    console.log(text);
    await updateNotes('Master', text);
    console.log('post');
  }

  return (
    <>
      <MDXEditor
        ref={ref}
        markdown={text}
        onChange={(newText) => setText(newText)}
        plugins={[
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <Flex justify="space-between" style={{ width: '100%' }}>
                  <Flex>
                    <UndoRedo />
                    <Separator />
                    <BoldItalicUnderlineToggles />
                    <CodeToggle />
                    <BlockTypeSelect />
                    <Separator />
                    <ListsToggle />
                    <InsertThematicBreak />
                    <Separator />
                    <CreateLink />
                    <InsertImage />
                    <InsertTable />
                    <Separator />
                    <InsertCodeBlock />
                  </Flex>

                  <Button color="blue" onClick={saveNote}>
                    <FloppyDisk size={24} />
                  </Button>
                </Flex>
              </>
            ),
          }),
          listsPlugin(),
          quotePlugin(),
          headingsPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          imagePlugin({
            imageUploadHandler,
            imagePreviewHandler: async (url) => {
              return `http://localhost:3001/${url}`;
            },
          }),
          tablePlugin(),
          thematicBreakPlugin(),
          frontmatterPlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              js: 'JavaScript',
              css: 'CSS',
              txt: 'text',
              tsx: 'TypeScript',
            },
          }),
          markdownShortcutPlugin(),
        ]}
      />
    </>
  );
}
