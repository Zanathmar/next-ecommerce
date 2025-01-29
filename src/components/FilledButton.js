export default function FilledButton({ type = "button", className, children }) {
  return (
    <button
      type="submit"
      className={"px-4 py-3 bg-dark text-white rounded-full font-semibold " + className}
    >
      {children}
    </button>
  );
}
