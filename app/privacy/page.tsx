export default function PrivacyPage() {
  return (
    <section className="w-full max-w-[700px] mx-auto flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <h1 className="title-vantra text-3xl md:text-4xl font-semibold tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm md:text-base text-white/80">
          Effective date: 13/01/2026
        </p>
      </header>

      <div className="flex flex-col gap-8 text-sm md:text-base leading-relaxed text-white/80">
        <p>
          Vantra (“we”, “us”, or “our”) operates a private networking
          application for verified fashion professionals. This Privacy Policy
          explains how we collect, use, and protect your information when you
          use the Vantra app.
        </p>

        <section className="flex flex-col gap-4">
          <h2 className="title-vantra text-lg md:text-xl font-medium text-white">
            1. Information We Collect
          </h2>
          <p>When you use Vantra, we may collect the following information:</p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-white">Account Information</p>
              <ul className="list-disc pl-5">
                <li>First and last name</li>
                <li>Email address</li>
                <li>Instagram handle</li>
                <li>Profile information you choose to provide</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white">Profile Content</p>
              <ul className="list-disc pl-5">
                <li>Profile photos uploaded by you</li>
                <li>Bio or other optional profile details</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white">Communications</p>
              <ul className="list-disc pl-5">
                <li>Messages sent and received within the app</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white">Usage Data</p>
              <p>
                Basic app usage data and analytics collected via Firebase (such
                as app interactions, crash reports, and performance data)
              </p>
            </div>
          </div>
          <p>
            Vantra does not collect precise location data. The app is currently
            city-based and does not track real-time GPS location.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="title-vantra text-lg md:text-xl font-medium text-white">
            2. How We Use Your Information
          </h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-5">
            <li>Review and verify applications to join the platform</li>
            <li>Create and manage user accounts</li>
            <li>Enable messaging and networking features</li>
            <li>Maintain safety and prevent misuse</li>
            <li>Improve app performance and user experience</li>
            <li>Communicate important service-related information</li>
          </ul>
          <p>We do not use your data for advertising purposes.</p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="title-vantra text-lg md:text-xl font-medium text-white">
            3. Push Notifications
          </h2>
          <p>Vantra may send push notifications to inform users about:</p>
          <ul className="list-disc pl-5">
            <li>New messages or interactions</li>
            <li>Account-related activity</li>
            <li>Important service updates or announcements</li>
          </ul>
          <p>
            Push notifications rely on device tokens provided by your operating
            system. These tokens are used solely to deliver notifications and
            are not used for tracking, profiling, or advertising.
          </p>
          <p>
            You can enable or disable push notifications at any time through
            your device settings.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="title-vantra text-lg md:text-xl font-medium text-white">
            4. Sharing of Information
          </h2>
          <p>
            Your profile information is visible only to other verified users
            within the Vantra network. We do not sell or rent personal data to
            third parties. We may share limited data with trusted service
            providers (such as Firebase) strictly for app functionality,
            analytics, and security.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="title-vantra text-lg md:text-xl font-medium text-white">
            5. Data Retention
          </h2>
          <p>
            We retain your information only for as long as your account is
            active. If you delete your account, your personal data is deleted
            from our systems within a reasonable period, unless retention is
            required for legal or security purposes.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="title-vantra text-lg md:text-xl font-medium text-white">
            6. Account Deletion
          </h2>
          <p>
            Users can delete their account and associated data at any time
            directly within the app. Once deleted, your profile, photos, and
            messages are permanently removed.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="title-vantra text-lg md:text-xl font-medium text-white">7. Security</h2>
          <p>
            We take reasonable technical and organisational measures to protect
            your information from unauthorised access, loss, or misuse. However,
            no system can be completely secure.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="title-vantra text-lg md:text-xl font-medium text-white">
            8. Third-Party Services
          </h2>
          <p>
            Vantra uses Firebase for analytics and app performance monitoring.
            Firebase may collect limited technical data in accordance with
            Google’s privacy practices.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="title-vantra text-lg md:text-xl font-medium text-white">
            9. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be reflected by updating the effective date above.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="title-vantra text-lg md:text-xl font-medium text-white">
            10. Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy or your data,
            you can contact us at:
          </p>
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
