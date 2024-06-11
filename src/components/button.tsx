import React from "react";
import "./button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  type: 
}

const Button: React.FC<ButtonProps> = (props) => {
  const { size = "medium", ...rest } = props;

  return <button className={"button primary " + size} {...rest} />;
};

export default Button;