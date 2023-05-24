import { useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";



const WhiteSearchInput = ({
  handleChange,
  id,
  value,
  label,
  onClear,
}) => {
  const inputRef = useRef(null);
  return (
    <div className="w-full 2xl:max-w-[25rem]">
      <div className="relative w-full min-w-[200px] h-10">
        <div className="absolute right-3 top-0 flex justify-center items-center h-full">
          <AiOutlineClose
            className="cursor-pointer"
            onClick={() => {
              onClear(inputRef);
              inputRef.current?.focus();
            }}
            color="white"
          />
        </div>
        <input
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handleChange(inputRef);
              inputRef.current.value = "";
              // inputRef.current?.blur();
            }
          }}
          // value={value || ""}
          id={id || ""}
          className="peer w-full h-full bg-transparent text-white font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-white focus:border-white"
          placeholder=" "
        />
        <label className="flex capitalize w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-white leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-white transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-white peer-focus:text-white before:border-white peer-focus:before:!border-white after:border-white peer-focus:after:!border-white">
          {label}
        </label>
      </div>
    </div>
  );
};

export default WhiteSearchInput;
