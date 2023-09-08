import EditLinearIcon from "@assets/iconElements/EditLinearIcon";
import { ICDeleteTrashLight } from "@assets/iconElements/ICDeleteTrashLight";
import { InputComponent } from "@components/input/InputComponent";
import useI18n from "@hooks/useI18n";
import { KeyboardEvent, memo } from "react";

interface Props {
  atribute: {
    valueVn: string[];
    valueKr: string[];
    attributeNameVn: string;
    attributeNameKr: string;
  };
  indexAtribute: number;
  handleAddValue: (value: string, index: number) => void;
  handleEditAtb: () => void;
  handleDelete: (index: number, indexSub: number) => void;
}
const AtributeItem = memo(
  ({
    atribute,
    indexAtribute,
    handleAddValue,
    handleEditAtb,
    handleDelete,
  }: Props) => {
    const { isVn } = useI18n();
    const keyDownInput = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode == 13 && e.currentTarget.value != "") {
        handleAddValue(e.currentTarget.value, indexAtribute);
        e.currentTarget.value = "";
      }
    };
    return (
      <>
        <div className="flex flex-row flex-wrap items-center gap-3 my-5">
          <div className="w-1/5 flex gap-3 items-center">
            <div className="rounded-sm border border-neutra-neutra80 h-10 flex items-center px-5 w-5/6">
              {isVn ? atribute.attributeNameVn : atribute.attributeNameKr}
            </div>
            <div className="cursor-pointer" onClick={handleEditAtb}>
              <EditLinearIcon />
            </div>
          </div>
          <div className="ml-spc50 flex flex-wrap">
            {(isVn ? atribute.valueVn : atribute.valueKr).map(
              (value, indexVal) => {
                return (
                  <div
                    key={indexVal}
                    className="bg-main h-10 rounded-sm py-1 px-4 text-white text-sm w-fit flex items-center justify-center gap-2 mr-1"
                  >
                    {value}
                    <span
                      className="cursor-pointer"
                      onClick={() => handleDelete(indexAtribute, indexVal)}
                    >
                      x
                    </span>
                  </div>
                );
              }
            )}
          </div>
          <InputComponent
            onKeyDown={keyDownInput}
            name=""
            placeholder="nhập giá trị và enter"
            className="!rounded-sm !w-[300px]"
          />
          <div
            className="cursor-pointer"
            onClick={() => handleDelete(indexAtribute, -1)}
          >
            <ICDeleteTrashLight />
          </div>
        </div>
      </>
    );
  }
);

export default AtributeItem;
