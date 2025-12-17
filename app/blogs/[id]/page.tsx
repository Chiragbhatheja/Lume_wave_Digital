import type { Metadata } from 'next';
import Link from 'next/link';

interface BlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  category?: string;
  date?: string;
  author?: string;
  publishDate?: string;
  image?: string;
  content?: string;
}

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

async function getBlogs(): Promise<Blog[]> {
  const res = await fetch(`${getBaseUrl()}/api/blogs`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

async function getBlogById(id: string): Promise<Blog | null> {
  const blogs = await getBlogs();
  return blogs.find(b => b.id === id) || null;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { id } = await params;
  const blog = await getBlogById(id);
  return {
    title: blog ? `${blog.title} | LWd` : 'Blog Not Found | LWd',
    description: blog?.excerpt || undefined,
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#f5f9fc] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#001f3f] mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/#blogs" className="inline-block px-6 py-3 bg-[#1ba9e8] text-white rounded-lg hover:bg-[#0a66a9]">
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const author = blog.author || 'LWd Team';
  const published = blog.publishDate || blog.date || '';
  const contentHtml = blog.content || blog.excerpt || '';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f9fc] to-white">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link href="/#blogs" className="inline-flex items-center text-[#1ba9e8] hover:text-[#0a66a9] font-semibold mb-8 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blogs
        </Link>

        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#001f3f] mb-4 leading-tight">
            {blog.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-600">
            <span className="font-medium">{author}</span>
            {published && <span className="text-gray-400">•</span>}
            {published && <time dateTime={published}>{published}</time>}
          </div>
        </header>

        {blog.image && (
          <div className="mb-10 rounded-2xl overflow-hidden shadow-xl">
            <img src={blog.image} alt={blog.title} className="w-full h-[400px] object-cover" />
          </div>
        )}

        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: contentHtml }} />

        <div className="mt-12 pt-8 border-top border-gray-200">
          <Link href="/#blogs" className="inline-block px-8 py-3 bg-[#1ba9e8] text-white rounded-lg font-semibold hover:bg-[#0a66a9] transition-colors shadow-lg">
            Read More Articles
          </Link>
        </div>
      </article>
    </div>
  );
}
