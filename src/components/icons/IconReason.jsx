// src/icons/IconReason.jsx

// Menerima prop isActive
export default function IconReason({ children, isActive }) {
  // Kelas dasar
  const baseClasses = `w-[50px] h-[50px] flex items-center justify-center 
    rounded-lg mb-4 transition-all duration-300`;

  // Kelas untuk gaya aktif (latar putih, teks oranye)
  const activeClasses = "bg-white text-[#DE946E]";

  // Kelas untuk gaya default (latar hijau muda, teks hijau tua) + gaya hover/focus group
  const defaultClasses = `bg-[#D8E8DB] text-[#1D493C] 
    group-hover:bg-white 
    group-hover:text-[#DE946E] 
    group-active:bg-white 
    group-active:text-[#DE946E] 
    group-focus:bg-white 
    group-focus:text-[#DE946E]`;

  return (
    <div
      className={`${baseClasses} ${isActive ? activeClasses : defaultClasses}`}
    >
      {children}
    </div>
  );
}
