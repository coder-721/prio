// ── Legal documents + full-screen modal ───────────────────────────────────────
// Holds the Privacy Policy and Terms of Service as Markdown, renders them with a
// tiny purpose-built Markdown converter, and shows them in a full-screen popup
// wired to the footer "Privacy Policy" / "Terms of Use" links (data-legal=…).

(function legal() {
  const DOCS = {
    privacy: {
      title: 'Privacy Policy',
      md: String.raw`# Privacy Policy

**Last updated: June 15, 2026**

This Privacy Policy describes how Prio ("**Prio**," "**we**," "**us**," or "**our**") accesses, collects, stores, uses, and shares ("**processes**") your personal information when you use our services (the "**Services**"), including when you:

- Visit our website at [https://theprioapp.com](https://theprioapp.com), or any website of ours that links to this Privacy Policy
- Download and use our mobile application, **Prio** — an AI-powered time management and calendar app designed for students, by students
- Engage with us in other related ways, including any support, marketing, or events

**Questions or concerns?** Reading this Privacy Policy will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use the Services. If you still have questions, contact us at **contact@theprioapp.com**.

---

## Summary of Key Points

This summary highlights the main points. You can find more detail in the section referenced after each point, or in the full policy below.

- **What we collect.** We collect the information you give us (such as your name, email, optional school and grade, and the tasks, assignments, and notes you enter) and limited technical information from your device. [See: What Information We Collect.]
- **How AI is involved.** When you type a request into Prio (for example, "English essay due Friday"), the text you enter is sent to our AI provider, OpenAI, so we can turn it into a structured task and schedule. [See: AI-Powered Features.]
- **Whether we collect sensitive information.** We do not seek special-category sensitive information (such as health, race, or religion). Please do not type such details into Prio. [See: What Information We Collect.]
- **Who we share with.** We share information only with the service providers that make Prio work (such as OpenAI, OneSignal, Supabase, and Google), and as required by law. We do **not** sell your personal information or share it for cross-context behavioral advertising. [See: When and With Whom We Share Your Information.]
- **Minors.** Prio is intended for students aged 13 and older. We do not knowingly collect information from children under 13. [See: Information From Minors.]
- **International users.** Your information is stored and processed in the United States. If you use Prio from outside the US, your data is transferred internationally with appropriate safeguards. [See: International Data Transfers.]
- **Your rights.** Depending on where you live, you may have rights to access, correct, delete, or export your information. You can delete your account and data at any time in the app. [See: Your Privacy Rights and How to Review, Update, or Delete Your Data.]

---

## Table of Contents

1. What Information We Collect
2. How We Process Your Information
3. What Legal Bases We Rely On
4. When and With Whom We Share Your Information
5. AI-Powered Features
6. How We Handle Your Google Sign-In
7. International Data Transfers
8. How Long We Keep Your Information
9. How We Keep Your Information Safe
10. Information From Minors
11. Your Privacy Rights
12. United States Residents' Privacy Rights
13. Controls for Do-Not-Track and Global Privacy Control
14. Updates to This Policy
15. How to Contact Us
16. How to Review, Update, or Delete Your Data

---

## 1. What Information We Collect

### Information you provide to us

We collect the personal information you voluntarily provide when you register, set up your profile, use the Services, or contact us. This includes:

- **Account information:** your name and email address.
- **Authentication information:** your password (stored in hashed form), or, if you sign in with Google, the account identifiers described in "How We Handle Your Google Sign-In."
- **Profile information (optional):** your school or university, your grade or year, and a profile picture, if you choose to add them.
- **Onboarding information:** your time zone, which is required so we can schedule your work sessions and reminders in your local time. It is pre-filled from your device, and you can confirm or change it.

### Task and content data

The core of Prio is the information you enter about your schoolwork and schedule. This includes the natural-language text you type into the app and the structured tasks it becomes, such as: assignment, project, and task names; descriptions and notes; due dates and times; subjects and classes; estimated durations and difficulty; and your completion progress. This content is stored on your account so the app can build and adjust your daily plan.

Please do not enter sensitive personal details (such as health information or government ID numbers) into task fields. Prio does not need that information, and the text you enter is processed by our AI provider as described below.

### Information collected automatically

When you use the app, we automatically collect limited technical information needed to operate, secure, and troubleshoot the Services, including: device type, model, and operating system; app version and settings; a push-notification identifier (used by OneSignal to deliver notifications you have enabled); IP address; and basic usage and diagnostic data. We use this primarily for security, operation, analytics, and reporting. **We do not collect your precise geolocation.**

Our website may use cookies and similar technologies for essential site functionality and basic analytics. Where required by law, we obtain consent for non-essential cookies, and you can control cookies through your browser settings.

### Information from Google sign-in

If you choose to sign in with Google, we receive basic profile information (such as your name and email address) from Google to create and authenticate your account. See "How We Handle Your Google Sign-In."

All personal information you provide must be true, complete, and accurate, and you should update us if it changes.

---

## 2. How We Process Your Information

We process your information to:

- **Create and manage your account** and keep you logged in and secure.
- **Provide the core Services** — interpret your input, estimate workload and priority, generate and adjust your schedule and work sessions, and display your tasks, calendar, and projects.
- **Send notifications you have enabled,** such as daily task summaries, upcoming-deadline warnings, and project check-ins, via OneSignal.
- **Respond to your inquiries and provide support.**
- **Maintain the security of the Services,** including preventing fraud and abuse.
- **Improve the Services,** including internal analysis and development. Where this involves your content, we use it only to operate and improve Prio's functionality, not for unrelated purposes.
- **Comply with law** and protect the rights, safety, and property of you, us, or others.

We process your information only where we have a valid legal reason to do so. We will only process it for purposes other than those listed above with your consent or as permitted by law.

---

## 3. What Legal Bases We Rely On

### If you are in the EEA, UK, or Switzerland

The GDPR and UK GDPR require us to explain the legal bases we rely on. Depending on the activity, we rely on:

- **Performance of a contract** — to provide the Services you have signed up for.
- **Consent** — for example, to send certain notifications or process optional information. You can withdraw consent at any time.
- **Legitimate interests** — to secure, operate, analyze, and improve the Services, where those interests are not overridden by your rights.
- **Legal obligations** — to comply with applicable laws and respond to lawful requests.
- **Vital interests** — to protect someone's safety in rare emergencies.

### If you are in Canada

We process your information with your express or implied consent, which you can withdraw at any time. In limited circumstances permitted by law, we may process information without consent (for example, to investigate fraud or comply with a legal request).

---

## 4. When and With Whom We Share Your Information

We do **not** sell your personal information, and we do **not** share it for cross-context behavioral advertising. We share information only in the following circumstances:

**Service providers (data processors).** We share information with vendors who perform services on our behalf under contract, limited to what they need to perform those services:

- **OpenAI** — processes the text you enter so we can interpret and structure your tasks (see "AI-Powered Features").
- **Supabase** — our database, authentication, and backend infrastructure provider, which stores your account and task data.
- **OneSignal** — delivers the push notifications you have enabled, using a device push identifier.
- **Google** — provides optional sign-in and related authentication.
- **Apple App Store and Google Play** — process any subscription or purchase you make; payment card details are handled by those platforms, not by us.

**Legal and safety.** We may disclose information if required by law, regulation, legal process, or governmental request, or where necessary to protect the rights, property, or safety of you, us, or others.

**Business transfers.** We may share or transfer information in connection with a merger, financing, acquisition, or sale of all or part of our business. We will notify you of any such change in ownership of your information.

---

## 5. AI-Powered Features

Prio uses artificial intelligence to turn your natural-language input into structured tasks, estimate how long work will take, prioritize your schedule, and respond to your scheduling requests.

**How it works and what is shared.** When you submit text in the app (for example, on the Add screen or the home-screen quick bar), that text is transmitted to our AI provider, **OpenAI**, which processes it and returns a structured result that we save to your account. This means the words you type are sent to and processed by OpenAI to enable these features.

**Limits on use.** OpenAI processes this content under its API terms. Per those terms, data submitted through OpenAI's API is not used to train its models by default. We use your content only to provide and improve Prio's functionality.

**Your choices.** Because your input is processed by a third-party AI provider, please avoid entering sensitive personal information into task fields. The AI's interpretations are suggestions you can review, edit, or reject in the confirmation screen before anything is saved.

---

## 6. How We Handle Your Google Sign-In

The Services let you register and log in using your Google account. If you do, we receive basic profile information from Google, such as your name and email address, used only to create and authenticate your account.

Our use of information received from Google APIs adheres to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements.

We do not control, and are not responsible for, Google's own use of your information. We recommend reviewing Google's privacy policy to understand its practices.

---

## 7. International Data Transfers

We are based in the United States, and our service providers (including OpenAI, Supabase, OneSignal, and Google) are located primarily in the United States. If you access Prio from outside the United States, your information will be transferred to, stored, and processed in the United States and other countries that may not have the same data-protection laws as your own.

Where we transfer personal information out of the EEA, UK, or Switzerland, we rely on appropriate safeguards, such as the European Commission's **Standard Contractual Clauses** (and the UK Addendum where applicable), to protect your information. You may contact us for more information about the safeguards we use.

---

## 8. How Long We Keep Your Information

We keep your personal information only as long as necessary for the purposes in this Policy — generally, for as long as you maintain an account with us — unless a longer period is required or permitted by law (for example, for tax, accounting, or legal-compliance reasons).

When we no longer have a legitimate need to process your information, we will delete or anonymize it. If deletion is not immediately possible (for example, because information is held in backups), we will securely store and isolate it from further processing until deletion is possible.

---

## 9. How We Keep Your Information Safe

We use reasonable technical and organizational measures designed to protect your personal information, including encryption in transit, access controls, and secure cloud infrastructure. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security. You access the Services at your own risk and should protect your account credentials.

---

## 10. Information From Minors

Prio is designed for high school and college students and is **intended for users aged 13 and older.**

We do **not** knowingly collect or solicit personal information from children under the age of 13. If you are under 13, please do not use Prio or provide any information about yourself. During sign-up, users must confirm they are at least 13 years old. If we learn that we have collected personal information from a child under 13 without verifiable parental consent, we will delete that information promptly. If you believe a child under 13 may have provided us information, contact us at **contact@theprioapp.com**.

**Users aged 13–17.** If you are under the age of majority where you live, you should review this Policy with a parent or guardian and use Prio only with their involvement.

**Higher age thresholds outside the US.** In some jurisdictions, the minimum age to consent to data processing is higher than 13 (for example, up to 16 in parts of the European Union). Where a higher age applies to you, you must meet that age, or have a parent or guardian's consent, to use Prio.

**Parental rights.** A parent or guardian who believes their child has provided us personal information may contact us to review, correct, or delete it, and to refuse further collection.

---

## 11. Your Privacy Rights

Depending on where you live, you may have some or all of the following rights regarding your personal information:

- To **access** and obtain a copy of your information;
- To **correct** inaccurate information;
- To **delete** your information;
- To **port** your information to another service;
- To **restrict or object to** certain processing;
- To **withdraw consent** where we rely on it; and
- Not to be subject to a decision based solely on automated processing that produces legal or similarly significant effects.

**Automated processing.** Prio uses automated logic to estimate workload and prioritize and schedule your tasks. This is intended as planning assistance and does not produce legal or similarly significant effects. You can edit or override the app's suggestions at any time.

To exercise your rights, use the controls in the app or contact us at **contact@theprioapp.com**. We will respond as required by applicable law and may need to verify your identity first.

If you are in the EEA or UK and believe we have processed your information unlawfully, you may lodge a complaint with your local data protection authority. If you are in Switzerland, you may contact the Federal Data Protection and Information Commissioner.

**Withdrawing consent.** Where we rely on consent, you may withdraw it at any time by contacting us or adjusting your device and app settings. This will not affect the lawfulness of processing before withdrawal.

---

## 12. United States Residents' Privacy Rights

If you are a resident of a US state with a comprehensive privacy law (including California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Rhode Island, Tennessee, Texas, Utah, or Virginia), you may have rights to:

- Confirm whether we process your personal data and access it;
- Correct inaccuracies;
- Delete your personal data;
- Obtain a copy of the data you provided; and
- Not be discriminated against for exercising these rights.

**Categories collected.** In the past 12 months we have collected: identifiers (such as name, email, IP address, and account identifiers); customer records (such as name and contact details); education-related information (such as the school, classes, and assignments you enter); internet, usage, and device information; and account login information. We have **not** sold or shared personal information for cross-context behavioral advertising, and we do not collect biometric data, precise geolocation, or financial account details.

**How to exercise.** Submit a request in the app or by emailing **contact@theprioapp.com**. We will verify your identity before responding. You may use an authorized agent where the law allows, with proof of authorization. If we deny your request, you may appeal by emailing **contact@theprioapp.com**; if an appeal is denied, you may contact your state attorney general.

---

## 13. Controls for Do-Not-Track and Global Privacy Control

Most browsers and some devices offer a "Do-Not-Track" (DNT) setting. Because no common standard for DNT has been finalized, we do not currently respond to DNT signals. We **do** recognize and honor Global Privacy Control (GPC) signals where applicable law requires, treating them as a valid opt-out of any sale or sharing of personal information.

---

## 14. Updates to This Policy

We may update this Privacy Policy from time to time. The updated version will be indicated by a revised "Last updated" date. If we make material changes, we will notify you by posting a notice in the app or on the website, or by sending you a direct notification. We encourage you to review this Policy periodically.

---

## 15. How to Contact Us

If you have questions or comments about this Policy, email us at **contact@theprioapp.com**.

---

## 16. How to Review, Update, or Delete Your Data

You can review and update your account information at any time in the app under Account Details. To delete your account and associated data, use the **Delete Account** option in Account Details, or email us at **contact@theprioapp.com**. Upon a deletion request, we will deactivate and delete your account and information from our active databases, subject to any information we must retain for legal, security, or fraud-prevention purposes.`
    },

    terms: {
      title: 'Terms of Service',
      md: String.raw`# Terms of Service

**Last updated: June 15, 2026**

These Terms of Service ("**Terms**") are a binding agreement between you and Prio ("**Prio**," "**we**," "**us**," or "**our**") and govern your access to and use of the Prio mobile application, our website at [https://theprioapp.com](https://theprioapp.com), and related services (together, the "**Services**"). Prio is an AI-powered time management and calendar app designed for students.

**By creating an account or using the Services, you agree to these Terms and to our [Privacy Policy](https://theprioapp.com).** If you do not agree, do not use the Services.

---

## Summary of Key Points

This is a plain-language overview, not a substitute for the full Terms below.

- Prio helps you plan and schedule your schoolwork, but it is a **planning tool, not a guarantee** — you remain responsible for your own work, deadlines, and grades.
- You must be **at least 13 years old** to use Prio.
- You own the content you put into Prio. You give us a limited license to process it so the app can work, including sending text you enter to our AI provider.
- The Services are provided **"as is,"** and our liability is limited.
- We may update the Services and these Terms, suspend accounts that break the rules, and you can stop using Prio at any time.

---

## Table of Contents

1. Eligibility and Accounts
2. Description of the Services
3. AI Features and Important Limitations
4. Subscriptions, Free and Paid Plans, and Payments
5. Your Content and License to Us
6. Acceptable Use
7. Intellectual Property
8. Third-Party Services
9. App Store and Platform Terms
10. Disclaimers
11. Limitation of Liability
12. Indemnification
13. Termination
14. Changes to the Services and These Terms
15. Governing Law and Dispute Resolution
16. Electronic Communications
17. General Terms
18. How to Contact Us

---

## 1. Eligibility and Accounts

**Age.** You must be at least 13 years old to use Prio. If you are under the age of majority where you live, you may use Prio only with the involvement of a parent or guardian, and by using it you represent that you have their permission. In some countries the minimum age to consent to data processing is higher than 13; where a higher age applies to you, you must meet it. The Services are not directed to children under 13, and we do not knowingly allow them to register.

**Your account.** To use most features you must create an account using an email and password or by signing in with Google. You agree to provide accurate information and to keep it current. You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account. Notify us promptly at **contact@theprioapp.com** if you suspect unauthorized use. You may not share your account or let others use it.

---

## 2. Description of the Services

Prio lets you enter assignments, tasks, projects, classes, and events in natural language, and uses automated logic and artificial intelligence to estimate workload, prioritize items, and generate and adjust a daily plan and study schedule. Features include a task list and study timer, a calendar view, a projects board, notifications, and an AI input for adding and adjusting items.

We may add, change, or remove features at any time. We do not guarantee that any particular feature will always be available.

---

## 3. AI Features and Important Limitations

Prio's scheduling and interpretation features rely on artificial intelligence and automated estimates. **These features are provided to assist you, not to replace your own judgment.** You acknowledge and agree that:

- AI interpretations, time estimates, difficulty ratings, priorities, and generated schedules **may be inaccurate, incomplete, or unsuitable** for your situation.
- Prio does **not guarantee** that following its schedule will result in completed work, met deadlines, particular grades, or any other academic or personal outcome.
- **You remain solely responsible** for your own work, for verifying due dates and requirements with your school or instructors, and for actually completing and submitting your assignments.
- You should review the AI's interpretation before confirming any item, and you should not rely on Prio as your only record of important deadlines.

You are responsible for the content you submit to the AI features and must not enter content that is unlawful or that violates the terms of our AI provider.

---

## 4. Subscriptions, Free and Paid Plans, and Payments

Prio may offer both a free plan and one or more paid ("Pro") plans with additional features.

**Billing.** Paid subscriptions are sold and processed through the Apple App Store or Google Play, according to the account you use to download the app. Payment is charged to that platform account at confirmation of purchase. We do not collect or store your payment card details.

**Auto-renewal.** Subscriptions automatically renew for the same period at the then-current price unless you cancel before the renewal date. You can manage or cancel a subscription in your Apple or Google account settings; deleting the app does not cancel a subscription.

**Refunds.** Refunds are handled by Apple or Google under their respective policies. We do not separately process payments and generally cannot issue refunds directly.

**Price changes.** We may change subscription prices. Changes apply to future billing periods, and where required by law we will give you advance notice and the chance to cancel.

---

## 5. Your Content and License to Us

**You own your content.** The tasks, assignments, notes, schedules, and other information you enter ("**Your Content**") belong to you. We do not claim ownership of Your Content.

**License to operate the Services.** You grant us a worldwide, non-exclusive, royalty-free license to host, store, reproduce, process, and display Your Content solely to operate, provide, secure, and improve the Services. This includes transmitting text you enter to our third-party AI provider so the app can interpret and structure it, and storing your data with our infrastructure providers. This license ends when you delete Your Content or your account, except for content already shared with third-party processors as part of normal operation, and for copies retained in backups or as required by law.

**Responsibility for content.** You are responsible for Your Content and represent that you have the right to submit it and that it does not violate these Terms or any law.

---

## 6. Acceptable Use

You agree not to:

- Use the Services for any unlawful purpose or in violation of any applicable law;
- Access or use another person's account without permission, or create an account using false information;
- Upload or transmit malware, or attempt to interfere with, disrupt, overload, or gain unauthorized access to the Services or their systems;
- Reverse engineer, decompile, scrape, or attempt to extract the source code of the Services, except where this restriction is prohibited by law;
- Resell, sublicense, or commercially exploit the Services without our permission;
- Use the AI features to generate or process content that is illegal, harmful, or that violates our AI provider's policies; or
- Use the Services in any way that infringes others' rights or that we reasonably determine is abusive or harmful.

We may investigate and take appropriate action, including suspending or terminating accounts, for any violation.

---

## 7. Intellectual Property

The Services, including the Prio app, website, name, logo, branding, design, text, graphics, and software (excluding Your Content), are owned by Prio or its licensors and are protected by intellectual property laws. We grant you a limited, personal, non-exclusive, non-transferable, revocable license to use the Services for your own personal, non-commercial use, subject to these Terms. All rights not expressly granted are reserved. You may not use our name or logo without our prior written permission.

---

## 8. Third-Party Services

The Services rely on third-party providers, including OpenAI (AI processing), Supabase (backend and authentication), OneSignal (notifications), Google (sign-in), and the Apple App Store and Google Play (distribution and billing). Your use of those providers may be subject to their own terms and privacy policies. We are not responsible for the acts, omissions, content, or availability of third-party services, and we do not control them.

---

## 9. App Store and Platform Terms

If you download Prio from the Apple App Store, you acknowledge that:

- These Terms are between you and Prio only, not with Apple, and Apple is not responsible for the app or its content.
- Apple has no obligation to provide maintenance or support for the app; we are solely responsible for support to the extent required.
- Apple is not responsible for any product warranties, claims, or losses, including product liability, legal or regulatory non-compliance, or intellectual property claims relating to the app.
- You must comply with the Apple App Store Terms of Service and represent that you are not located in an embargoed country and are not on any prohibited-party list.
- Apple and its subsidiaries are third-party beneficiaries of these Terms and may enforce them against you.

If you download Prio from Google Play, your use is also subject to the Google Play Terms of Service, and similar principles apply: Google is not a party to these Terms and is not responsible for the app.

---

## 10. Disclaimers

THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.

WITHOUT LIMITING THE ABOVE, WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE; THAT SCHEDULES, ESTIMATES, OR AI OUTPUTS WILL BE ACCURATE OR RELIABLE; OR THAT USING THE SERVICES WILL HELP YOU MEET ANY DEADLINE OR ACHIEVE ANY ACADEMIC OR OTHER RESULT. YOU USE THE SERVICES AT YOUR OWN RISK.

Some jurisdictions do not allow the exclusion of certain warranties, so some of the above may not apply to you.

---

## 11. Limitation of Liability

TO THE MAXIMUM EXTENT PERMITTED BY LAW, PRIO AND ITS OWNERS, OPERATORS, AND SERVICE PROVIDERS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF DATA, MISSED DEADLINES, LOST OPPORTUNITIES, LOST GRADES OR ACADEMIC STANDING, OR LOST PROFITS, ARISING OUT OF OR RELATING TO YOUR USE OF (OR INABILITY TO USE) THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICES WILL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID US FOR THE SERVICES IN THE 12 MONTHS BEFORE THE EVENT GIVING RISE TO THE CLAIM, OR (B) US $100.

Some jurisdictions do not allow certain limitations of liability, so some of the above may not apply to you. Nothing in these Terms limits liability that cannot be limited by law.

---

## 12. Indemnification

You agree to indemnify and hold harmless Prio and its owners, operators, and service providers from any claims, damages, losses, liabilities, and expenses (including reasonable legal fees) arising out of or related to your misuse of the Services, Your Content, or your violation of these Terms or any law or third-party right.

---

## 13. Termination

You may stop using the Services and delete your account at any time in the app under Account Details. We may suspend or terminate your access at any time, with or without notice, if you violate these Terms, if required by law, or if we discontinue the Services. Upon termination, your right to use the Services ends. Sections that by their nature should survive termination — including content licenses already exercised, intellectual property, disclaimers, limitation of liability, indemnification, and governing law — will survive.

---

## 14. Changes to the Services and These Terms

We may modify, suspend, or discontinue all or part of the Services at any time. We may also update these Terms from time to time. If we make material changes, we will update the "Last updated" date and notify you by posting a notice in the app or website or by sending you a direct notification. Changes are effective when posted, and your continued use of the Services after that means you accept the updated Terms. If you do not agree, you must stop using the Services.

---

## 15. Governing Law and Dispute Resolution

**Governing law.** These Terms are governed by the laws of the State of Illinois, United States, without regard to its conflict-of-laws rules, except where mandatory consumer-protection laws of your place of residence apply.

**Informal resolution first.** Before filing any claim, you agree to contact us at **contact@theprioapp.com** and attempt to resolve the dispute informally for at least 30 days.

**Venue.** Subject to any mandatory law that applies to you, you agree that any dispute not resolved informally will be brought exclusively in the state or federal courts located in Illinois, and you consent to their jurisdiction.

**Class-action waiver.** To the extent permitted by law, disputes will be brought only in an individual capacity and not as part of any class or representative action.

These provisions do not deprive you of any protection of mandatory law in your country of residence, and they do not apply to the extent prohibited by law (including for certain minors and consumers).

---

## 16. Electronic Communications

By using the Services, you consent to receive communications from us electronically, including service-related notices, notifications you enable, and emails. You agree that electronic communications satisfy any legal requirement that a communication be in writing. You can manage notifications in your device and app settings.

---

## 17. General Terms

**Entire agreement.** These Terms and the Privacy Policy are the entire agreement between you and us regarding the Services and supersede any prior agreements.

**Severability.** If any provision is found unenforceable, the rest remains in effect, and the unenforceable provision will be applied to the maximum extent permitted.

**No waiver.** Our failure to enforce any provision is not a waiver of our right to do so later.

**Assignment.** You may not assign these Terms without our consent. We may assign them in connection with a merger, acquisition, or sale of our business.

**No third-party beneficiaries,** except as expressly stated for Apple and Google in the App Store and Platform Terms section.

---

## 18. How to Contact Us

Questions about these Terms? Email us at **contact@theprioapp.com**.`
    }
  };

  // ── Minimal Markdown → HTML (handles the subset these documents use) ──
  function inline(s) {
    s = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    return s;
  }

  function render(md) {
    const lines = md.replace(/\r/g, '').split('\n');
    let html = '', para = [], list = null;
    const flush = () => { if (para.length) { html += '<p>' + inline(para.join(' ')) + '</p>'; para = []; } };
    const closeList = () => { if (list) { html += '</' + list + '>'; list = null; } };

    for (const raw of lines) {
      const t = raw.trim();
      if (!t) { flush(); closeList(); continue; }
      if (t === '---') { flush(); closeList(); html += '<hr>'; continue; }

      let m;
      if ((m = t.match(/^(#{1,6})\s+(.*)$/))) {
        flush(); closeList();
        const lvl = Math.min(m[1].length + 1, 6); // shift down: doc # → h2
        html += '<h' + lvl + '>' + inline(m[2]) + '</h' + lvl + '>';
        continue;
      }
      if ((m = t.match(/^[-*]\s+(.*)$/))) {
        flush();
        if (list !== 'ul') { closeList(); html += '<ul>'; list = 'ul'; }
        html += '<li>' + inline(m[1]) + '</li>';
        continue;
      }
      if ((m = t.match(/^\d+\.\s+(.*)$/))) {
        flush();
        if (list !== 'ol') { closeList(); html += '<ol>'; list = 'ol'; }
        html += '<li>' + inline(m[1]) + '</li>';
        continue;
      }
      para.push(t);
    }
    flush(); closeList();
    return html;
  }

  // Render once, cache the result.
  const cache = {};
  function getHtml(key) {
    if (!cache[key]) {
      // Drop the leading "# Title" line; the modal header shows the title.
      const md = DOCS[key].md.replace(/^#\s+.*\n/, '');
      cache[key] = render(md);
    }
    return cache[key];
  }

  // ── Modal ──
  let modal, titleEl, bodyEl, lastFocus;

  function build() {
    modal = document.createElement('div');
    modal.className = 'legal-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML =
      '<div class="legal-backdrop" data-close></div>' +
      '<div class="legal-panel" role="document">' +
        '<header class="legal-head">' +
          '<h2 class="legal-title"></h2>' +
          '<button class="legal-close" type="button" aria-label="Close" data-close><i data-lucide="x"></i></button>' +
        '</header>' +
        '<div class="legal-body"></div>' +
      '</div>';
    document.body.appendChild(modal);
    titleEl = modal.querySelector('.legal-title');
    bodyEl = modal.querySelector('.legal-body');

    modal.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) close(); });
    if (window.lucide) window.lucide.createIcons();
  }

  function open(key) {
    if (!DOCS[key]) return;
    if (!modal) build();
    lastFocus = document.activeElement;
    titleEl.textContent = DOCS[key].title;
    bodyEl.innerHTML = getHtml(key);
    bodyEl.scrollTop = 0;
    modal.classList.add('open');
    document.body.classList.add('modal-open');
    const closeBtn = modal.querySelector('.legal-close');
    if (closeBtn) closeBtn.focus();
  }

  function close() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  // Footer links → open the matching document.
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-legal]');
    if (link) { e.preventDefault(); open(link.getAttribute('data-legal')); }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) close();
  });
})();
