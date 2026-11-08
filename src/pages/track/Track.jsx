import PageHeader from "../../components/PAGhkjf/page-hero"

function Track() {
  return (
    <section className="container py-8">
      <PageHeader
  showArch={false}
  breadcrumb={[
    { name: "الرئيسية", path: "/" },
    { name: "حجوزاتي", path: "/my-bookings" },
    { name: "تتبع الرحلة" }
  ]}
  badgeText="تابع الطريق"
  title="رحلتك قدام"
  titleHighlight="عيونك."
  description="خط السير على الخريطة مع محطات ووقت وصول توضيحي."
  actionButton={
    <button className="flex items-center gap-2 bg-surface text-primary border border-primary px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-surface-alt">
      كل الحجوزات
    </button>
  }
/>
    </section>
  )
}

export default Track
