import Container from "../layout/Container.jsx";
import Button from "../ui/Button.jsx";
export default function Hero() {
  return (
    <main className="bg-[#D8E8DB]">
      <Container className="flex flex-row justify-between max-h-[80vh] rounded-lg px-28 pt-20">
        <div className="w-full  gap-8  flex flex-col justify-between  rounded-bl-lg  p-6  bg-[#D8E8DB]">
          <h1 className="text-5xl font-bold leading-tight">
            <span className="text-[#DE946E]">
              Empowering
              <br />
            </span>
            Your Emotional Journey
          </h1>
          <p className="text-lg text-gray-700">
            To be the leading platform empowering individuals by enabling them
            to understand and manage their emotions, thereby fostering a journey
            toward authentic self-awareness and mental well-being.
          </p>
          <div>
            <Button>
              <a href="/tracking">Start Tracking</a>
            </Button>
          </div>
        </div>

        <div className=" bg-[#D8E8DB] w-full ">
          <img
            className="h-full w-auto p-4"
            src="/hero1.png"
            alt="Hero Image"
          />
        </div>
      </Container>
    </main>
  );
}
