import { useState, useCallback, useLayoutEffect } from 'react';
import debounce from '../utils/debounce'; // maybe use a hook instead?

// // https://davidwalsh.name/javascript-debounce-function

// function debounce(func, wait, immediate) {
//   let timeout;

//   return function executedFunction(...args) {
//     const context = this;

//     // eslint-disable-next-line func-names
//     const later = function () {
//       timeout = null;
//       if (!immediate) func.apply(context, args);
//     };

//     const callNow = immediate && !timeout;

//     clearTimeout(timeout);

//     timeout = setTimeout(later, wait);

//     if (callNow) func.apply(context, args);
//   };
// }


function useDimensions(liveMeasure = true, delay = 250, initialDimensions = {}, effectDeps = []) {
  const [dimensions, setDimensions] = useState(initialDimensions);
  const [node, setNode] = useState(null);

  const ref = useCallback((newNode) => {
    setNode(newNode);
  }, []);

  useLayoutEffect(() => {
    // need ref to continue
    if (!node) {
      return;
    }

    const measure = () => {
      window.requestAnimationFrame(() => {
        const newDimensions = node.getBoundingClientRect();
        setDimensions(newDimensions);
      });
    };
    // invoke measure right away
    measure();

    if (liveMeasure) {
      const debounceMeasure = debounce(measure, delay);

      if ('ResizeObserver' in window) {
        const resizeObserver = new ResizeObserver(debounceMeasure);
        resizeObserver.observe(node);
        window.addEventListener('scroll', debounceMeasure);

        return () => {
          resizeObserver.disconnect();
          window.removeEventListener('scroll', debounceMeasure);
        };
      }
      window.addEventListener('resize', debounceMeasure);
      window.addEventListener('scroll', debounceMeasure);

      return () => {
        window.removeEventListener('resize', debounceMeasure);
        window.removeEventListener('scroll', debounceMeasure);
      };
    }
  }, [node, liveMeasure, ...effectDeps]);

  return [ref, dimensions, node];
}

export default useDimensions;

// Usage

// function App() {
//   const [wrapperRef, dimensions] = useDimensions();

//   return (
//     <div ref={wrapperRef}>
//       height: {dimensions.height}
//       width: {dimensions.width}
//     </div>
//   );
// }



// const ro = new ResizeObserver(entries => {
//   document.scrollingElement.scrollTop =
//     document.scrollingElement.scrollHeight;
// });

// // Observe the scrollingElement for when the window gets resized
// ro.observe(document.scrollingElement);
// // Observe the timeline to process new messages
// ro.observe(timeline);