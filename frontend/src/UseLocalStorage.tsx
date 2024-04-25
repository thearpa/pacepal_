import { useState, useEffect } from "react";

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    if (saved != null) {
      try {
        // Forsøker å parse som JSON
        return JSON.parse(saved);
      } catch {
        // Returner som streng hvis det ikke er gyldig JSON
        return saved;
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    // Lagrer i localStorage. Objekter og arrays vil bli JSON-strengifisert, strenger lagres direkte.
    if (typeof value === "object" || Array.isArray(value)) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  }, [key, value]);

  return [value, setValue];
};
