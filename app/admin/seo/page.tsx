"use client";

import { useState, useEffect } from 'react';

interface SEOPageData {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

interface SEOData {
  [key: string]: SEOPageData;
}

export default function SEOAdminPanel() {
  const [seoData, setSeoData] = useState<SEOData>({});
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [formData, setFormData] = useState<SEOPageData>({
    title: '',
    description: '',
    keywords: '',
    ogImage: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchSEOData();
  }, []);

  const fetchSEOData = async () => {
    try {
      const response = await fetch('/api/seo');
      const data = await response.json();
      setSeoData(data);
      
      // Set first page as selected by default
      const firstPage = Object.keys(data)[0];
      if (firstPage) {
        setSelectedPage(firstPage);
        setFormData(data[firstPage]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching SEO data:', error);
      setMessage({ type: 'error', text: 'Failed to load SEO data' });
      setLoading(false);
    }
  };

  const handlePageChange = (page: string) => {
    setSelectedPage(page);
    setFormData(seoData[page]);
    setMessage(null);
  };

  const handleInputChange = (field: keyof SEOPageData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const updatedData = {
        ...seoData,
        [selectedPage]: formData,
      };

      const response = await fetch('/api/seo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();

      if (response.ok) {
        setSeoData(updatedData);
        setMessage({ type: 'success', text: 'SEO data saved successfully! Changes will appear on next page load.' });
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to save SEO data' });
      }
    } catch (error) {
      console.error('Error saving SEO data:', error);
      setMessage({ type: 'error', text: 'Failed to save SEO data' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1ba9e8] mx-auto mb-4"></div>
            <p className="text-[#00407a] font-inter">Loading SEO Manager...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-poppins text-4xl font-bold text-[#001f3f] mb-2">
          SEO Management
        </h1>
        <p className="font-inter text-[#003366]">
          Update SEO metadata for all pages without touching code
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar - Page List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-[#e8f1f7] p-4 sticky top-8">
            <h2 className="font-poppins font-semibold text-[#001f3f] mb-4">Pages</h2>
            <div className="space-y-2">
              {Object.keys(seoData).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all font-inter text-sm ${
                    selectedPage === page
                      ? 'bg-gradient-to-r from-[#1ba9e8] to-[#0a66a9] text-white shadow-md'
                      : 'bg-[#f7f9fc] text-[#00407a] hover:bg-[#e8f1f7]'
                  }`}
                >
                  {page === 'home' ? '🏠 Home' : `📄 ${page.charAt(0).toUpperCase() + page.slice(1)}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Form */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-[#e8f1f7] p-6">
            <div className="mb-6">
              <h2 className="font-poppins text-2xl font-semibold text-[#001f3f] mb-1">
                {selectedPage === 'home' ? 'Home Page' : selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)}
              </h2>
              <p className="font-inter text-sm text-[#00407a]/60">
                Edit SEO metadata for this page
              </p>
            </div>

            {message && (
              <div
                className={`mb-6 p-4 rounded-lg font-inter text-sm ${
                  message.type === 'success'
                    ? 'bg-green-50 border border-green-200 text-green-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}
              >
                {message.type === 'success' ? '✓' : '✗'} {message.text}
              </div>
            )}

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block font-inter font-medium text-[#001f3f] mb-2">
                  Page Title
                  <span className="text-[#FF4B4B] ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-3 border border-[#e8f1f7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ba9e8] font-inter"
                  placeholder="Enter page title (50-60 characters)"
                />
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs text-[#00407a]/60 font-inter">
                    {formData.title.length} characters
                  </p>
                  <p className={`text-xs font-semibold ${formData.title.length >= 50 && formData.title.length <= 60 ? 'text-green-600' : 'text-amber-600'}`}>
                    {formData.title.length >= 50 && formData.title.length <= 60 ? '✓ Good' : formData.title.length < 50 ? 'Too short' : 'Too long'}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-inter font-medium text-[#001f3f] mb-2">
                  Meta Description
                  <span className="text-[#FF4B4B] ml-1">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-[#e8f1f7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ba9e8] font-inter resize-none"
                  placeholder="Enter meta description (150-160 characters)"
                />
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs text-[#00407a]/60 font-inter">
                    {formData.description.length} characters
                  </p>
                  <p className={`text-xs font-semibold ${formData.description.length >= 150 && formData.description.length <= 160 ? 'text-green-600' : 'text-amber-600'}`}>
                    {formData.description.length >= 150 && formData.description.length <= 160 ? '✓ Good' : formData.description.length < 150 ? 'Too short' : 'Too long'}
                  </p>
                </div>
              </div>

              {/* Keywords */}
              <div>
                <label className="block font-inter font-medium text-[#001f3f] mb-2">
                  Keywords
                </label>
                <input
                  type="text"
                  value={formData.keywords || ''}
                  onChange={(e) => handleInputChange('keywords', e.target.value)}
                  className="w-full px-4 py-3 border border-[#e8f1f7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ba9e8] font-inter"
                  placeholder="keyword1, keyword2, keyword3"
                />
                <p className="mt-1 text-xs text-[#00407a]/60 font-inter">
                  Separate keywords with commas
                </p>
              </div>

              {/* OG Image */}
              <div>
                <label className="block font-inter font-medium text-[#001f3f] mb-2">
                  OpenGraph Image URL
                </label>
                <input
                  type="text"
                  value={formData.ogImage || ''}
                  onChange={(e) => handleInputChange('ogImage', e.target.value)}
                  className="w-full px-4 py-3 border border-[#e8f1f7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1ba9e8] font-inter"
                  placeholder="/og-image.jpg or https://..."
                />
                <p className="mt-1 text-xs text-[#00407a]/60 font-inter">
                  Image shown when sharing on social media (1200x630px recommended)
                </p>
              </div>

              {/* Preview */}
              <div className="border-t border-[#e8f1f7] pt-6">
                <h3 className="font-poppins font-semibold text-[#001f3f] mb-3">
                  Search Result Preview
                </h3>
                <div className="bg-gradient-to-b from-[#f7f9fc] to-[#f0f4f9] p-4 rounded-lg border border-[#e8f1f7]">
                  <div className="text-[#1a0dab] text-lg font-inter hover:underline cursor-pointer">
                    {formData.title || 'Page Title'}
                  </div>
                  <div className="text-[#006621] text-xs mt-1 font-inter">
                    {process.env.NEXT_PUBLIC_BASE_URL || 'https://yoursite.com'}/
                    {selectedPage === 'home' ? '' : selectedPage}
                  </div>
                  <div className="text-[#545454] text-sm mt-2 font-inter">
                    {formData.description || 'Meta description will appear here...'}
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSave}
                  disabled={saving || !formData.title || !formData.description}
                  className={`flex-1 px-6 py-3 rounded-lg font-semibold font-inter transition-all ${
                    saving || !formData.title || !formData.description
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#1ba9e8] to-[#0a66a9] hover:shadow-lg text-white shadow-md'
                  }`}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={fetchSEOData}
                  className="px-6 py-3 border-2 border-[#e8f1f7] rounded-lg font-semibold font-inter text-[#00407a] hover:bg-[#f7f9fc] transition-all"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
