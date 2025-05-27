import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
      return void 0;
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
      return void 0;
    };
  }, [matches, query]);

  return matches;
}
