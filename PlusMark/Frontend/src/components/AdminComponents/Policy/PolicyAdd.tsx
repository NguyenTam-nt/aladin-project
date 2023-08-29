import PolicyForm from "@components/Form/PolicyForm";

export default function PolicyAdd() {
  return (
    <div className="pt-9 pb-10px flex-1 xl:pl-8">
      <h2 className="titlePage mb-4 px-10">
        Thêm chính sách hỗ trợ
      </h2>
      <PolicyForm />
    </div>
  )
}