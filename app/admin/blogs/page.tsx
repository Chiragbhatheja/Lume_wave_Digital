'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  content?: string;
}

export default function BlogsAdmin() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    image: '',
    content: '',
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingBlog) {
        await fetch('/api/blogs', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, id: editingBlog.id }),
        });
      } else {
        await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }

      fetchBlogs();
      resetForm();
    } catch (error) {
      console.error('Failed to save blog:', error);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      category: blog.category,
      date: blog.date,
      image: blog.image,
      content: blog.content || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      await fetch('/api/blogs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchBlogs();
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      category: '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      image: '',
      content: '',
    });
    setEditingBlog(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f9fc]">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="text-[#003366] hover:text-[#1ba9e8]">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-[#001f3f]">Manage Blogs</h1>
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
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-[#1ba9e8] hover:bg-[#0a66a9] text-white font-semibold rounded-lg transition-colors"
          >
            {showForm ? 'Cancel' : '+ Add New Blog'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
            <h2 className="text-xl font-bold text-[#001f3f] mb-4">
              {editingBlog ? 'Edit Blog' : 'Add New Blog'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#001f3f] mb-2">Blog Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#1ba9e8] focus:ring-2 focus:ring-[#1ba9e8]/20 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#001f3f] mb-2">Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#1ba9e8] focus:ring-2 focus:ring-[#1ba9e8]/20 outline-none"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#001f3f] mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#1ba9e8] focus:ring-2 focus:ring-[#1ba9e8]/20 outline-none"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Technology">Technology</option>
                    <option value="Business">Business</option>
                    <option value="Design">Design</option>
                    <option value="Development">Development</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#001f3f] mb-2">Date</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#1ba9e8] focus:ring-2 focus:ring-[#1ba9e8]/20 outline-none"
                    placeholder="Dec 9, 2024"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#001f3f] mb-2">Image Path</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#1ba9e8] focus:ring-2 focus:ring-[#1ba9e8]/20 outline-none"
                  placeholder="/blog-image.jpg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#001f3f] mb-2">
                  Full Blog Content (HTML supported)
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={20}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#1ba9e8] focus:ring-2 focus:ring-[#1ba9e8]/20 outline-none font-mono text-sm"
                  placeholder="<h2>Your Heading</h2>&#10;<p>Your content here...</p>&#10;<h3>Subheading</h3>&#10;<p>More content...</p>"
                />
                <p className="text-xs text-gray-500 mt-2">
                  You can use HTML tags: &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;, etc.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#1ba9e8] hover:bg-[#0a66a9] text-white font-semibold rounded-lg transition-colors"
                >
                  {editingBlog ? 'Update Blog' : 'Create Blog'}
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
            <h2 className="text-xl font-bold text-[#001f3f] mb-4">All Blogs ({blogs.length})</h2>
            
            {isLoading ? (
              <p className="text-center py-8 text-gray-500">Loading...</p>
            ) : blogs.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No blogs yet. Add your first blog post!</p>
            ) : (
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:border-[#1ba9e8] transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#001f3f] mb-1">{blog.title}</h3>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm text-[#1ba9e8]">{blog.category}</span>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-gray-500">{blog.date}</span>
                      </div>
                      <p className="text-sm text-gray-600">{blog.excerpt}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm"
                      >
                        Delete
                      </button>
                    </div>
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
