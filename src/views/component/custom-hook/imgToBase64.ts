import { onMounted } from "vue";

export function useImgToBase64(el: string): Promise<string> {
  return new Promise((resolve, reject) => {
    onMounted(() => {
      const imgDom: HTMLImageElement = document.getElementById(
        el
      ) as HTMLImageElement;
      imgDom.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = imgDom.width;
        canvas.height = imgDom.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(imgDom, 0, 0, imgDom.width, imgDom.height);
          const base64: string = canvas.toDataURL("image/png");
          resolve(base64);
        } else {
          reject("canvas context error");
        }
      };
    });
  });
}
