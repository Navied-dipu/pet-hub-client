import Banner from "@/components/Banner";
import FeatureSection from "@/components/FeatureSection";
import PetCareTips from "@/components/PetCareTips";
import WhyAdopt from "@/components/WhyAdopt";

import Image from "next/image";

export default function Home() {
  return (
    <div className="space-x-5">
      <Banner></Banner>
      <FeatureSection></FeatureSection>
      <PetCareTips></PetCareTips>
      <WhyAdopt></WhyAdopt>
    </div>
  );
}
