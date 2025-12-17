'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface Service {
  id: string;
  title: string;
  description: string;
  number: string;
  slug?: string;
  subtitle?: string;
  overview?: string;
  features?: Array<{ title: string; description: string }>;
  benefits?: string[];
  process?: Array<{ step: number; title: string; description: string }>;
  caseStudies?: Array<{ title: string; description: string; result: string }>;
  faq?: Array<{ question: string; answer: string }>;
  image?: string;
}

export default function ServicesAdmin() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subtitle: '',
    overview: '',
    featuresText: '',
    benefitsText: '',
    processText: '',
    caseStudiesText: '',
    faqText: '',
    image: '',
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingService) return;

    try {
      await fetch('/api/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          id: editingService.id,
          number: editingService.number,
          slug: editingService.slug,
          features: parseFeatures(formData.featuresText),
          benefits: parseLines(formData.benefitsText),
          process: parseProcess(formData.processText),
          caseStudies: parseCaseStudies(formData.caseStudiesText),
          faq: parseFaq(formData.faqText),
        }),
      });

      fetchServices();
      resetForm();
    } catch (error) {
      console.error('Failed to save service:', error);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      subtitle: service.subtitle || '',
      overview: service.overview || '',
      featuresText: stringifyFeatures(service.features),
      benefitsText: stringifyLines(service.benefits),
      processText: stringifyProcess(service.process),
      caseStudiesText: stringifyCaseStudies(service.caseStudies),
      faqText: stringifyFaq(service.faq),
      image: service.image || '',
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      subtitle: '',
      overview: '',
      featuresText: '',
      benefitsText: '',
      processText: '',
      caseStudiesText: '',
      faqText: '',
      image: '',
    });
    setEditingService(null);
  };

  const stringifyLines = (list?: string[]) => (list || []).join('\n');
  const stringifyFeatures = (features?: Array<{ title: string; description: string }>) =>
    (features || []).map(f => `${f.title} | ${f.description}`).join('\n');
  const stringifyProcess = (process?: Array<{ step: number; title: string; description: string }>) =>
    (process || []).map(p => `${p.step} | ${p.title} | ${p.description}`).join('\n');
  const stringifyCaseStudies = (
    cs?: Array<{ title: string; description: string; result: string }>
  ) => (cs || []).map(c => `${c.title} | ${c.description} | ${c.result}`).join('\n');
  const stringifyFaq = (faq?: Array<{ question: string; answer: string }>) =>
    (faq || []).map(q => `${q.question} | ${q.answer}`).join('\n');

  const parseLines = (text: string) =>
    text
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);

  const parseFeatures = (text: string) =>
    parseLines(text).map(line => {
      const [title, description] = line.split('|').map(part => part.trim());
      return { title: title || '', description: description || '' };
    });

  const parseProcess = (text: string) =>
    parseLines(text).map(line => {
      const [stepStr, title, description] = line.split('|').map(part => part.trim());
      return { step: Number(stepStr) || 0, title: title || '', description: description || '' };
    });

  const parseCaseStudies = (text: string) =>
    parseLines(text).map(line => {
      const [title, description, result] = line.split('|').map(part => part.trim());
      return { title: title || '', description: description || '', result: result || '' };
    });

  const parseFaq = (text: string) =>
    parseLines(text).map(line => {
      const [question, answer] = line.split('|').map(part => part.trim());
      return { question: question || '', answer: answer || '' };
    });

  return (
    <div className="min-h-screen bg-[#f5f9fc]">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="text-[#003366] hover:text-[#1ba9e8]">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-[#001f3f]">Manage Services</h1>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {editingService && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
            <h2 className="text-xl font-bold text-[#001f3f] mb-4">Edit Service</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#001f3f] mb-2">Service Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#1ba9e8] focus:ring-2 focus:ring-[#1ba9e8]/20 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#001f3f] mb-2">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#1ba9e8] focus:ring-2 focus:ring-[#1ba9e8]/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#001f3f] mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#1ba9e8] focus:ring-2 focus:ring-[#1ba9e8]/20 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#001f3f] mb-2">Overview</label>
                <textarea
                  value={formData.overview}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#1ba9e8] focus:ring-2 focus:ring-[#1ba9e8]/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#001f3f] mb-2">Key Features (one per line: Title | Description)</label>
                <textarea
                  value={formData.featuresText}
                  onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#1ba9e8] focus:ring-2 focus:ring-[#1ba9e8]/20 outline-none"
                  placeholder="Responsive Design | Works flawlessly on all devices"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#001f3f] mb-2">Benefits (one per line)</label>
                <textarea
                  value={formData.benefitsText}
                  onChange={(e) => setFormData({ ...formData, benefitsText: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#1ba9e8] focus:ring-2 focus:ring-[#1ba9e8]/20 outline-none"
                  placeholder="Increase conversion rates by up to 300%"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#001f3f] mb-2">Process (one per line: StepNumber | Title | Description)</label>
                <textarea
                  value={formData.processText}
                  onChange={(e) => setFormData({ ...formData, processText: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#1ba9e8] focus:ring-2 focus:ring-[#1ba9e8]/20 outline-none"
                  placeholder="1 | Discovery & Strategy | We dive deep into your business"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#001f3f] mb-2">Case Studies (one per line: Title | Description | Result)</label>
                <textarea
                  value={formData.caseStudiesText}
                  onChange={(e) => setFormData({ ...formData, caseStudiesText: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#1ba9e8] focus:ring-2 focus:ring-[#1ba9e8]/20 outline-none"
                  placeholder="Product Launch Video | Created promotional video | 100K+ views"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#001f3f] mb-2">FAQ (one per line: Question | Answer)</label>
                <textarea
                  value={formData.faqText}
                  onChange={(e) => setFormData({ ...formData, faqText: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#1ba9e8] focus:ring-2 focus:ring-[#1ba9e8]/20 outline-none"
                  placeholder="How long does it take? | Typically 6-12 weeks depending on scope"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#001f3f] mb-2">Hero/Image URL (optional)</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#1ba9e8] focus:ring-2 focus:ring-[#1ba9e8]/20 outline-none"
                  placeholder="/website-design.jpg"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#1ba9e8] hover:bg-[#0a66a9] text-white font-semibold rounded-lg transition-colors"
                >
                  Update Service
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#001f3f] mb-4">All Services ({services.length})</h2>
            
            {isLoading ? (
              <p className="text-center py-8 text-gray-500">Loading...</p>
            ) : (
              <div className="space-y-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:border-[#1ba9e8] transition-colors"
                  >
                    <div className="flex gap-4 flex-1">
                      <div className="w-10 h-10 rounded-full bg-[#1ba9e8] text-white flex items-center justify-center font-bold flex-shrink-0">
                        {service.number}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-[#001f3f] mb-1">{service.title}</h3>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleEdit(service)}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm ml-4"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
