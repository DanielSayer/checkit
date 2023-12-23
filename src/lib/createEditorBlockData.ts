import EditorJs, { OutputData } from '@editorjs/editorjs'

export const createEditorParagraphData = (text: string): OutputData => {
  const content: OutputData = {
    time: Date.now(),
    blocks: [
      {
        type: 'paragraph',
        data: {
          text: text,
        },
      },
    ],
    version: EditorJs.version,
  }

  return content
}
