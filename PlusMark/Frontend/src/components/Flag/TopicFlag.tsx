interface Props {
  title?: string;
  color?: "main" | "icon";
  highlight?: boolean;
}
const TopicFlag = (props: Props) => {
  return (
    <div className="overflow-x-hidden">
      <div
        className={`container px-24 topic-flag__background h-24 flex items-center justify-between ${
          props.color === "icon"
            ? "topic-flag__background--icon"
            : "topic-flag__background--main"
        }`}
      >
        <h1
          className={`text-white ${
            props.highlight
              ? "font-valky font-bold text-header2"
              : "text-title font-medium"
          }`}
        >
          {props.title}
        </h1>
        <div className="flex gap-2">
          {[1, 2, 3].map((it, idx) => (
            <button
              key={idx}
              className={`btn text-main text-[${props.color}] ${
                1 == idx ? "bg-button" : ""
              }`}
            >
              Điện thoại
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicFlag;
