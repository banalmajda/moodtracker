export default function Button({ children, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`bg-[#DE946E] py-2 px-4 hover:bg-[#FF8D4D] text-white rounded-lg ${className}`}
    >
      {children}
    </button>
  );
}
