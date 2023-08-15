import { tableColor } from "commons/contannt";

interface Props {
  handleChoseColor: (color: string) => void;
}
function BoxChoseColor(props: Props) {
  const { handleChoseColor } = props;
  return (
    <div className="w-[120px] boxColor h-[100px] cursor-pointer border p-3 shadow bg-white absolute translate-x-[-50%] z-50 left-[50%] top-[90%] ">
      <div className="flex flex-row h-full flex-wrap gap-1 overflow-y-scroll hiddenScroll">
        {tableColor.map((color, index) => {
          return (
            <div
              onClick={() => handleChoseColor(color)}
              key={index}
              className="w-5 h-5 border"
              style={{ backgroundColor: color }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default BoxChoseColor;
