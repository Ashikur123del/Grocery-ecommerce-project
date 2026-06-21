import Faq from "../../Components/Faq/Faq"
import FAQList from "../../Components/Faq/FAQList"
import FaqListItem from "../../Components/Faq/FaqListItem"
import PageBanner from "../../Components/Shear/Pagebanner"

const Faqs = () => {
  return (
    <div>
      <PageBanner title="FAQs" breadcrumbs={[{ label: "FAQs" }]}/> 
      <Faq />
      <FAQList />
      <FaqListItem />
    </div>
  )
}

export default Faqs