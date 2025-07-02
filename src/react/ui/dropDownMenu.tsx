import { DropdownMenuProps } from "@lib/types";
import React, { useEffect, useRef } from "react";

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  isVisible,
  onClose,
  className = "",
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      ref={menuRef}
      className={`absolute z-10 mt-2 w-40 rounded-lg bg-[var(--dropdown-bg)] text-[var(--primary-color)] shadow-lg ${className} top-5 left-2 text-[13px]`}
    >
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            item.onClick();
            onClose();
          }}
          className="flex h-12 w-[160px] items-center p-[14px] text-left text-sm hover:bg-[var(--cards-bg)]"
        >
          {item.icon && (
            <span className="ml-2 inline-flex h-5 w-5">{item.icon}</span>
          )}
          {item.label}
        </button>
      ))}
    </div>
    
  );
};

export default DropdownMenu;
