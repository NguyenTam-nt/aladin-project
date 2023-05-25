import { ChangeEvent, useEffect, useRef, useState } from "react";

export const useHandleCheckbox = (listId: number[]) => {
  const refCheckboxAll = useRef<HTMLInputElement>(null);
  const refCheckboxList = useRef<HTMLInputElement[]>([]);
  const [listChecked, setListChecked] = useState<number[]>([]);

  useEffect(() => {
    if (listChecked.length === listId.length) {
      refCheckboxAll.current!.checked = true;
    }else {
        refCheckboxAll.current!.checked = false;
    }
  }, [listChecked, listId]);

  const handleCheckAll = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    refCheckboxAll.current!.checked = checked;
    if (checked) {
        console.log({ref:  refCheckboxList.current })
      refCheckboxList.current.forEach((item) => {
        item.checked = true;
      });
      setListChecked([...listId]);
    } else {
      refCheckboxList.current.forEach((item) => {
        item.checked = false;
      });
      setListChecked([]);
    }
  };

  const handleCheckedItem = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const checked = event.target.checked;
    refCheckboxList.current[index].checked = checked;
    if(checked) {
        setListChecked([...listChecked, listId[index]])
    }else {
        const newList = [...listChecked]
        const id = listId[index]
        const _i = newList.findIndex(item => item === id)
        newList.splice(_i, 1)
        setListChecked([...newList])
    }
  };

  return {
    refCheckboxAll,
    refCheckboxList,
    handleCheckedItem,
    handleCheckAll,
  };
};
