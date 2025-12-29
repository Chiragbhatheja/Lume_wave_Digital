import ClientsCarousel from '@/components/ClientsCarousel';
import Hero from '@/components/Hero';
import ProblemClarity from '@/components/ProblemClarity';
import Services from '@/components/Services';
import WhoWeAreFor from '@/components/WhoWeAreFor';
import Testimonials from '@/components/Testimonials';
import Projects from '@/components/Projects';
import ContactForm from '@/components/ContactForm';
import { generateMetadata as genMeta } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export async function generateMetadata() {
  return genMeta('home');
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f9fc]">
      {/* Background gravity layer for cohesive flow */}
      <div className="pointer-events-none absolute inset-0 opacity-90" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(27,169,232,0.09),transparent_35%),radial-gradient(circle_at_82%_10%,rgba(255,107,107,0.08),transparent_34%),radial-gradient(circle_at_50%_85%,rgba(0,64,122,0.06),transparent_36%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,64,122,0.06)_0%,rgba(255,107,107,0.04)_40%,rgba(27,169,232,0.05)_100%)]" />
        <div className="absolute inset-0 opacity-30 mix-blend-soft-light bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22%3E%3Cpath fill=%22%23ffffff%22 fill-opacity=%220.35%22 d=%22M0 0h2v2H0zM20 20h2v2h-2zM10 30h2v2h-2zM30 10h2v2h-2z%22/%3E%3C/svg%3E')]" />
        {/* Flow band from hero into next sections */}
          <div className="absolute inset-x-0 top-0 h-[150vh] bg-[linear-gradient(128deg,rgba(255,255,248,1)_0%,rgba(248,246,238,0.98)_26%,rgba(236,242,255,0.96)_52%,rgba(248,238,252,0.94)_74%,rgba(255,246,236,0.98)_100%)] blur-[10px] opacity-100" />

          {/* Global vertical flow band to connect sections (moderate, continuous) */}
          <div
            className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[34vw] max-w-[720px] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.96)_42%,rgba(255,255,255,0.96)_58%,rgba(255,255,255,0)_100%)] blur-xl opacity-100 mix-blend-screen"
            aria-hidden
          />
          {/* Early subtle glow rising from hero */}
          <div className="absolute inset-x-0 top-[6vh] h-[120vh] bg-[radial-gradient(90%_60%_at_50%_22%,rgba(255,255,255,0.68),rgba(255,255,255,0))] opacity-90 mix-blend-screen" />
          {/* Mid bloom to emphasize flow through ProblemClarity */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[66vh] h-[126vh] w-[88vw] bg-[radial-gradient(70%_44%_at_50%_12%,rgba(255,255,255,0.66),rgba(255,255,255,0))] blur-xl opacity-95 mix-blend-screen" />
      </div>

      <section id="home" className="relative">
        <Hero />
      </section>

      {/* Clients Carousel */}
      <div className="relative">
        <ClientsCarousel />
      </div>

      {/* Problem Clarity */}
      <div className="relative">
        <ProblemClarity />
      </div>

      {/* Our Services */}
      <section id="services" className="relative">
        <Services />
      </section>

      {/* Who We Are For */}
      <div className="relative">
        <WhoWeAreFor />
      </div>

      {/* Testimonials & Stats */}
      <section id="testimonials" className="relative">
        <Testimonials />
      </section>

      {/* Featured Projects */}
      <section id="projects" className="relative">
        <Projects />
      </section>

      {/* Contact Form */}
      <section id="contact" className="relative">
        <ContactForm />
      </section>
    </div>
  );
}
