import PageBanner from "../../Components/Shear/Pagebanner";


const ReturnPolicy = () => {
  return (
    <>
     <PageBanner title="Return Policy" breadcrumbs={[{ label: "Return Policy" }]} />
     <div className="container mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Return Policy</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Return Overview</h2>
        <p>We want you to be completely satisfied with your purchase. If you are not satisfied, we are here to help with our simple return process.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Eligibility for Returns</h2>
        <ul className="list-disc ml-6 mt-2 space-y-2">
          <li>Items must be returned within 30 days of the purchase date.</li>
          <li>Items must be in their original, unused condition and packaging.</li>
          <li>Proof of purchase (receipt or order ID) is required for all returns.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Non-Returnable Items</h2>
        <p>Certain items such as digital downloads, gift cards, and personalized products are not eligible for return or exchange.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Refund Process</h2>
        <p>Once we receive your returned item, we will inspect it and notify you regarding the status of your refund. If approved, your refund will be processed and credited back to your original payment method within 5-7 business days.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p>If you have any questions on how to return your item to us, feel free to contact our support team through our official communication channels.</p>
      </section>
    </div>
    </>
  );
};

export default ReturnPolicy;