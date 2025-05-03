export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      alert("localStorage error");
    }
  };

  const getItem = () => {
    try {
      const value = localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      }
    } catch {
      alert("localStorage error");
    }
  };

  const removeItem = () => {
    try {
      localStorage.removeItem(key);
    } catch {
      alert("localStorage error");
    }
  };

  return { setItem, getItem, removeItem };
};
