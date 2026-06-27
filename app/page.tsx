import { Hero } from "@/components/hero";
import { SubjectGrid } from "@/components/subject-grid";
import { LearningPath } from "@/components/learning-path";
import { FeaturedCourses } from "@/components/featured-courses";
import { AnatomyDive } from "@/components/anatomy-dive";
import { TrainingTools } from "@/components/training-tools";
import { Testimonials } from "@/components/testimonials";
import { StatsRow } from "@/components/stats-row";
import { CTASection } from "@/components/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SubjectGrid />
      <LearningPath />
      <FeaturedCourses />
      <AnatomyDive />
      <TrainingTools />
      <Testimonials />
      <StatsRow />
      <CTASection />
      <footer className="py-8 bg-zinc-950 border-t border-zinc-800">
        <div className="container-main">
          <p className="text-sm text-zinc-500 text-center">
            FitLearn &copy; {new Date().getFullYear()} - 用科学重新理解训练
          </p>
        </div>
      </footer>
    </>
  );
}
