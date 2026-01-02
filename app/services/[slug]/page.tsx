import { Metadata } from 'next';
import Link from 'next/link';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

interface ServiceDetail {
  id: string;
  title: string;
  slug?: string;
  subtitle?: string;
  overview?: string;
  description?: string;
  features?: Array<{ title: string; description: string }>;
  benefits?: string[];
  process?: Array<{ step: number; title: string; description: string }>;
  caseStudies?: Array<{ title: string; description: string; result: string }>;
  faq?: Array<{ question: string; answer: string }>;
  image?: string;
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

async function getServices(): Promise<ServiceDetail[]> {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '');

  const res = await fetch(`${base}/api/services`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch services');
  }
  return res.json();
}

async function getServiceBySlug(slug: string): Promise<ServiceDetail | null> {
  const services = await getServices();
  return (
    services.find(s => s.slug === slug) ||
    services.find(s => slugify(s.title) === slug) ||
    null
  );
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  return {
    title: `${service?.title || 'Service'} - LumeWave Digital`,
    description: service?.overview || service?.description || '',
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#f5f9fc] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#001f3f] mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-6">The service you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="inline-block px-6 py-3 bg-[#1ba9e8] text-white rounded-lg hover:bg-[#0a66a9]">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-[#f5f9fc] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#001f3f] mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-6">The service you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="inline-block px-6 py-3 bg-[#1ba9e8] text-white rounded-lg hover:bg-[#0a66a9]">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#001f3f] to-[#003366] text-white pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/services" className="text-[#1ba9e8] hover:text-white mb-4 inline-block">
            ← Back to Services
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold font-poppins mb-4">{service.title}</h1>
          <p className="text-xl text-gray-300 max-w-2xl">{service.subtitle}</p>
        </div>
      </section>

      {/* Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">{service.overview}</p>
      </section>

      {/* Features */}
      {service.features && service.features.length > 0 && (
        <section className="bg-[#f5f9fc] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold font-poppins text-[#001f3f] mb-12">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.features.map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold text-[#001f3f] mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      {service.benefits && service.benefits.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-4xl font-bold font-poppins text-[#001f3f] mb-12">Why Choose This Service?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {service.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[#1ba9e8] flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">
                  ✓
                </div>
                <p className="text-gray-700 pt-1">{benefit}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Process */}
      {service.process && service.process.length > 0 && (
        <section className="bg-[#f5f9fc] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold font-poppins text-[#001f3f] mb-12">Our Process</h2>
            <div className="space-y-6">
              {service.process.map((item, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="w-16 h-16 rounded-full bg-[#1ba9e8] text-white flex items-center justify-center flex-shrink-0 font-bold text-xl">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-[#001f3f] mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-[#1ba9e8] to-[#0a66a9] rounded-3xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold font-poppins mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">Let&apos;s discuss how this service can help your business grow.</p>
          <Link href="/contact" className="inline-block px-8 py-4 bg-white text-[#1ba9e8] font-semibold rounded-full hover:bg-gray-100 transition-colors">
            Get Free Consultation
          </Link>
        </div>
      </section>

      {/* FAQ */}
      {service.faq && service.faq.length > 0 && (
        <section className="bg-[#f5f9fc] py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold font-poppins text-[#001f3f] mb-12">FAQ</h2>
            <div className="space-y-6">
              {service.faq.map((item, idx) => (
                <details key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 group">
                  <summary className="cursor-pointer font-semibold text-[#001f3f] flex items-center justify-between">
                    {item.question}
                    <span className="transform group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-gray-600 mt-4">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
