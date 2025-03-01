function Button({ children, bgColor, text, textColor, className, ...props }) {
  return (
    <Button
      className={` focus:outline-none text-${textColor} bg-${bgColor}-700 hover:bg-${bgColor}-800  focus:ring-4 focus:ring-${bgColor}-300  font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-${bgColor}-600 dark:hover:bg-${bgColor}-700 dark:focus:ring-${bgColor}-800
  ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}

export default Button;
