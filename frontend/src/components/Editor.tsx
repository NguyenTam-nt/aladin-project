import React from 'react'
//@ts-ignore
import {CKEditor} from '@ckeditor/ckeditor5-react'
//@ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import uploadService from '../../services/uploadService'

type Props = {
  content: string
  onChange: (content: string) => void
  onBlur?: (content: string) => void
}

const Editor = ({content, onChange, onBlur}: Props) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={content}
      onReady={(editor: any) => {
        MyCustomUploadAdapterPlugin(editor)
      }}
      onChange={(event: any, editor: any) => {
        const data = editor.getData()
  
        onChange(data)
      }}
      onBlur={(event: any, editor: any) => {
        const data = editor.getData()
        onBlur?.(data)
      }}
      onFocus={(event: any, editor: any) => {}}
    />
  )
}

class MyUploadAdapter {
  public loader
  constructor(loader: any) {
    this.loader = loader
  }

  upload() {
    return this.loader.file.then(async (file: any) => {
      const formData = new FormData()
      formData.append('thumbnails', file)
      const images = undefined
    //   const images = await uploadService.uploadImageCustom(formData)
      return new Promise((rj) => {
        rj({
          urls: {
            // default: images?.data[0].thumbnail,
            default:"https://image.placeholder.co/insecure/w:750/aHR0cHM6Ly9jZG4uc3BhY2VyLnByb3BlcnRpZXMvN2JiNzkzZjQtZjczMS00MTk0LThlNjItZDdiNmE0ZWM1Mzk4",
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
