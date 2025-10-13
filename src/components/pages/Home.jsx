import MainLayout from "../layout/MainLayout";
import Hero from "../sections/Hero.jsx";
import Benefit from "../sections/Benefit.jsx";
import Reason from "../sections/Reason.jsx";
import Faq from "../sections/Faq.jsx";
export default function Home() {
  return (
    <div>
      <MainLayout>
        <Hero />
        <Benefit />
        <Reason />
        <Faq />
      </MainLayout>
    </div>
  );
}
