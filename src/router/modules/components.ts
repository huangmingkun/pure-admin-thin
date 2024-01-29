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
    },
    {
      path: "/component/mouse-position",
      name: "鼠标位置",
      component: () => import("@/views/component/mouse-position.vue"),
      meta: {
        title: "鼠标位置"
      }
    },
    {
      path: "/component/father-instance",
      name: "获取子组件实例",
      component: () => import("@/views/component/father-instance.vue"),
      meta: {
        title: "获取子组件实例"
      }
    }
  ]
} as RouteConfigsTable;
