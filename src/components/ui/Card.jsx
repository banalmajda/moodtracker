export function Card({ children }) {
  return (
    <div className=" card-border-gradient">
      <div className="bg-white   w-full min-h-[300px]  justify-start flex flex-col  rounded-lg p-6 shadow hover:shadow-lg hover:bg-amber-600 tsition-all cursor-pointer  ">
        {children}
      </div>
    </div>
  );
}

// header card
export function HeaderCard({ children }) {
  return <div className="mb-2">{children}</div>;
}

// content card
export function ContentCard({ children }) {
  return <div className="text-[16px] font-bold mb-2 ">{children}</div>;
}

// footer card
export function FooterCard({ children }) {
  return <div className=" text-[14px]">{children}</div>;
}
