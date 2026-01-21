export default function TermsPage() {
  return (
    <section className="w-full max-w-[700px] mx-auto flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <h1 className="title-vantra text-3xl md:text-4xl font-semibold tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm md:text-base text-white/80">
          Effective Date: 16 January 2026
        </p>
      </header>

      <div className="flex flex-col gap-8 text-sm md:text-base leading-relaxed text-white/80">
        <p>
          These Terms of Service (“Terms”) govern your access to and use of the
          Vantra mobile application and related services (“Vantra”, “we”, “our”,
          or “us”). By accessing or using Vantra, you agree to be bound by these
          Terms.
        </p>
        <p>If you do not agree to these Terms, you may not use the app.</p>

        <section className="flex flex-col gap-4">
          <h2 className="title-vantra text-lg md:text-xl font-medium text-white">
            1. The Vantra Platform
          </h2>
          <p>
            Vantra is a private, verified-only social network designed for
            creators and fashion professionals. Access to features, visibility,
            and interactions may be restricted based on verification status and
            community criteria.
          </p>
          <p>
            We reserve the right to approve, limit, suspend, or revoke access to
            the platform at our discretion.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="title-vantra text-lg md:text-xl font-medium text-white">
            2. Eligibility
          </h2>
          <p>By using Vantra, you confirm that:</p>
          <ul className="list-disc pl-5">
            <li>You are at least 18 years old</li>
            <li>The information you provide is accurate and truthful</li>
            <li>You comply with all applicable laws and regulations</li>
          </ul>
          <p>Vantra is not intended for minors.</p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="title-vantra text-lg md:text-xl font-medium text-white">
            3. Accounts and Verification
          </h2>
          <p>You are responsible for:</p>
          <ul className="list-disc pl-5">
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activity that occurs under your account</li>
          </ul>
          <p>
            Vantra may require additional verification to access certain
            features. Verification is not guaranteed, and we do not provide
            reasons for acceptance or rejection.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="title-vantra text-lg md:text-xl font-medium text-white">
            4. User Conduct
          </h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-5">
            <li>Harass, abuse, threaten, or impersonate others</li>
            <li>Send unsolicited, inappropriate, or harmful messages</li>
            <li>Misrepresent your identity, role, or affiliation</li>
            <li>Upload unlawful, misleading, or infringing content</li>
            <li>Attempt to bypass access controls or platform restrictions</li>
          </ul>
          <p>We may suspend accounts that violate these rules without prior notice.</p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="title-vantra text-lg md:text-xl font-medium text-white">
            5. Messaging and Interactions
          </h2>
          <p>Vantra enables private messaging between users where permitted.</p>
          <ul className="list-disc pl-5">
            <li>We do not guarantee replies, responses, or engagement from other users</li>
            <li>
              Messaging availability depends on the counterparty accepting the
              connection request
            </li>
            <li>You are solely responsible for the content you send</li>
          </ul>
          <p>
            Vantra is not responsible for user interactions or outcomes resulting
            from connections made through the app.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="title-vantra text-lg md:text-xl font-medium text-white">
            6. Safety and Reporting
          </h2>
          <p>
            Vantra has zero tolerance for objectionable content, harassment,
            sexual exploitation, or abusive behavior.
          </p>
          <p>
            Users may upload content and communicate with other users through the
            app. Users may report objectionable content or abusive behavior
            directly within the app using the reporting features provided.
          </p>
          <p>
            All reports are reviewed by the Vantra team. Content that violates
            these Terms may be removed, and the responsible account may be
            suspended or permanently removed. Vantra commits to reviewing and
            acting on all valid reports of objectionable content within 24 hours
            of submission.
          </p>
          <p>
            Vantra reserves the right to take appropriate action at its sole
            discretion to maintain a safe and respectful environment for all
            users.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="title-vantra text-lg md:text-xl font-medium text-white">
            7. Content Responsibility
          </h2>
          <p>
            You retain ownership of the content you submit. By posting content on
            Vantra, you grant us a limited, non-exclusive licence to display and
            distribute it within the platform for operational purposes.
          </p>
          <p>
            You are responsible for ensuring you have the rights to any content
            you upload.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="title-vantra text-lg md:text-xl font-medium text-white">
            8. Account Suspension and Termination
          </h2>
          <p>We may suspend or terminate your account if:</p>
          <ul className="list-disc pl-5">
            <li>You violate these Terms</li>
            <li>You misuse the platform</li>
            <li>Your presence poses risk to the community</li>
          </ul>
          <p>
            You may delete your account at any time. Termination does not affect
            obligations incurred prior to termination.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="title-vantra text-lg md:text-xl font-medium text-white">
            9. Availability and Changes
          </h2>
          <p>Vantra is provided on an “as is” and “as available” basis.</p>
          <p>We may:</p>
          <ul className="list-disc pl-5">
            <li>Modify or discontinue features</li>
            <li>Restrict access temporarily or permanently</li>
            <li>Update the app without notice</li>
          </ul>
          <p>We do not guarantee uninterrupted availability.</p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="title-vantra text-lg md:text-xl font-medium text-white">
            10. Limitation of Liability
          </h2>
          <p>To the maximum extent permitted by law:</p>
          <ul className="list-disc pl-5">
            <li>Vantra is not liable for indirect, incidental, or consequential damages</li>
            <li>We are not responsible for user conduct, communications, or offline interactions</li>
          </ul>
          <p>Use of the platform is at your own risk.</p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="title-vantra text-lg md:text-xl font-medium text-white">11. Privacy</h2>
          <p>
            Your use of Vantra is also governed by our Privacy Policy, which
            explains how we collect and process personal data.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="title-vantra text-lg md:text-xl font-medium text-white">
            12. Changes to These Terms
          </h2>
          <p>
            We may update these Terms from time to time. Continued use of the app
            after changes take effect constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="title-vantra text-lg md:text-xl font-medium text-white">13. Contact</h2>
          <p>If you have questions about these Terms, contact us at:</p>
          <p>
            Email:{" "}
            <a className="underline" href="mailto:info@vantra.app">
              info@vantra.app
            </a>
          </p>
        </section>
      </div>
    </section>
  );
}
