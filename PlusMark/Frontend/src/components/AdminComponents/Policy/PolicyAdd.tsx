import PolicyForm from "@components/Form/PolicyForm";
import useI18n from "@hooks/useI18n";

export default function PolicyAdd() {
  const {t} = useI18n();
  return (
    <div className="pt-9 pb-10px flex-1 xl:pl-8">
      <h2 className="titlePage mb-4 px-10">
        {t("text.title.title_add_policy")}
      </h2>
      <PolicyForm />
    </div>
  )
}