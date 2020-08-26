export function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img.height);
    img.src = src;
    img.onerror = () => {
      img.src = '/assets/images/no-image-found-360x250.png';
    };
  });
}
