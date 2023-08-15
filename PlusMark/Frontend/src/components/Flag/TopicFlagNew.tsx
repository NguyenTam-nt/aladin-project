import { some } from "@utility/helper";

interface Props {
  title?: any;
  color?: "main" | "icon";
  highlight?: boolean;
  items: some
}
const TopicFlagNew = (props: Props) => {
  return (
    <div className="overflow-x-hidden">
      <div
        className={`container px-8 topic-flag__background py-3 flex items-center justify-between  flex-wrap ${
          props.color === "icon" ? "bg-icon" : "bg-main" }`}
      >
        <h1
          className={`text-white leading-normal ${
            props.highlight
              ? "font-valky font-bold text-title xl:text-header2"
              : "text-title font-medium"
          }`}
        >
          {props.title}
        </h1>
        <div className="flex gap-2 lg:pr-6">
          {props.items.map((it: any, idx: any) => (
            <button
              key={idx}
              className={`btn px-2 py-1 lg:px-4 lg:py-1.5 rounded-md text-wap-regular2 lg:text-normal1 text-black h-fit  w-fit min-w-fit text-[${props.color}] ${
                4 == idx ? "bg-button" : ""
              }`}
            >
              {it}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicFlagNew;
