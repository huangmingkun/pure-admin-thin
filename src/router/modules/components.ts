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
      path: "/component/input-demo",
      name: "input-demo",
      component: () => import("@/views/component/input/input.vue"),
      meta: {
        title: "input组件demo"
      }
    },
    {
      path: "/component/mouse-position",
      name: "mouse-position",
      component: () =>
        import("@/views/component/mouse-position/mouse-position.vue"),
      meta: {
        title: "鼠标位置"
      }
    },
    {
      path: "/component/father-instance",
      name: "get-instance",
      component: () =>
        import("@/views/component/father-instance/father-instance.vue"),
      meta: {
        title: "获取子组件实例"
      }
    },
    {
      path: "/component/complex-form",
      name: "complex-form",
      component: () =>
        import("@/views/component/complex-form/complex-form.vue"),
      meta: {
        title: "复杂表单处理"
      }
    }
  ]
} as RouteConfigsTable;
