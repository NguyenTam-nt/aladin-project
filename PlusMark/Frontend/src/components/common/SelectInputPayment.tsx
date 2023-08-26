import { some } from "@utility/helper";
import Select from "react-select";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function SelectInputPayment({
  name,
  value,
  setValue,
  options,
  label,
  required,
}: some) {
  const id = uuidv4();

  const styles = {
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected ? "var(--main-color)" : "inherit",
      "&:hover": {
        backgroundColor: state.isSelected
          ? "var(--main-color)"
          : "var(--icon-color)",
      },
      borderBottom: "1px solid #C4C4C4",
      cursor: "pointer",
      zIndex: 99999,
    }),
    control: (provided: any) => ({
      ...provided,
      boxShadow: "none",
      border: "0px solid var(--gray-003)",
      borderRadius: "10px",
      background: "transparent",
      zIndex: 2,
    }),
    singleValue: (provided: any, state: any) => ({
      ...provided,
      color: "var(--text)",
      border: "0px solid var(--gray-003)",
    }),
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 9999,
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: "9999 !important",
      paddingLeft: "10px",
      backgroundColor: "#EFEFEF"
    }),
  };


  return (
    <label
      htmlFor={id}
      className=" w-full h-full flex relative border border-gray-300 rounded-lg hover:cursor-pointer"

    >
      <Select
        inputId={id}
        styles={styles}
        className="h-full w-full text-text text-normal1 rounded-md hover:cursor-pointer"
        defaultValue={value}
        value={value}
        isSearchable={false}
        name={name}
        options={options}
        onChange={(e) => setValue(e)}
      />

      <div className="hover:cursor-pointer text-normal1 py-2 absolute  px-3"
      >
        {value == null || value.value == "" ? (
          <>
            <span className="text-gray-300 select-none">{label}</span>{" "}
            {required}
          </>
        ) : (
          ""
        )}
      </div>
    </label>
  );
}

export default SelectInputPayment;
