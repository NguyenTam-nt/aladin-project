import React, { memo } from 'react'
//@ts-ignore
import {CKEditor} from '@ckeditor/ckeditor5-react'
//@ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { uploadService } from '@services/uploadService'

type Props = {
  content: string
  onChange?: (content: string) => void
  onBlur?: (content: string) => void

}

const Editor = memo(({content, onChange, onBlur}: Props) => {

  
  return (
    <CKEditor
      editor={ClassicEditor}
      data={content}
      onReady={(editor: any) => {
        MyCustomUploadAdapterPlugin(editor)
      }}
      onChange={(_: any, editor: any) => {
        const data = editor.getData()
  
        onChange?.(data)
      }}
      onBlur={(_: any, editor: any) => {
        const data = editor.getData()
        onBlur?.(data)
      }}
      onFocus={() => {}}
    
    />
  )
})

class MyUploadAdapter {
  public loader
  constructor(loader: any) {
    this.loader = loader
  }

  upload() {
    return this.loader.file.then(async (file: any) => {
      const formData = new FormData()
      formData.append('file', file)
      // const images = undefined
      const images = await uploadService.postImage(formData)
      return new Promise((rj) => {
        rj({
          urls: {
            // default: images?.data[0].thumbnail,
            default: images
          },
        })
      })
    })
  }

  abort() {}
}

function MyCustomUploadAdapterPlugin(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    // Configure the URL to the upload script in your back-end here!
    return new MyUploadAdapter(loader)
  }
}

export default Editor
