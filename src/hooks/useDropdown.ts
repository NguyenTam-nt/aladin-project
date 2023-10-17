import {useRef, useState} from 'react';

export const useDropdown = () => {
  const refDropdown = useRef();
  const [visible, setVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = (): void => {
    //@ts-ignore
    refDropdown.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
  };

  return {toggleDropdown, visible, setVisible, dropdownTop, refDropdown};
};
