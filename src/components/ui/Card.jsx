// src/ui/Card.jsx

// Card Utama
// Menerima prop isActive dan onClick
export function Card({ children, className, isActive, onClick }) {
  // Kelas dasar (base classes)
  const baseClasses = `group bg-white w-full min-h-[300px] justify-start flex flex-col 
    rounded-lg p-6 shadow transition-all duration-300 cursor-pointer text-gray-800 ${className}`;

  // Kelas untuk gaya aktif/hover: Latar belakang oranye & Teks putih
  // Pastikan warna Latar Belakang (bg-[#DE946E]) ada di sini!
  const activeHoverStyles = "!bg-[#DE946E] text-[#fff]";

  // Kelas untuk gaya default (hanya menambahkan hover desktop)
  const defaultClasses = `hover:${activeHoverStyles} focus:${activeHoverStyles}`;

  return (
    <div
      onClick={onClick}
      // Logika di sini: Jika isActive, Terapkan activeHoverStyles
      className={`${baseClasses} ${
        isActive ? activeHoverStyles : defaultClasses
      }`}
    >
      {children}
    </div>
  );
}

// header card (tidak berubah)
export function HeaderCard({ children }) {
  return <div className="mb-2">{children}</div>;
}

// content card
// Menerima prop isActive
export function ContentCard({ children, isActive }) {
  // Kelas dasar
  const baseClasses = "text-[16px] font-bold mb-2";

  // Kelas warna aktif (putih)
  const activeColorClasses = "text-white";

  // Kelas warna default (dengan group-hover/active untuk desktop/mobile default)
  const defaultColorClasses =
    "text-[#DE946E] group-hover:text-white group-active:text-white";

  return (
    <div
      className={`${baseClasses} ${
        isActive ? activeColorClasses : defaultColorClasses
      }`}
    >
      {children}
    </div>
  );
}

// src/ui/Card.jsx (Perubahan pada FooterCard)

// Footer Card diubah untuk menerima prop isActive
export function FooterCard({ children, isActive }) {
  // Warna default yang ingin diwarisi/dilihat: Abu-abu (dari Card)
  const defaultColor = "text-gray-800";

  // Warna saat aktif: Putih
  const activeColor = "text-white";

  // Gaya untuk warna teks pada kondisi hover desktop (jika state tidak aktif)
  const hoverDesktop = "group-hover:text-white";

  return (
    <div
      className={`text-[14px] 
        ${isActive ? activeColor : `${defaultColor} ${hoverDesktop}`}`}
    >
      {children}
    </div>
  );
}
