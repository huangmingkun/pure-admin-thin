import { onMounted, onUnmounted } from "vue";
export function useEventListener(
  el: Window | Document | HTMLElement,
  event: string,
  handler: (event: Event) => void
) {
  const savedHandler = handler;
  onMounted(() => {
    el.addEventListener(event, savedHandler);
  });
  onUnmounted(() => {
    el.removeEventListener(event, savedHandler);
  });
}
