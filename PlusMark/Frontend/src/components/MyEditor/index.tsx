import { convertFromRaw, EditorState } from "draft-js";
import { FormikErrors } from "formik/dist/types";
import { forwardRef, lazy, Suspense, useImperativeHandle, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface props {
  name: string;
  setValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) =>
    | Promise<void>
    | Promise<
      FormikErrors<{
        content: string;
      }>
    >;
  value: string;
  listImageFiles: React.MutableRefObject<
    {
      src: string;
      data: File;
    }[]
  >;
}

const Editor = lazy(() => import('react-draft-wysiwyg').then((method) => ({
  default: method.Editor
})))

const MyEditor = forwardRef<any, props>((props, ref) => {
  const { name, value, listImageFiles, setValue } = props;
  const [editorState, setEditorState] = useState(() => {
    let content;
    try {
      let newValue = JSON.parse(value.replace(/'/g, '"'))
      if (typeof newValue == 'string') {
        newValue = JSON.parse(newValue)
      }
      content = convertFromRaw(newValue);
    } catch (ex) {
      content = null;
    }
    return content
      ? EditorState.createWithContent(content)
      : EditorState.createEmpty();
  });
  const handleUpload = (file: File) =>
    new Promise((resolve, reject) => {
      if (file.size > 26675200) {
        return resolve({ data: { link: "" } });
      }
      const src = URL.createObjectURL(file);
      const listImage = listImageFiles.current;
      listImageFiles.current = [
        ...listImage,
        {
          src: src,
          data: file,
        },
      ];
      return resolve({ data: { link: src } });
    });

  useImperativeHandle(ref, () => ({
    resetEditor() {
      setEditorState(EditorState.createEmpty());
    },
  }));

  return (
    <Suspense fallback={'loading'}>
      <Editor
        editorState={editorState}
        editorStyle={{
          height: '260px',
        }}
        onEditorStateChange={setEditorState}
        onContentStateChange={(content) => {
          setValue(name, JSON.stringify(content));
        }}
        stripPastedStyles={true}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={{
          options: [
            "fontSize",
            "inline",
            "colorPicker",
            "link",
            "image",
            "textAlign",
            "list",
          ],
          inline: {
            options: ["bold", "italic", "underline"],
          },
          list: {
            inDropdown: true,
            options: ["unordered", "ordered"],
          },
          textAlign: {
            inDropdown: true,
            options: ["left", "center", "right", "justify"],
          },
          image: {
            uploadCallback: handleUpload,
            previewImage: true,
            alt: { present: true, mandatory: false },
            inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
          },
          link: {
            inDropdown: true,
            popupClassName: 'popup-link-class'
          },
        }}
        toolbarStyle={{
          border: "none",
          padding: "8px 20px",
          borderBottom: "1px solid #D9D9D9",
          marginBottom: 0,
          backgroundColor: "unset",
        }}
        localization={{
          locale: 'en',
          translations: {
            "generic.add": "Thêm",
            "generic.cancel": "Huỷ",
            "components.controls.image.fileUpload": "Tải ảnh",
            "components.controls.image.dropFileText": "Thả tệp hoặc nhấp để tải lên",
            "components.controls.link.linkTitle": "Tiêu đề liên kết",
            "components.controls.link.linkTarget": "Liên kết mục tiêu",
            "components.controls.link.linkTargetOption": "Mở liên kết trong cửa sổ mới",
          }
        }}
      />
    </Suspense>
  );
});

export default MyEditor;
