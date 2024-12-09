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
import { useRef } from 'react';
import { useGetSetState, useMount } from 'react-use';
import { usePlayer } from '../components/PlayerContext';
import { Note } from '../models/NotesModels';
import { getNotes, updateNotes } from '../services/NotesServices';

export default function Notes() {
  const ref = useRef<MDXEditorMethods>(null);

  const [text, setText] = useGetSetState<Note>({text:""});
  const playerContext = usePlayer();

  async function getSavedNotes  () {
    try {
      let data = await getNotes(playerContext.player?._id ?? playerContext.role);
      setText(data);
      console.log("setted notes");

    } catch (error) {
      console.log(error);
    }
  }

  useMount( () =>{
    if (playerContext.player?._id || playerContext.role === "dm") {
     getSavedNotes()
    }
  })

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
    console.log(text());
    await updateNotes(playerContext.player?._id || playerContext.role, text() );
  }

  return (
    <>

      {text !== undefined && <MDXEditor
        ref={ref}
        markdown={text().text}
        onChange={(newText) => {
        setText({text:newText})}}
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

                  <Button color="blue" onClick={()=> saveNote()}>
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
      />}
    </>
  );
}
