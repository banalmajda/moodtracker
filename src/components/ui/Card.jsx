export function Card({ children, className }) {
  return (
    <div
      className={`group bg-white w-full min-h-[300px] justify-start flex flex-col 
      rounded-lg p-6 shadow hover:bg-[#DE946E] hover:text-[#fff] transition-all duration-300 
      cursor-pointer text-gray-800 ${className}`}
    >
      {children}
    </div>
  );
}

// header card
export function HeaderCard({ children }) {
  return <div className="mb-2">{children}</div>;
}

// content card
export function ContentCard({ children }) {
  return (
    <div
      className="text-[16px] font-bold mb-2 text-[#DE946E]  group-hover:text-white 
 "
    >
      {children}
    </div>
  );
}

// footer card
export function FooterCard({ children }) {
  return <div className=" text-[14px]">{children}</div>;
}
