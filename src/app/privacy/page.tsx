import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Haven Reformer Studio",
};

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24 px-6 lg:px-16 py-12 lg:py-16">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="label-text text-[10px] text-warm-gray hover:text-pink-hot transition-colors mb-6 inline-flex items-center gap-2 tracking-[0.2em]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back Home
          </Link>
          <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal mt-4 mb-8">Privacy Policy</h1>
          <div className="prose prose-warm-gray max-w-none space-y-6 body-text text-charcoal-light text-[15px]">
            <p><strong>Last updated:</strong> April 2026</p>

            <h2 className="heading-md text-xl text-charcoal mt-8 mb-3">Information We Collect</h2>
            <p>When you book a class or sign up for our newsletter, we collect your name, email address, and booking preferences. Payment information is processed securely through our booking partner, Momence, and is not stored on our servers.</p>

            <h2 className="heading-md text-xl text-charcoal mt-8 mb-3">How We Use Your Information</h2>
            <p>We use your information to process class bookings, send class confirmations and reminders, communicate studio updates and promotions (with your consent), and improve our services.</p>

            <h2 className="heading-md text-xl text-charcoal mt-8 mb-3">Third-Party Services</h2>
            <p>We use Momence for class booking and scheduling, Google Analytics for website analytics, and Vercel for website hosting. Each of these services has their own privacy policies governing how they handle your data.</p>

            <h2 className="heading-md text-xl text-charcoal mt-8 mb-3">Your Rights</h2>
            <p>You may request access to, correction of, or deletion of your personal information at any time by contacting us at hello.adir.active@gmail.com.</p>

            <h2 className="heading-md text-xl text-charcoal mt-8 mb-3">Contact</h2>
            <p>Haven Reformer Studio &amp; Boutique<br />2908 N Main St, Unit 100 (back unit)<br />Fuquay-Varina, NC 27526<br />Email: hello.adir.active@gmail.com<br />Text: (984) 205-9212</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
