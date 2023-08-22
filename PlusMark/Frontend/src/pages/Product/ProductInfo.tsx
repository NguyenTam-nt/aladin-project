export const ProductInfo = (props: { content?: string }) => {
    return (
        <div
            className="h-fit max-h-fit w-full bg-transparent resize-none overflow-hidden"
            style={{ whiteSpace: "pre-line" }}
            dangerouslySetInnerHTML={{ __html: props.content || "" }}
        />
    )
};