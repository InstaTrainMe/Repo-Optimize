import { Navigation } from "@/components/navigation";
import { Link } from "wouter";

function SEOHead() {
  return (
    <>
      <title>Terms & Conditions - InstaTrainMe® | User Agreement</title>
      <meta name="description" content="Read the Terms & Conditions for using InstaTrainMe®. Understand your rights and responsibilities when using our fitness platform." />
    </>
  );
}

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <Navigation />
      
      <section className="relative py-16 px-5 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-terms-title">
            Terms & Conditions
          </h1>
          <p className="text-xl text-white/90">
            Last Updated: December 2025
          </p>
        </div>
      </section>

      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
          <div className="space-y-8 text-foreground">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to InstaTrainMe<sup>&reg;</sup>. By accessing or using our mobile applications, website, or services (collectively, the "Platform"), you agree to be bound by these Terms & Conditions ("Terms"). If you do not agree to these Terms, please do not use our Platform.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                InstaTrainMe<sup>&reg;</sup> reserves the right to modify these Terms at any time. We will notify users of significant changes through the Platform or via email. Your continued use of the Platform after any modifications constitutes acceptance of the updated Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Description of Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                InstaTrainMe<sup>&reg;</sup> is a fitness marketplace platform that connects users with certified personal trainers, yoga instructors, sports coaches, and other fitness professionals ("Trainers"). Our Platform enables users to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li>Search for and discover qualified fitness professionals</li>
                <li>Book on-demand or scheduled training sessions</li>
                <li>Communicate with trainers through secure messaging</li>
                <li>Process payments for training services</li>
                <li>Rate and review training experiences</li>
                <li>Access virtual and in-person training options</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                InstaTrainMe<sup>&reg;</sup> acts as an intermediary platform and is not a party to the agreement between users and trainers. Trainers are independent contractors, not employees of InstaTrainMe<sup>&reg;</sup>.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. User Accounts</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To use certain features of InstaTrainMe<sup>&reg;</sup>, you must create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify InstaTrainMe<sup>&reg;</sup> immediately of any unauthorized use</li>
                <li>Be at least 18 years of age to create an account</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                InstaTrainMe<sup>&reg;</sup> reserves the right to suspend or terminate accounts that violate these Terms or for any other reason at our discretion.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Trainer Requirements</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Trainers using InstaTrainMe<sup>&reg;</sup> must:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Hold valid certifications from recognized fitness organizations</li>
                <li>Maintain appropriate liability insurance where required by law</li>
                <li>Complete our verification and background check process</li>
                <li>Provide accurate information about qualifications and services</li>
                <li>Comply with all applicable local, state, and federal laws</li>
                <li>Maintain professional conduct during all interactions with users</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                InstaTrainMe<sup>&reg;</sup> conducts verification checks but does not guarantee the accuracy of trainer credentials. Users should exercise their own judgment when selecting trainers.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Booking and Payments</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When booking sessions through InstaTrainMe<sup>&reg;</sup>:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>All prices are displayed in U.S. dollars unless otherwise indicated</li>
                <li>Payment is required at the time of booking or upon session completion, as specified</li>
                <li>InstaTrainMe<sup>&reg;</sup> charges a service fee for facilitating transactions</li>
                <li>Trainers set their own rates and availability</li>
                <li>Refunds and cancellations are subject to our Cancellation Policy</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Payments are processed through secure third-party payment processors. InstaTrainMe<sup>&reg;</sup> does not store complete payment card information on our servers.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Cancellation Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our cancellation policy is designed to be fair to both users and trainers:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>24+ hours before session:</strong> Full refund available</li>
                <li><strong>12-24 hours before session:</strong> 50% refund may be issued</li>
                <li><strong>Less than 12 hours:</strong> No refund, unless trainer cancels</li>
                <li><strong>Trainer cancellation:</strong> Full refund issued automatically</li>
                <li><strong>No-shows:</strong> May result in fees or account restrictions</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                InstaTrainMe<sup>&reg;</sup> reserves the right to modify the cancellation policy and will notify users of changes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. User Conduct</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When using InstaTrainMe<sup>&reg;</sup>, you agree NOT to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Harass, threaten, or discriminate against other users or trainers</li>
                <li>Post false, misleading, or defamatory content</li>
                <li>Use the Platform for any unlawful or fraudulent purpose</li>
                <li>Attempt to circumvent platform payments or fees</li>
                <li>Share your account credentials with others</li>
                <li>Collect or harvest user information without consent</li>
                <li>Interfere with the proper functioning of the Platform</li>
                <li>Impersonate any person or entity</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Violation of these guidelines may result in immediate account suspension or termination.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Health and Safety Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                InstaTrainMe<sup>&reg;</sup> provides a platform to connect users with fitness professionals. Before engaging in any fitness program:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li>Consult with a qualified healthcare provider before starting any exercise program</li>
                <li>Inform your trainer of any medical conditions, injuries, or limitations</li>
                <li>Understand that physical activity involves inherent risks</li>
                <li>Take responsibility for your own health and safety during sessions</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                InstaTrainMe<sup>&reg;</sup> is not liable for any injuries, health issues, or damages arising from training sessions booked through our Platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content, features, and functionality of InstaTrainMe<sup>&reg;</sup>, including but not limited to text, graphics, logos, icons, images, software, and trademarks, are the exclusive property of InstaTrainMe<sup>&reg;</sup> or its licensors. You may not reproduce, distribute, modify, or create derivative works without our prior written consent.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                The InstaTrainMe<sup>&reg;</sup> name and logo are registered trademarks. Unauthorized use is strictly prohibited.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, INSTATRAINME<sup>&reg;</sup> SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE PLATFORM.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                InstaTrainMe<sup>&reg;</sup>'s total liability for any claims arising from these Terms or your use of the Platform shall not exceed the amount you paid to InstaTrainMe<sup>&reg;</sup> in the 12 months preceding the claim.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to indemnify, defend, and hold harmless InstaTrainMe<sup>&reg;</sup>, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including attorney's fees) arising from your use of the Platform, violation of these Terms, or infringement of any third-party rights.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">12. Dispute Resolution</h2>
              <p className="text-muted-foreground leading-relaxed">
                Any disputes arising from these Terms or your use of InstaTrainMe<sup>&reg;</sup> shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall take place in Wilmington, Delaware, and the arbitrator's decision shall be final and binding.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                You waive any right to participate in a class action lawsuit or class-wide arbitration against InstaTrainMe<sup>&reg;</sup>.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">13. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions. Any legal action must be brought in the state or federal courts located in Delaware.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">14. Severability</h2>
              <p className="text-muted-foreground leading-relaxed">
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">15. Entire Agreement</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms, together with our Privacy Policy and any other policies referenced herein, constitute the entire agreement between you and InstaTrainMe<sup>&reg;</sup> regarding your use of the Platform and supersede all prior agreements.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">16. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-foreground font-semibold">InstaTrainMe<sup>&reg;</sup></p>
                <p className="text-muted-foreground">901 N Market St, Suite 100</p>
                <p className="text-muted-foreground">Wilmington, DE 19801</p>
                <p className="text-muted-foreground">Email: legal@instatrainme.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-5 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">
            Also see our <Link href="/privacy" className="text-[#667eea] hover:underline">Privacy Policy</Link> for information about how we protect your data.
          </p>
        </div>
      </section>
    </div>
  );
}
