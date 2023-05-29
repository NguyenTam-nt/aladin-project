import { ChangeEvent, useEffect, useRef, useState } from "react";

export const useHandleCheckbox = (listId: number[]) => {
  const refCheckboxAll = useRef<HTMLInputElement>(null);
  const refCheckboxList = useRef<HTMLInputElement[]>([]);
  const [listChecked, setListChecked] = useState<number[]>([]);

 

  useEffect(() => {
    if (listId.length > 0 && listChecked.length === listId.length) {
      refCheckboxAll.current!.checked = true;
    }else {
        refCheckboxAll.current!.checked = false;
    }
  }, [listChecked, listId]);

  const handleCheckAll = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    refCheckboxAll.current!.checked = checked;
    if (checked) {
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

  const clearList = () => {
    setListChecked([])
    refCheckboxAll.current!.checked = false
  }

  return {
    refCheckboxAll,
    refCheckboxList,
    handleCheckedItem,
    handleCheckAll,
    clearList,
    listChecked ,
    setListChecked
  };
};
