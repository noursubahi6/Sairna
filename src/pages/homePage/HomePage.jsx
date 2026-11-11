import CTASection from "../../components/CTASection/CTASection";
import ExploreSection from "../../components/ExploreCities/ExploreCities";
import HeroSection from "../../components/hero/hero";
import LiveTrackingPreview from "../../components/liveTrackingPreview/liveTrackingPreview";
import StepsSection from "../../components/StepsSection/StepsSection";

function HomePage() {

  return (
    <main>
      <HeroSection />
      <ExploreSection/>
      <StepsSection/>
      <LiveTrackingPreview/>
      <CTASection/>
    </main>
  );
}

export default HomePage;
