import Link from "next/link";
import { AtlasShell } from "../components/AtlasShell";

export default function PrivacyPage() {
  return (
    <AtlasShell>
      <main className="legal-page">
        <article className="legal-wrap">
          <p className="section-kicker">
            <span>LEGAL &amp; COMPLIANCE</span> PRIVACY NOTICE
          </p>
          <h1>Privacy Policy.</h1>
          <p>
            Last updated: August 22, 2026. This Privacy Policy describes how Apex Atlas (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and discloses information when you visit and interact with our website.
          </p>

          <h2>1. Advertising &amp; Google AdSense (DART Cookies)</h2>
          <p>
            Apex Atlas uses third-party advertising services, including Google AdSense, to serve advertisements when you visit our site.
          </p>
          <ul>
            <li>
              Google, as a third-party vendor, uses cookies to serve ads on Apex Atlas.
            </li>
            <li>
              Google&apos;s use of the DART cookie enables it to serve ads to our users based on their visit to our site and other sites on the Internet.
            </li>
            <li>
              Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com/" target="_blank" rel="noreferrer">Google Ads Settings</a> or through the <a href="https://www.aboutads.info/choices/" target="_blank" rel="noreferrer">Network Advertising Initiative (NAI) opt-out page</a>.
            </li>
            <li>
              Third-party ad servers or ad networks use technology in their respective advertisements and links that appear on Apex Atlas, which are sent directly to your browser. They automatically receive your IP address when this occurs. Other technologies (such as cookies, JavaScript, or Web Beacons) may also be used by the third-party ad networks to measure the effectiveness of their advertisements and / or to personalize the advertising content that you see.
            </li>
          </ul>

          <h2>2. Information We Collect</h2>
          <p>
            When you visit Apex Atlas, we may automatically collect certain technical information:
          </p>
          <ul>
            <li><strong>Log Files &amp; Device Information:</strong> Browser type, operating system, referring/exit pages, date/time stamps, and basic engagement telemetry to improve site responsiveness.</li>
            <li><strong>Local Storage State:</strong> We store non-personally identifiable preferences in your browser&apos;s local storage (such as spoiler-free toggle, fan poll votes, and quiz progress) to deliver personalized interactive experiences without sending user data to third-party databases.</li>
            <li><strong>Newsletter Subscription:</strong> If you voluntarily subscribe to our Race Weekend Briefing, we collect your email address solely to send scheduled race previews. You can unsubscribe at any time with one click.</li>
          </ul>

          <h2>3. GDPR &amp; UK Data Protection Rights</h2>
          <p>
            Under European data protection laws, European Economic Area (EEA) and UK residents have specific rights regarding personal data:
          </p>
          <ul>
            <li>The right to access, rectify, or erase personal data held about you.</li>
            <li>The right to restrict or object to the processing of your data.</li>
            <li>The right to data portability.</li>
            <li>The right to withdraw consent at any time without affecting lawful prior processing.</li>
          </ul>

          <h2>4. California Consumer Privacy Act (CCPA)</h2>
          <p>
            California consumers have the right to request disclosure of categories and specific pieces of personal information collected, request deletion, and opt out of the sale or sharing of personal information. We do not sell personally identifiable user information.
          </p>

          <h2>5. Children&apos;s Information (COPPA)</h2>
          <p>
            Apex Atlas does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you believe your child provided this kind of information on our website, please contact us immediately and we will promptly remove such information from our records.
          </p>

          <h2>6. Contacting the Privacy Officer</h2>
          <p>
            If you have questions or suggestions about our Privacy Policy, please contact our team via <Link href="/contact">our Contact Page</Link> or at <a href="mailto:privacy@apexatlas.racing">privacy@apexatlas.racing</a>.
          </p>

          <Link className="back-link" href="/">← RETURN TO APEX ATLAS</Link>
        </article>
      </main>
    </AtlasShell>
  );
}
