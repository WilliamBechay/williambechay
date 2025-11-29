import React, { useState, useEffect, useRef } from 'react';

export const useScrollSpy = (ids, options) => {
  const [activeId, setActiveId] = useState(ids[0] || '');
  const observerRef = useRef(null);

  useEffect(() => {
    const handleIntersection = (entries) => {
      const intersectingEntries = entries.filter(entry => entry.isIntersecting);

      if (intersectingEntries.length > 0) {
        // Find the entry that is most visible in the viewport
        const bestEntry = intersectingEntries.reduce((prev, current) => 
          (prev.intersectionRatio > current.intersectionRatio) ? prev : current
        );
        setActiveId(bestEntry.target.id);
      } else {
        // If nothing is intersecting, check scroll position.
        // If at the top, set the first ID as active.
        if (window.scrollY < 100 && ids.length > 0) {
           setActiveId(ids[0]);
        }
      }
    };
    
    observerRef.current = new IntersectionObserver(handleIntersection, options);
    const { current: observer } = observerRef;

    const elements = ids.map(id => document.getElementById(id)).filter(Boolean);
    elements.forEach(element => observer.observe(element));

    // Initial check for top of page
    if (window.scrollY < 100 && ids.length > 0) {
        setActiveId(ids[0]);
    }

    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, [ids, options]);

  return activeId;
};