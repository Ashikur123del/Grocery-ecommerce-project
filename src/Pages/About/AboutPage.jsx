
import About from '../../Components/AboutCompo/About'
import OurNewsArticles from '../../Components/AboutCompo/OurNewsArticles'
import TeamVideo from '../../Components/AboutCompo/TeamVideo'
import TopBrands from '../../Components/AboutCompo/TopBrands'
import WhyWeAreTheBest from '../../Components/AboutCompo/WhyWeAreTheBest'
import PageBanner from '../../Components/Shear/Pagebanner'

const AboutPage = () => {
  return (
    <div>
        <PageBanner title="About Us" breadcrumbs={[{ label: "about-us" }]} />
        <About />
        <WhyWeAreTheBest />
        <TopBrands />
        <TeamVideo />
        <OurNewsArticles />
    </div>
  )
}

export default AboutPage