import { onMounted, onUnmounted } from "vue";
export function useEventListener(
  el: Window | Document | HTMLElement,
  event: string,
  callback: (event: Event) => void
): void {
  onMounted(() => {
    el.addEventListener(event, callback);
  });
  onUnmounted(() => {
    el.removeEventListener(event, callback);
  });
}
