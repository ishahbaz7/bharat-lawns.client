import { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const WhiteSearchInput = ({ handleChange, id, value, label, onClear }) => {
  const inputRef = useRef(null);
  const [inVal, setInVal] = useState("");
  return (
    <div className="w-full 2xl:max-w-[25rem]">
      <div className="relative h-10 w-full min-w-[200px]">
        <div className="absolute right-3 top-0 flex h-full items-center justify-center">
          <AiOutlineClose
            className="cursor-pointer"
            onClick={() => {
              onClear(inputRef);
              inputRef.current?.focus();
              setInVal("");
            }}
            color="white"
          />
        </div>
        <input
          ref={inputRef}
          onChange={(e) => setInVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handleChange(inputRef);
              inputRef.current.value = "";
              // inputRef.current?.blur();
            }
          }}
          value={inVal}
          id={id || ""}
          className="peer h-full w-full rounded-[7px] border border-white border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white focus:border-2 focus:border-white focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeholder=" "
        />
        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal capitalize leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-white before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-white after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-white peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-white peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white">
          {label}
        </label>
      </div>
    </div>
  );
};

export default WhiteSearchInput;
