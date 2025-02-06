export default function FilledButton({
  type = "button",
  className = "",
  disabled = false,
  children,
  onClick,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center gap-2 w-2/3 
        px-6 py-3 rounded-full font-medium text-white 
        bg-primary hover:bg-black 
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-4 focus:ring-secondary/50
        disabled:bg-gray-300 disabled:opacity-70 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}