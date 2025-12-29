import ContactForm from '@/components/ContactForm';
import { generateMetadata as genMeta } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export async function generateMetadata() {
  return genMeta('contact');
}

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20">
      <ContactForm />
    </div>
  );
}
