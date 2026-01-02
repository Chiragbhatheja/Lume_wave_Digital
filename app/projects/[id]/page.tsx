import type { Metadata } from 'next';
import Link from 'next/link';

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface Project {
  id: string;
  name: string;
  category?: string;
  description?: string;
  client?: string;
  duration?: string;
  technologies?: string[];
  image?: string;
  fullContent?: string;
}

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  // Default to relative URLs for development and production
  return '';
}

async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${getBaseUrl()}/api/projects`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

async function getProjectById(id: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find(p => p.id === id) || null;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);
  return {
    title: project ? `${project.name} | Projects | LWd` : 'Project Not Found | LWd',
    description: project?.description || undefined,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#f5f9fc] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#001f3f] mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-6">The project you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/projects" className="inline-block px-6 py-3 bg-[#1ba9e8] text-white rounded-lg hover:bg-[#0a66a9]">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }
  const techList = project.technologies?.length ? project.technologies : null;
  const contentHtml = project.fullContent || project.description || '';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f9fc] to-white">
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link href="/projects" className="inline-flex items-center text-[#1ba9e8] hover:text-[#0a66a9] font-semibold mb-8 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Projects
        </Link>

        <header className="mb-10">
          {project.category && (
            <div className="mb-4">
              <span className="inline-block px-4 py-1.5 bg-[#1ba9e8]/10 text-[#1ba9e8] rounded-full text-sm font-semibold">
                {project.category}
              </span>
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-[#001f3f] mb-6 leading-tight">
            {project.name}
          </h1>

          {(project.client || project.duration || techList) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white rounded-xl shadow-md border border-gray-100">
              {project.client && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Client</h3>
                  <p className="text-lg text-[#001f3f] font-medium">{project.client}</p>
                </div>
              )}
              {project.duration && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Duration</h3>
                  <p className="text-lg text-[#001f3f] font-medium">{project.duration}</p>
                </div>
              )}
              {techList && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {techList.map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-[#f5f9fc] text-[#001f3f] rounded-md text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </header>

        {project.image && (
          <div className="mb-10 rounded-2xl overflow-hidden shadow-xl">
            <img src={project.image} alt={project.name} className="w-full h-[500px] object-cover" />
          </div>
        )}

        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: contentHtml }} />

        <div className="mt-12 pt-8 border-top border-gray-200 flex flex-col sm:flex-row gap-4">
          <Link href="/projects" className="inline-block px-8 py-3 bg-[#1ba9e8] text-white rounded-lg font-semibold hover:bg-[#0a66a9] transition-colors shadow-lg text-center">
            View More Projects
          </Link>
          <Link href="/contact" className="inline-block px-8 py-3 bg-white text-[#1ba9e8] border-2 border-[#1ba9e8] rounded-lg font-semibold hover:bg-[#1ba9e8] hover:text-white transition-colors text-center">
            Start Your Project
          </Link>
        </div>
      </article>
    </div>
  );
}
