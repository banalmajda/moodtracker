export default function IconReason({ children }) {
  return (
    <div
      className="w-[50px] h-[50px] bg-[#D8E8DB] flex items-center justify-center 
      rounded-lg mb-4 text-[#1D493C] 
      
      /* Gaya untuk Background */
      group-hover:bg-white 
      group-active:bg-white  /* ✅ Aktif saat disentuh/tekan di mobile */
      group-focus:bg-white   /* ✅ Aktif setelah ketukan pertama di mobile */

      /* Gaya untuk Text Color */
      group-hover:text-[#DE946E] 
      group-active:text-[#DE946E] /* ✅ Aktif saat disentuh/tekan di mobile */
      group-focus:text-[#DE946E]  /* ✅ Aktif setelah ketukan pertama di mobile */
      "
    >
      {children}
    </div>
  );
}
