import { App, Component } from "vue";
// 全局注册`@iconify/vue`图标库
import {
  IconifyIconOffline,
  IconifyIconOnline,
  FontIcon
} from "@/components/ReIcon";

// 全局注册按钮级别权限组件
import { Auth } from "@/components/ReAuth";
const componentsObj: { [key: string]: Component } = {
  IconifyIconOffline,
  IconifyIconOnline,
  FontIcon,
  Auth
};
export default {
  install(app: App) {
    Object.keys(componentsObj).forEach(key => {
      app.component(key, componentsObj[key]);
    });
  }
};
