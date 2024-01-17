export default {
  path: "/component",
  redirect: "/component/input",
  meta: {
    icon: "informationLine",
    title: "组件",
    // showLink: false,
    rank: 9
  },
  children: [
    {
      path: "/component/input",
      name: "input组件demo",
      component: () => import("@/views/component/input.vue"),
      meta: {
        title: "input组件demo"
      }
    }
  ]
} as RouteConfigsTable;
