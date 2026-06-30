import PageBanner from "../../Components/Shear/Pagebanner";



const TermsofService = () => {
  return (
    <>
     <PageBanner title="Terms of Service" breadcrumbs={[{ label: "Terms of Service" }]} />
    <div className="container mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Who We Are</h2>
        <p>When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Comments</h2>
        <p>When visitors leave comments on the site we collect the data shown in the comments form.</p>
        <ul className="list-disc ml-6 mt-2">
          <li>When visitors leave comments on the site we collect the data shown in the comments form, and also the.</li>
          <li>An anonymized string created from your email address (also called a hash) may be provided to the Gravatar.</li>
          <li>The Gravatar service privacy policy is available here.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Media</h2>
        <p>If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. You should avoid uploading images with embedded location data.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Cookies</h2>
        <p>These are for your convenience so that you do not have to fill in your details again when you leave another comment.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Embedded content from other websites</h2>
        <p>Articles on this site may include embedded content (e.g. videos, images, articles, etc.).</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">How long we retain your data</h2>
        <p>If you leave a comment, the comment and its metadata are retained indefinitely.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">What rights you have over your data</h2>
        <p>You can request to receive an exported file of the personal data we hold about you, or request that we erase any personal data we hold about you.</p>
      </section>
    </div>
    </>
  );
};

export default TermsofService;


