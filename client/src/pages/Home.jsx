import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedBackground from "../components/AnimatedBackground";
import ErrorBoundary from "../components/ErrorBoundary";
import CustomCursor from "../components/CustomCursor";
import ScrollProgress from "../components/ScrollProgress";
import BackToTop from "../components/BackToTop";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Projects from "../sections/Projects";
import Certificates from "../sections/Certificates";
import Education from "../sections/Education";
import Experience from "../sections/Experience";
import Cybersecurity from "../sections/Cybersecurity";
import Toolbox from "../sections/Toolbox";
import GithubSection from "../sections/GithubSection";
import Contact from "../sections/Contact";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <AnimatedBackground />
      <Navbar />
      <main>
        <ErrorBoundary><Hero /></ErrorBoundary>
        <ErrorBoundary><About /></ErrorBoundary>
        <ErrorBoundary><Education /></ErrorBoundary>
        <ErrorBoundary><Skills /></ErrorBoundary>
        <ErrorBoundary><Projects /></ErrorBoundary>
        <ErrorBoundary><Certificates /></ErrorBoundary>
        <ErrorBoundary><Experience /></ErrorBoundary>
        <ErrorBoundary><Cybersecurity /></ErrorBoundary>
        <ErrorBoundary><Toolbox /></ErrorBoundary>
        <ErrorBoundary><GithubSection /></ErrorBoundary>
        <ErrorBoundary><Contact /></ErrorBoundary>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
