import React from "react";

const Input = ({
  className = "",
  placeholder = "",
  type = "text",
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`
        w-full px-3 py-2
        bg-[var(--surface)] border border-[var(--border)]
        text-[var(--text)] placeholder:text-[var(--text-muted)]
        rounded-[var(--radius-card)]
        focus:outline-none focus:ring-2 focus:ring-[var(--focus)]
        transition-all duration-200
        ${className}
      `}
      {...props}
    />
  );
};

export default Input;
