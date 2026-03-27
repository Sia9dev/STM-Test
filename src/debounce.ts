export function Debounce(func: (text: string) => void, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function debounced(value: string) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => func(value), delay);
  };
}
