import { useEffect, useState } from "react";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState({
    /*
     * sm	40rem (640px)	@media (width >= 40rem) { ... }
     * md	48rem (768px)	@media (width >= 48rem) { ... }
     * lg	64rem (1024px)	@media (width >= 64rem) { ... }
     * xl	80rem (1280px)	@media (width >= 80rem) { ... }
     * 2xl	96rem (1536px)	@media (width >= 96rem) { ... }
     */
    sm: window.innerWidth >= 640,
    md: window.innerWidth >= 768,
    lg: window.innerWidth >= 1024,
    xl: window.innerWidth >= 1280,
    xxl: window.innerWidth >= 1536,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth({
        sm: window.innerWidth >= 640,
        md: window.innerWidth >= 768,
        lg: window.innerWidth >= 1024,
        xl: window.innerWidth >= 1280,
        xxl: window.innerWidth >= 1536,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
};

export default useWindowWidth;
