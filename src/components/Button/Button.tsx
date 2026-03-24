"use client";
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  active?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
}

const Button = ({
  children,
  onClick,
  variant = "outline",
  active = false,
  type = "button",
  disabled = false,
  className = "",
  href,
  target,
  rel,
}: ButtonProps) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${active ? styles.active : ""} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={buttonClass}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
    >
      {children}
    </button>
  );
};

export default Button;
