import { useRef, useEffect, useState, useCallback } from "react";

// original idea/source https://github.com/MikeyParton/react-speech-kit/blob/master/src/useSpeechRecognition.js

// https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
const useEventCallback = (handler: (a: any) => {}, deps: any[]) => {
  const handlerRef = useRef<(a: any) => any>(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler, ...deps]);

  return useCallback((args: any) => handlerRef.current(args), [handlerRef]);
};

if (isClient) {
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
}

const noop = () => {};

const useSpeechRecognition = (props = {}) => {
  const { onEnd = noop, onResult = noop, onError = noop } = props;
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);
  const supported =
    !!window.SpeechRecognition || !!window.webkitSpeechRecognition;

  const processResult = (event) => {
    const transcriptArray = Array.from(event.results)
      .map((result) => result[0])
      .map((result) => result.transcript);
    onResult(transcriptArray);
  };

  const handleError = (event) => {
    if (event.error === "not-allowed") {
      recognitionRef.current.onend = () => {};
      setListening(false);
    }
    onError(event);
  };

  const listen = useEventCallback(
    (args = {}) => {
      if (listening || !supported) return;
      const {
        lang = "",
        interimResults = true,
        continuous = false,
        maxAlternatives = 1,
        grammars
      } = args;
      setListening(true);
      recognitionRef.current.lang = lang;
      recognitionRef.current.interimResults = interimResults;
      recognitionRef.current.onresult = processResult;
      recognitionRef.current.onerror = handleError;
      recognitionRef.current.continuous = continuous;
      recognitionRef.current.maxAlternatives = maxAlternatives;
      if (grammars) {
        recognitionRef.current.grammars = grammars;
      }
      // SpeechRecognition stops automatically after inactivity
      // We want it to keep going until we tell it to stop
      recognitionRef.current.onend = () => recognitionRef.current.start();
      recognitionRef.current.start();
    },
    [listening, supported, recognitionRef]
  );

  const stop = useEventCallback(() => {
    if (!listening || !supported) return;
    recognitionRef.current.onresult = () => {};
    recognitionRef.current.onend = () => {};
    recognitionRef.current.onerror = () => {};
    setListening(false);
    recognitionRef.current.stop();
    onEnd();
  }, [listening, supported, recognitionRef, onEnd]);

  useEffect(() => {
    if (!supported) return;

    recognitionRef.current = new window.SpeechRecognition();
  }, []);

  return {
    listen,
    listening,
    stop,
    supported
  };
};

export default useSpeechRecognition;

// Usage

function App() {
  const [value, setValue] = useState("");
  const [ended, setEnded] = useState(false);
  const onResult = (result) => setValue(result.join(""));
  const onEnd = () => setEnded(true);
  const { listen, listening, stop, supported } = useSpeechRecognition({
    onEnd,
    onResult
  });

  if (!supported) {
    return "Speech Recognition is not supported. Upgrade your browser";
  }

  const onListen = () => {
    listen({ lang: "en-US", continuous: true });
  };

  return (
    <div>
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button onMouseDown={onListen} onMouseUp={stop} type="button">
        🎤
      </button>
      {listening && <div>Go ahead I'm listening</div>}
      <p>{ended && "Speech has stoped listening"}</p>
    </div>
  );
}
