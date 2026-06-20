import PageBanner from "../../Components/Shear/Pagebanner";



const PrivacyPolicy = () => {
  return (
    <>
     <PageBanner title="Privacy Policy" breadcrumbs={[{ label: "Policy" }]} />
      <div className="container mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Who We Are</h2>
        <p>When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection. An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Comments</h2>
        <p>When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection. An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it.</p>
        <ul className="list-disc ml-6 mt-2">
          <li>When visitors leave comments on the site we collect the data shown in the comments form, and also the.</li>
          <li>An anonymized string created from your email address (also called a hash) may be provided to the Gravatar.</li>
          <li>The Gravatar service privacy policy is available here.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Media</h2>
        <p>If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year. If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser. When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year</p>
         <ul className="list-disc ml-6 mt-2">
          <li>When visitors leave comments on the site we collect the data shown in the comments form, and also the.</li>
          <li>An anonymized string created from your email address (also called a hash) may be provided to the Gravatar.</li>
          <li>The Gravatar service privacy policy is available here.</li>
          <li>An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it.</li>
          <li>The Gravatar service privacy policy is available here.</li>
        </ul>
        <p>You should avoid uploading images with embedded location data. Visitors to the website can download and extract any location data from images on the website.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Cookies</h2>
        <p>If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year. If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser. When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Embedded content from other websites</h2>
        <p>Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website. These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">How long we retain your data</h2>
        <p>If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">What rights you have over your data</h2>
        <p>If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative purposes.</p>
      </section>
    </div>
    </>
  );
};

export default PrivacyPolicy;