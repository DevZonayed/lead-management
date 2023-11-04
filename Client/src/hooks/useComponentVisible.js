import { useState, useEffect, useRef } from "react";

/**
 * This hook will detact outside click of a component
 * return a array of [ref, isComponentVisible, setIsComponentVisible]
 * @param {True or false} initialIsVisible
 * @returns
 */
export default function useComponentVisible(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return [ref, isComponentVisible, setIsComponentVisible];
}
