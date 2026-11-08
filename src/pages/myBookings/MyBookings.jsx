import PageHeader from "../../components/PAGhkjf/page-hero"

function MyBookings() {
  return (
   <section className="">
  <PageHeader
  showArch={true}
  archPosition="left"
  breadcrumb={[
    { name: "الرئيسية", path: "/" },
    { name: "حجوزاتي" }
  ]}
  badgeText="كل رحلاتك بمكان واحد"
  title="تذاكرك دائماً"
  titleHighlight="معك."
  description="راقب حجوزاتك، وارجع لتفاصيل الرحلة وقت ما تحتاج."
  actionButton={
    <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-bold shadow-sm hover:opacity-90">
      حجز جديد
    </button>
  }
/>
   </section>
  )
}

export default MyBookings
