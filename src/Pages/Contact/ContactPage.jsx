import Contact from "../../Components/Contact"
import PageBanner from "../../Components/Shear/Pagebanner"


const ContactPage = () => {
  return (
    <div>
        <PageBanner title="Contact Us" breadcrumbs={[{ label: "Contact" }]} />
        <Contact />
    </div>
  )
}

export default ContactPage