import { ref } from "vue";
import { useEventListener } from "@/hooks/useEventListener";

export function useMouse() {
  const x = ref(0);
  const y = ref(0);
  // 鼠标移动后的回调事件
  const getMousePosition = e => {
    x.value = e.pageX;
    y.value = e.pageY;
  };
  // 监听&移除鼠标移动事件
  useEventListener(window, "mousemove", getMousePosition);
  return {
    x,
    y
  };
}
