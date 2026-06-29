import { NavBar } from "@/components/nav-bar";
import { Hero } from "@/components/hero";
import { SubjectGrid } from "@/components/subject-grid";
import { LearningPath } from "@/components/learning-path";
import { FeaturedCourses } from "@/components/featured-courses";
import { AnatomyDive } from "@/components/anatomy-dive";
import { TrainingTools } from "@/components/training-tools";
import { Testimonials } from "@/components/testimonials";
import { StatsRow } from "@/components/stats-row";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <SubjectGrid />
        <LearningPath />
        <FeaturedCourses />
        <AnatomyDive />
        <TrainingTools />
        <Testimonials />
        <StatsRow />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
