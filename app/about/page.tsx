import About from '@/components/About';
import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta('about');

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <About />
    </div>
  );
}
