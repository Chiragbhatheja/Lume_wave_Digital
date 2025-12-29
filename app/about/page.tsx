import About from '@/components/About';
import { generateMetadata as genMeta } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export async function generateMetadata() {
  return genMeta('about');
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <About />
    </div>
  );
}
