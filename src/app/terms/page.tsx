import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Haven Reformer Studio",
};

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24 px-6 lg:px-16 py-12 lg:py-16">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="label-text text-[10px] text-warm-gray hover:text-pink-hot transition-colors mb-6 inline-flex items-center gap-2 tracking-[0.2em]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back Home
          </Link>
          <h1 className="heading-xl text-3xl sm:text-4xl text-charcoal mt-4 mb-8">Terms of Service</h1>
          <div className="prose prose-warm-gray max-w-none space-y-6 body-text text-charcoal-light text-[15px]">
            <p><strong>Last updated:</strong> April 2026</p>

            <h2 className="heading-md text-xl text-charcoal mt-8 mb-3">Class Bookings</h2>
            <p>All class bookings are made through our Momence scheduling platform. By booking a class, you agree to arrive on time and follow studio guidelines. Classes have limited capacity (6 reformers) and spots are first-come, first-served.</p>

            <h2 className="heading-md text-xl text-charcoal mt-8 mb-3">Cancellation Policy</h2>
            <p>We ask that you cancel or reschedule at least 12 hours before your scheduled class. Late cancellations or no-shows may result in forfeiture of the class credit. We understand life happens, so please reach out if you have extenuating circumstances.</p>

            <h2 className="heading-md text-xl text-charcoal mt-8 mb-3">Memberships</h2>
            <p>Monthly memberships are billed on a recurring basis. You may cancel your membership at any time. Class packs are valid for 90 days from purchase. Unused classes are non-refundable after expiration.</p>

            <h2 className="heading-md text-xl text-charcoal mt-8 mb-3">Assumption of Risk</h2>
            <p>Participation in reformer-based fitness classes involves inherent physical risks. By attending classes at Haven Reformer Studio, you acknowledge these risks and confirm that you are physically able to participate. Please consult your physician before beginning any new exercise program.</p>

            <h2 className="heading-md text-xl text-charcoal mt-8 mb-3">Gift Cards</h2>
            <p>Gift cards are non-refundable and can be used for class bookings or boutique purchases. Gift cards do not expire.</p>

            <h2 className="heading-md text-xl text-charcoal mt-8 mb-3">Contact</h2>
            <p>Haven Reformer Studio &amp; Boutique<br />2908 N Main St, Unit 100 (back unit)<br />Fuquay-Varina, NC 27526<br />Email: hello.adir.active@gmail.com</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
