
import Availability from "@/components/mainlandinpage/Availability";
import { UsVsThemComparison } from "@/components/mainlandinpage/comparator";
import { CallToAction } from "@/components/mainlandinpage/Cta";
import Faq from "@/components/mainlandinpage/Faq";
import Footer from "@/components/mainlandinpage/Footer";
import Herosection from "@/components/mainlandinpage/herosection";
import HowItWorksDemo from "@/components/mainlandinpage/Howitworks";
import Integrate from "@/components/mainlandinpage/Integration";
import Navbar from "@/components/mainlandinpage/navbar";
import Pricing from "@/components/mainlandinpage/Pricing";


export default function Home() {
  return (
      <div className="max-w-9xl mx-auto md:px-11 px-2 md:pt-6">
        <Navbar></Navbar>
        <Herosection></Herosection>
        <Integrate></Integrate>
        <UsVsThemComparison></UsVsThemComparison>
        <Availability></Availability>
        <Pricing></Pricing>
        {/* <HowItWorksDemo></HowItWorksDemo> */}
        <Faq></Faq>
        <CallToAction></CallToAction>
        <Footer></Footer>
      </div>
  );
}
