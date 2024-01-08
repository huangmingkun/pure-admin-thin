import { ref } from "vue";
import { useEventListener } from "@/hooks/useEventListener";

export function useMouse() {
  const x = ref(0);
  const y = ref(0);
  const getMousePosition = e => {
    x.value = e.pageX;
    y.value = e.pageY;
  };
  useEventListener(window, "mousemove", getMousePosition);
  return {
    x,
    y
  };
}
