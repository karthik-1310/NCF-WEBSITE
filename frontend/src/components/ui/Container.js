import React from "react";

const Container = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
