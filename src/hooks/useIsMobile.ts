import { useEffect, useState } from 'react';

/** True below Tailwind's `lg` breakpoint (1024px) — the "app" layout. */
export const useIsMobile = (query = '(max-width: 1023px)') => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);

  return isMobile;
};
