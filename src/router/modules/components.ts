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
      path: "/component/InputDemo",
      name: "InputDemo",
      component: () => import("@/views/component/input/input.vue"),
      meta: {
        title: "input组件demo"
      }
    },
    {
      path: "/component/MousePosition",
      name: "MousePosition",
      component: () =>
        import("@/views/component/mouse-position/MousePosition.vue"),
      meta: {
        title: "鼠标位置"
      }
    },
    {
      path: "/component/GetInstance",
      name: "GetInstance",
      component: () =>
        import("@/views/component/father-instance/GetInstance.vue"),
      meta: {
        title: "获取子组件实例"
      }
    },
    {
      path: "/component/ComplexForm",
      name: "ComplexForm",
      component: () => import("@/views/component/complex-form/ComplexForm.vue"),
      meta: {
        title: "复杂表单处理"
      }
    },
    {
      path: "/component/Permission",
      name: "Permission",
      component: () => import("@/views/component/permission/Permission.vue"),
      meta: {
        title: "权限指令"
      }
    },
    {
      path: "/component/ExcelExportQRCode",
      name: "ExcelExportQRCode",
      component: () =>
        import("@/views/component/excel-export-qrcode/ExcelExportQRCode.vue"),
      meta: {
        title: "excel导出二维码"
      }
    },
    {
      path: "/component/EventBus",
      name: "EventBus",
      component: () => import("@/views/component/event-bus/EventBus.vue"),
      meta: {
        title: "EventBus兄弟组件通信"
      }
    },
    {
      path: "/component/ImgLazy",
      name: "ImgLazy",
      component: () => import("@/views/component/img-lazy/ImgLazy.vue"),
      meta: {
        title: "图片懒加载指令"
      }
    },
    {
      path: "/component/VueuseDemo",
      name: "VueuseDemo",
      component: () => import("@/views/component/vueuse-demo/VueuseDemo.vue"),
      meta: {
        title: "vueuse示例"
      }
    },
    {
      path: "/component/customHook",
      name: "CustomHook",
      component: () => import("@/views/component/custom-hook/CustomHook.vue"),
      meta: {
        title: "hook图片转base64"
      }
    },
    {
      path: "/component/customDebounce",
      name: "CustomDebounce",
      component: () =>
        import("@/views/component/custom-debounce/CustomDebounce.vue"),
      meta: {
        title: "自定义防抖"
      }
    },
    {
      path: "/component/customNew",
      name: "CustomNew",
      component: () => import("@/views/component/custom-new/CustomNew.vue"),
      meta: {
        title: "实现new函数"
      }
    },
    {
      path: "/component/elementPlusFormBug",
      name: "ElementPlusFormBug",
      component: () =>
        import(
          "@/views/component/element-plus-form-bug/ElementPlusFormBug.vue"
        ),
      meta: {
        title: "form表单bug"
      }
    }
  ]
} as RouteConfigsTable;
