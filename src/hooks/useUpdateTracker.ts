import { useEffect, useRef } from 'react';

type Props = {
  [key: string]: any;
}

/** Track component updates */
function useUpdateTracker(name: string = 'Component', props: Props) {
  const prevProps = useRef<Props>({});

  useEffect(() => {
    if (prevProps.current) {
      // all keys from previous and current props
      const keys = Object.keys({ ...prevProps.current, ...props });
      // accumulate all changed props
      const changes: Props = {};
      keys.forEach(key => {
        if (prevProps.current[key] !== props[key]) {
          changes[key] = {
            from: prevProps.current[key],
            to: props[key]
          };
        }
      });
      
      if (!Object.keys(changes).length) return;

      // console actual changes
      console.group('[tracked updates]');
      console.log(name, changes);
      console.groupEnd();
    }

    // set previous props
    prevProps.current = props;
  });
}

export default useUpdateTracker;
