'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  gradient: string;
  fullContent?: string;
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    image: '',
    gradient: 'from-[#FF6B6B]/20 to-[#FF8E8E]/10',
    fullContent: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingProject) {
        // Update existing project
        await fetch('/api/projects', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, id: editingProject.id }),
        });
      } else {
        // Create new project
        await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }

      fetchProjects();
      resetForm();
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      category: project.category,
      description: project.description,
      image: project.image,
      gradient: project.gradient,
      fullContent: project.fullContent || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await fetch('/api/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchProjects();
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      description: '',
      image: '',
      gradient: 'from-[#FF6B6B]/20 to-[#FF8E8E]/10',
      fullContent: '',
    });
    setEditingProject(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f9fc]">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="text-[#003366] hover:text-[#1ba9e8]">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-[#001f3f]">Manage Projects</h1>
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
        {/* Add New Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-[#1ba9e8] hover:bg-[#0a66a9] text-white font-semibold rounded-lg transition-colors"
          >
            {showForm ? 'Cancel' : '+ Add New Project'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
            <h2 className="text-xl font-bold text-[#001f3f] mb-4">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#001f3f] mb-2">Project Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#1ba9e8] focus:ring-2 focus:ring-[#1ba9e8]/20 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#001f3f] mb-2">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#1ba9e8] focus:ring-2 focus:ring-[#1ba9e8]/20 outline-none"
                  required
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
                <label className="block text-sm font-semibold text-[#001f3f] mb-2">Image Path</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#1ba9e8] focus:ring-2 focus:ring-[#1ba9e8]/20 outline-none"
                  placeholder="/project-image.jpg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#001f3f] mb-2">Gradient Classes</label>
                <select
                  value={formData.gradient}
                  onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#1ba9e8] focus:ring-2 focus:ring-[#1ba9e8]/20 outline-none"
                >
                  <option value="from-[#FF6B6B]/20 to-[#FF8E8E]/10">Red</option>
                  <option value="from-[#4ECDC4]/20 to-[#6DD5CD]/10">Teal</option>
                  <option value="from-[#FFD93D]/20 to-[#FFE566]/10">Yellow</option>
                  <option value="from-[#A8E6CF]/20 to-[#B9EADB]/10">Green</option>
                  <option value="from-[#95B8FF]/20 to-[#A8C5FF]/10">Blue</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#001f3f] mb-2">
                  Full Project Content (HTML supported)
                </label>
                <textarea
                  value={formData.fullContent}
                  onChange={(e) => setFormData({ ...formData, fullContent: e.target.value })}
                  rows={15}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#1ba9e8] focus:ring-2 focus:ring-[#1ba9e8]/20 outline-none font-mono text-sm"
                  placeholder="<h2>Project Name</h2>&#10;<p>Project description...</p>&#10;<h3>Features</h3>&#10;<ul><li>Feature 1</li></ul>"
                />
                <p className="text-xs text-gray-500 mt-2">
                  You can use HTML tags: &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, etc.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#1ba9e8] hover:bg-[#0a66a9] text-white font-semibold rounded-lg transition-colors"
                >
                  {editingProject ? 'Update Project' : 'Create Project'}
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

        {/* Projects List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#001f3f] mb-4">All Projects ({projects.length})</h2>
            
            {isLoading ? (
              <p className="text-center py-8 text-gray-500">Loading...</p>
            ) : projects.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No projects yet. Add your first project!</p>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:border-[#1ba9e8] transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#001f3f] mb-1">{project.name}</h3>
                      <p className="text-sm text-[#1ba9e8] mb-2">{project.category}</p>
                      <p className="text-sm text-gray-600">{project.description}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(project)}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
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
