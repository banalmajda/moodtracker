import { Link } from "react-router";
import Container from "../layout/Container.jsx";
import Button from "../ui/Button.jsx";

export default function Navbar() {
  return (
<<<<<<< HEAD
    <nav className=" fixed right-0 left-0 top-0 z-11 bg-[#D8E8DB] shadow-md">
=======
    <nav className=" fixed right-0 left-0 top-0 z-12 bg-[#D8E8DB] shadow-md">
>>>>>>> fefbe4747346ed7ad352918ccf16b48727b99182
      <Container>
        <div className=" flex justify-between items-center w-full py-4">
          <img
            className="h-8 md:h-10 hidden min-[425px]:block"
            src="/auntenticme.png"
            alt="logo"
          />

          {/* mobile */}
          <img
            className="h-8 block min-[425px]:hidden"
            src="logo-bunga.png"
            alt="logo"
          />
          <ul className="flex items-center gap-6 ">
            <li>
              <Link to="/" className="hover:text-[#DE946E]">
                Home
              </Link>
            </li>
            <li>
              <Link to="/tracking">
                <Button>Start Tracking</Button>
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  );
}
