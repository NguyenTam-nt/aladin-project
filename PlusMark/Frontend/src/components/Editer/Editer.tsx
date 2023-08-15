import React, { useEffect, useRef, useState, useId } from "react";
import EditorJS from "@editorjs/editorjs";
//@ts-ignore

import Embed from "@editorjs/embed";
//@ts-ignore

import FontSize from "editorjs-inline-font-size-tool";


//@ts-ignore
import ImageTool from "@editorjs/image";
//@ts-ignore
import Tooltip from "editorjs-tooltip";
//@ts-ignore

import Paragraph from "@editorjs/paragraph";
//@ts-ignore


//@ts-ignore

import AlignmentTuneTool from "editorjs-text-alignment-blocktune";
// import { useAppDispatch } from "../../hooks/hook";
// import { pushPopup } from "../../reducers/popupSlice";


type propType = {
    setContent: React.Dispatch<React.SetStateAction<string>>;
    content: string;
    editorRef: any;
    listImageFiles: {
        current: {
            id: number;
            file: File | string;
        }[];
    };
};

function Editor({ setContent, content, editorRef, listImageFiles }: propType) {
    const EDITTOR_HOLDER_ID = useId();



    const [editor, setEditor] = useState<EditorJS | null>(null);
    const currentBlockIndexRef = useRef<number>();
    // const dispatch = useAppDispatch();

    useEffect(() => {
        setEditor((prevEditor: any) => {
            if (!prevEditor) {
                const editors = new EditorJS({
                    holder: EDITTOR_HOLDER_ID,
                    defaultBlock: content,

                    tools: {

                        embed: {
                            class: Embed,
                            inlineToolbar: true,
                            config: {
                                services: {
                                    youtube: true,
                                    coub: true,
                                },
                            },
                        },
                        alignTool: {
                            class: AlignmentTuneTool,
                            config: {
                                default: "left",
                                blocks: {
                                    header: "left",
                                    list: "left",
                                },
                            },
                        },
                        tooltip: {
                            class: Tooltip,
                            config: {
                                location: "left",
                                highlightColor: "#FFEFD5",
                                underline: true,
                                backgroundColor: "#154360",
                                textColor: "#FDFEFE",
                                holder: "editorId",
                            },
                        },
                        paragraph: {
                            class: Paragraph,
                            inlineToolbar: true,
                            tunes: ["alignTool"],
                        },

                        fontSize: FontSize,
                        image: {
                            class: ImageTool,
                            inlineToolbar: true,

                            config: {
                                uploader: {
                                    async uploadByFile(file: File) {
                                        if (file.size < 26675200) {

                                            return onFileChange(file).then((imageUrl) => {
                                                return {
                                                    success: 1,
                                                    file: {
                                                        url: imageUrl,
                                                    },
                                                };
                                            });
                                        } else {
                                            // dispatch(
                                            //     pushPopup({
                                            //         message: "Vui lòng chọn ảnh không quá 25MB",
                                            //         type: "WARNING",
                                            //     })
                                            // );
                                            editors.blocks.delete(
                                                editor?.blocks.getCurrentBlockIndex()
                                            );
                                            return {
                                                success: 1,
                                                file: {
                                                    url: "",
                                                },
                                            };
                                        }
                                    },
                                },
                                // actions: [
                                //   {
                                //     name: "delete",
                                //     icon: '<svg class="icon icon--cross" width="12px" height="12px"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cross"></use></svg>',
                                //     title: 'Xóa',
                                //     action:  async (name:any) => {

                                //       //  editors.blocks.delete(editor?.blocks.getCurrentBlockIndex())

                                //       currentDelete.current = editor?.blocks.getCurrentBlockIndex();

                                //       return false;
                                //   }
                                //   }
                                // ]
                            },
                        },

                    },
                    onChange: async function (api: any, block: any) {

                        currentBlockIndexRef.current = api.blocks.getCurrentBlockIndex();

                        if (block.type === "block-removed") {
                            const data = await editor?.saver.save();
                            console.log(data);
                        }
                    },
                    onReady: () => {
                        editorRef.current = editors;
                    },
                });

                return editors;
            }
            return prevEditor;
        });
        return () => {
            if (editor) {
                editor.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (editor !== null && content !== null && content !== "") {
            console.log(editor.isReady.then(() => {
                editor.render(JSON.parse(content));
            }), 'core')
            editor.isReady.then(() => {
                editor.render(JSON.parse(content));
            });

        }
    }, [content, editor]);



    const onFileChange = async (file: File) => {
        let listImage = listImageFiles.current;
        const index = listImage.findIndex(
            (item) => item.id === currentBlockIndexRef.current
        );
        if (index === -1) {
            listImageFiles.current = [
                ...listImage,
                { id: currentBlockIndexRef.current as number, file },
            ];
        } else {
            listImage[index].file = file;

            listImageFiles.current = [
                ...listImage,
                { id: currentBlockIndexRef.current as number, file },
            ];
        }

        return URL.createObjectURL(file);
    };

    return (
        <>
            <React.Fragment>
                <div className="w-full">
                    <div id={EDITTOR_HOLDER_ID} className="w-full">
                        {" "}
                    </div>
                </div>
            </React.Fragment>
        </>
    );
}

export default Editor;
