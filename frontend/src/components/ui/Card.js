import React from "react";

const Card = ({ children, className = "", padding = "default", ...props }) => {
  const paddingClasses = {
    none: "",
    small: "p-4",
    default: "p-6",
    large: "p-8",
  };

  return (
    <div
      className={`
        bg-[var(--surface)] border border-[var(--border)]
        rounded-[16px] 
        ${paddingClasses[padding]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
