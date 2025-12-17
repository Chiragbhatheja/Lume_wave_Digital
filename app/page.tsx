import ClientsCarousel from '@/components/ClientsCarousel';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Projects from '@/components/Projects';
import Blogs from '@/components/Blogs';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  return (
    <div className="min-h-screen">
      <section id="home">
        <Hero />
      </section>

      {/* Clients Carousel */}
      <ClientsCarousel />

      {/* Why Choose Us */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center mb-12">
          <p className="font-inter text-sm uppercase tracking-[0.2em] text-[#00407a]/60">About Us</p>
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-[#001f3f] mt-2">
            Why Choose LumeWave Digital
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="rounded-3xl border border-[#e8f1f7] bg-[#ffecec] p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-[#1ba9e8]/40">
            <h3 className="font-poppins text-xl font-semibold text-[#001f3f] mb-3">Custom Digital Solutions</h3>
            <p className="font-inter text-base text-[#003366] leading-relaxed">
              Tailored websites and digital experiences designed around your goals and target audience.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e8f1f7] bg-[#e8f3ff] p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-[#1ba9e8]/40">
            <h3 className="font-poppins text-xl font-semibold text-[#001f3f] mb-3">Remote Team Excellence</h3>
            <p className="font-inter text-base text-[#003366] leading-relaxed">
              Fully remote studio with seamless collaboration, clear communication, and timezone-friendly delivery.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e8f1f7] bg-[#e9f7ef] p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-[#1ba9e8]/40">
            <h3 className="font-poppins text-xl font-semibold text-[#001f3f] mb-3">Latest Technology</h3>
            <p className="font-inter text-base text-[#003366] leading-relaxed">
              Built with Next.js, React, and modern stacks to keep your product fast, secure, and future-ready.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e8f1f7] bg-[#fff3e6] p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-[#1ba9e8]/40">
            <h3 className="font-poppins text-xl font-semibold text-[#001f3f] mb-3">Transparent Partnership</h3>
            <p className="font-inter text-base text-[#003366] leading-relaxed">
              Clear pricing, milestones, and frequent updates so you always know progress and next steps.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e8f1f7] bg-[#eef0ff] p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-[#1ba9e8]/40">
            <h3 className="font-poppins text-xl font-semibold text-[#001f3f] mb-3">Results-Driven Approach</h3>
            <p className="font-inter text-base text-[#003366] leading-relaxed">
              Conversion-focused design with measurable KPIs to grow your brand, revenue, and retention.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e8f1f7] bg-[#e6f7ff] p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-[#1ba9e8]/40">
            <h3 className="font-poppins text-xl font-semibold text-[#001f3f] mb-3">Rapid Turnaround</h3>
            <p className="font-inter text-base text-[#003366] leading-relaxed">
              Agile sprints, tight feedback loops, and disciplined QA to ship faster without sacrificing quality.
            </p>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section id="services">
        <Services />
      </section>

      {/* Testimonials & Stats */}
      <section id="testimonials">
        <Testimonials />
      </section>

      {/* Featured Projects */}
      <section id="projects">
        <Projects />
      </section>

      {/* Latest Blogs */}
      <section id="blogs">
        <Blogs />
      </section>

      {/* Contact Form */}
      <section id="contact">
        <ContactForm />
      </section>
    </div>
  );
}
