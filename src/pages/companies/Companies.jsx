import CompanyCard from "../../components/CompanyCard/CompanyCard";
import { useCompanies } from "../../hooks/useCompanies";
import PageHeader from "../../components/PAGhkjf/page-hero";

function Companies() {
  const { data: companies, isLoading, isError, error } = useCompanies();

  return (
    <section className="container py-8 font-cairo">
      <PageHeader
        archPosition="left"
        breadcrumb={[
          { name: "الرئيسية", path: "/" },
          { name: "شركات النقل" }
        ]}
        badgeText="شركاء الطريق"
        title="شركات بتوصلك"
        titleHighlight="لوين ما بدك."
        description="تعرّف على شركات النقل الموجودة في النموذج واختر الأنسب إلك."
      />

      {isLoading && (
        <div className="text-center py-12 text-muted font-bold">
          جاري تحميل شركات النقل...
        </div>
      )}

      {isError && (
        <div className="text-center py-12 text-red-500 font-bold">
          {error?.message || "حدث خطأ أثناء جلب البيانات"}
        </div>
      )}

      {companies && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Companies;