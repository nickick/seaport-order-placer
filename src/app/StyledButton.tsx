import React from "react";

const StyledButton = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="p-2 border rounded border-white m-2 mx-0 disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    >
      {children}
    </button>
  );
};

export { StyledButton };
