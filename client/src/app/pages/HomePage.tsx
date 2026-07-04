import {
  Navbar,
  NotebookHero,
  FeaturesSection,
  LearningJourney,
  ComparisonSection,
  ShowcaseSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
  Footer,
} from '@/components/landing';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <NotebookHero />
        <FeaturesSection />
        <LearningJourney />
        <ComparisonSection />
        <ShowcaseSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
