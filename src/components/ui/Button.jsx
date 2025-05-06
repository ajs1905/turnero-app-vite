export function Button({ className = "", children, ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
