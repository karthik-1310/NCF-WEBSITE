import React from "react";

const TaxaIcon = ({ type, className = "w-16 h-16" }) => {
  const iconProps = {
    className: className,
    fill: "currentColor",
    viewBox: "0 0 24 24",
  };

  switch (type) {
    case "birds":
      return (
        <svg {...iconProps}>
          <path d="M3 12c0-3.314 4.03-6 9-6s9 2.686 9 6-4.03 6-9 6-9-2.686-9-6z" />
          <path d="M8 10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
          <path d="M12 8c2.5 0 4.5 1 5.5 2.5L19 9l1 1-1.5 1.5c-.5 1-2 2.5-5.5 2.5v-2c1.5 0 2.5-.5 3-1-.5-.5-1.5-1-3-1V8z" />
        </svg>
      );

    case "butterflies":
      return (
        <svg {...iconProps}>
          <path d="M12 2c-1.5 0-3 1-4 2.5C6.5 6 6 8 7 9.5c.5.8 1.2 1.3 2 1.5.8.2 1.5 0 2-.5.5.5 1.2.7 2 .5.8-.2 1.5-.7 2-1.5 1-1.5.5-3.5-1-5C15 3 13.5 2 12 2z" />
          <path d="M12 11c-1.5 0-3 1-4 2.5C6.5 15 6 17 7 18.5c.5.8 1.2 1.3 2 1.5.8.2 1.5 0 2-.5.5.5 1.2.7 2 .5.8-.2 1.5-.7 2-1.5 1-1.5.5-3.5-1-5-1.5-1.5-3-2.5-4-2.5z" />
        </svg>
      );

    case "mammals":
      return (
        <svg {...iconProps}>
          <path d="M12 2C8.5 2 5.5 4.5 5 8c-.3 2 .5 4 2 5.5 1 1 2.5 1.5 4 1.5h2c1.5 0 3-.5 4-1.5 1.5-1.5 2.3-3.5 2-5.5C18.5 4.5 15.5 2 12 2z" />
          <circle cx="9" cy="9" r="1" />
          <circle cx="15" cy="9" r="1" />
          <path d="M8 13c1 1 2.5 1.5 4 1.5s3-.5 4-1.5" />
        </svg>
      );

    case "reptiles":
      return (
        <svg {...iconProps}>
          <path d="M6 12c0-4 3-8 8-8s8 4 8 8-3 8-8 8-8-4-8-8z" />
          <path d="M12 8c-2 0-3.5 1-4 3h8c-.5-2-2-3-4-3z" />
          <circle cx="10" cy="10" r="1" />
          <circle cx="14" cy="10" r="1" />
          <path d="M10 15h4l-2 2-2-2z" />
        </svg>
      );

    case "amphibians":
      return (
        <svg {...iconProps}>
          <ellipse cx="12" cy="13" rx="8" ry="5" />
          <circle cx="12" cy="8" r="4" />
          <circle cx="10" cy="7" r="1" />
          <circle cx="14" cy="7" r="1" />
          <path d="M8 16c-2 1-3 2-3 3h14c0-1-1-2-3-3" />
        </svg>
      );

    case "insects":
      return (
        <svg {...iconProps}>
          <ellipse cx="12" cy="12" rx="3" ry="6" />
          <circle cx="12" cy="7" r="2" />
          <path d="M8 10l-3-2" />
          <path d="M8 12l-3 0" />
          <path d="M8 14l-3 2" />
          <path d="M16 10l3-2" />
          <path d="M16 12l3 0" />
          <path d="M16 14l3 2" />
        </svg>
      );

    default:
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v12M6 12h12" />
        </svg>
      );
  }
};

export default TaxaIcon;
