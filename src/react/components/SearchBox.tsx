import React from "react";
import { Search } from "lucide-react";
import { SearchBoxProps } from "@lib/types";

const SearchBox: React.FC<SearchBoxProps> = ({
  icon: Icon = Search,
  containerClassName = "",
  ...inputProps
}) => {
  return (
    <div className={`relative ${containerClassName}`}>
      <input
        {...inputProps}
        className={`block w-full rounded-[100px] border border-transparent bg-[var(--secondary-bg)] py-2 pr-10 pl-3 text-[13px] font-normal text-white placeholder:text-[var(--placeholder-color)] focus:border-[var(--light-green-bg)] focus:outline-none ${inputProps.className || ""} `}
      />
      <div className="pointer-events-none absolute inset-y-0 flex items-center pr-3">
        <Icon className="h-5 w-5 text-[var(--placeholder-color)]" />
      </div>
    </div>
  );
};

export default SearchBox;
