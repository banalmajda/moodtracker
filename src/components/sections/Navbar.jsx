import { Link } from "react-router";
import Container from "../layout/Container.jsx";
import Button from "../ui/Button.jsx";

export default function Navbar() {
  return (
    <nav className=" fixed right-0 left-0 top-0 z-10 bg-[#D8E8DB] shadow-md">
      <Container>
        <div className=" flex justify-between items-center w-full py-4">
          <img className="h-10" src="/auntenticme.png" alt="logo" />
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
