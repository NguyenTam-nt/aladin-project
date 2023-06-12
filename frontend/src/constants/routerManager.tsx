const ManageHome = () => {
  return <div>quản lý trang chủ</div>;
};

export const RouterManage = [
  {
    path: "",
    index: true,
    element: ManageHome,
    name: "navigation.header.order",
  },
  {
    path: "banner",
    index: false,
    element: ManageHome,
    name: "navigation.header.order",
  },
];
