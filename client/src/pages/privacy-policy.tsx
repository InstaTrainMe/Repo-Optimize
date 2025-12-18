import { useCanonical } from "@/hooks/useCanonical";
import { Navigation } from "@/components/navigation";
import { Link } from "wouter";

function SEOHead() {
  return (
    <>
      <title>Privacy Policy - InstaTrainMe® | Your Data Protection</title>
      <meta name="description" content="Learn how InstaTrainMe® protects your personal information and data. Our privacy policy outlines how we collect, use, and safeguard your data." />
    </>
  );
}

export default function PrivacyPolicy() {
  useCanonical("/privacy");
  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <Navigation />
      
      <section className="relative py-16 px-5 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-privacy-title">
            Privacy Policy
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
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to InstaTrainMe<sup>&reg;</sup>. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile applications and website (collectively, the "Platform").
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                By using InstaTrainMe<sup>&reg;</sup>, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our Platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect information that you provide directly to us when using InstaTrainMe<sup>&reg;</sup>:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Account Information:</strong> Name, email address, phone number, profile photo, and password when you create an account.</li>
                <li><strong>Profile Information:</strong> Fitness goals, health information (if voluntarily provided), location, and preferences.</li>
                <li><strong>Payment Information:</strong> Payment card details, billing address, and transaction history (processed securely through our payment providers).</li>
                <li><strong>Communications:</strong> Messages between users and trainers, feedback, and customer support inquiries.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our Platform, including session bookings, searches, and feature usage.</li>
                <li><strong>Device Information:</strong> Device type, operating system, unique device identifiers, and mobile network information.</li>
                <li><strong>Location Data:</strong> With your permission, we collect precise location data to connect you with nearby trainers.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                InstaTrainMe<sup>&reg;</sup> uses the collected information for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>To provide, maintain, and improve our Platform and services</li>
                <li>To connect users with certified personal trainers and fitness professionals</li>
                <li>To process payments and manage bookings</li>
                <li>To send you notifications about sessions, updates, and promotional offers</li>
                <li>To respond to your comments, questions, and customer service requests</li>
                <li>To monitor and analyze usage trends and preferences</li>
                <li>To detect, prevent, and address technical issues and fraudulent activity</li>
                <li>To comply with legal obligations and enforce our terms of service</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>With Trainers:</strong> When you book a session, relevant information is shared with your trainer to facilitate the service.</li>
                <li><strong>Service Providers:</strong> We work with third-party companies for payment processing, data analytics, email delivery, and cloud hosting.</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law, court order, or government request.</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, acquisition, or sale of company assets.</li>
                <li><strong>With Your Consent:</strong> We may share information with your explicit consent for other purposes.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                InstaTrainMe<sup>&reg;</sup> does not sell your personal information to third parties for marketing purposes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                InstaTrainMe<sup>&reg;</sup> implements appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, and regular security assessments. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information for as long as your account is active or as needed to provide you services. We may also retain and use your information to comply with legal obligations, resolve disputes, and enforce our agreements. When you delete your account, we will delete or anonymize your personal information within a reasonable timeframe, unless retention is required by law.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Your Rights and Choices</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information.</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal requirements.</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time.</li>
                <li><strong>Location Services:</strong> Disable location tracking through your device settings.</li>
                <li><strong>Data Portability:</strong> Request a copy of your data in a portable format.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                To exercise these rights, please contact us at privacy@instatrainme.com.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                InstaTrainMe<sup>&reg;</sup> is not intended for users under the age of 18. We do not knowingly collect personal information from children under 18. If we learn that we have collected personal information from a child under 18, we will take steps to delete that information as quickly as possible. If you believe we may have information from or about a child under 18, please contact us.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our Platform may contain links to third-party websites or services that are not operated by InstaTrainMe<sup>&reg;</sup>. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. By using InstaTrainMe<sup>&reg;</sup>, you consent to the transfer of your information to the United States and other jurisdictions where we operate.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                InstaTrainMe<sup>&reg;</sup> may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes. Continued use of the Platform after changes constitutes acceptance of the updated policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">12. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-foreground font-semibold">InstaTrainMe<sup>&reg;</sup></p>
                <p className="text-muted-foreground">901 N Market St, Suite 100</p>
                <p className="text-muted-foreground">Wilmington, DE 19801</p>
                <p className="text-muted-foreground">Email: privacy@instatrainme.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-5 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">
            Also see our <Link href="/terms" className="text-[#667eea] hover:underline">Terms & Conditions</Link> for more information about using InstaTrainMe<sup>&reg;</sup>.
          </p>
        </div>
      </section>
    </div>
  );
}
