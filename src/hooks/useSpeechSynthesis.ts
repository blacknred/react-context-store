import { useEffect, useState } from "react";

interface Opts {
  onBoundary?: (ev: SpeechSynthesisEvent) => any;
  onEnd?: (ev: SpeechSynthesisEvent) => any;
  onError?: (ev: SpeechSynthesisErrorEvent) => any;
  onPause?: (ev: SpeechSynthesisEvent) => any;
  onResume?: (ev: SpeechSynthesisEvent) => any;
}

interface SpeakArgs {
  voice: any;
  text: string;
  rate: number;
  pitch: number;
  volume: number;
  lang: string;
  continuous: boolean;
}

const defaultSpeakArgs = {
  voice: null,
  text: "",
  rate: 1,
  pitch: 1,
  volume: 1,
  lang: "en-US",
  continuous: false
};

/** Speech synthesis hook */
function useSpeechSynthesis(options: Opts = {}) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speaking, setSpeaking] = useState<boolean>(false);
  const supported = !!window.speechSynthesis;

  const processVoices = (voiceOptions: SpeechSynthesisVoice[]) => {
    setVoices(voiceOptions);
  };

  const getVoices = () => {
    // Firefox seems to have voices upfront and never calls the voiceschanged event
    let voiceOptions = window.speechSynthesis.getVoices();
    if (voiceOptions.length > 0) {
      processVoices(voiceOptions);
      return;
    }

    window.speechSynthesis.onvoiceschanged = (ev: any) => {
      const synt: SpeechSynthesis = ev.target;
      processVoices(synt.getVoices());
    };
  };

  const handleEnd = (ev: SpeechSynthesisEvent) => {
    setSpeaking(false);
    if (options.onEnd) options.onEnd(ev);
  };

  const handleError = (ev: SpeechSynthesisErrorEvent) => {
    setSpeaking(false);
    if (options.onError) options?.onError(ev);
  };

  const speak = (args: SpeakArgs = defaultSpeakArgs) => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    const utterance = new window.SpeechSynthesisUtterance();
    // Firefox won't repeat an utterance that has been
    // spoken, so we need to create a new instance each time
    utterance.lang = args.lang;
    utterance.text = args.text;
    utterance.voice = args.voice;
    utterance.rate = args.rate;
    utterance.pitch = args.pitch;
    utterance.volume = args.volume;
    // utterance.continuous = options.continuous;
    utterance.onend = handleEnd;
    utterance.onerror = handleError;
    utterance.onpause = options.onPause || null;
    utterance.onresume = options.onResume || null;
    utterance.onboundary = options.onBoundary || null;

    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  const pause = () => {
    if (speaking && supported) {
      window.speechSynthesis.pause();
      setSpeaking(false);
    }
  };

  const resume = () => {
    if (!speaking && supported) {
      window.speechSynthesis.resume();
      setSpeaking(true);
    }
  };

  const cancel = () => {
    if (!supported) return;
    setSpeaking(false);
    window.speechSynthesis.cancel();
  };

  useEffect(() => {
    if (supported) getVoices();

    return () => {
      if (supported) window.speechSynthesis.cancel();
    };
  }, []);

  return {
    supported,
    speak,
    speaking,
    voices,
    cancel,
    pause,
    resume
  };
}

export default useSpeechSynthesis;

// Usage
// function App() {
//   const [value, setValue] = useState("");
//   const [ended, setEnded] = useState(false);
//   const onEnd = () => setEnded(true);
//   const onError = (ev: SpeechSynthesisErrorEvent) => console.warn(event);
//   const onBoundary = (ev: SpeechSynthesisEvent) => {
//     console.log(`${ev.name} boundary reached after ${ev.elapsedTime} ms.`);
//   };

//   const {
//     cancel,
//     speak,
//     speaking,
//     supported,
//     voices,
//     pause,
//     resume
//   } = useSpeechSynthesis({
//     onEnd,
//     onBoundary,
//     onError
//   });

//   if (!supported) {
//     return "Speech is not supported. Upgrade your browser";
//   }

//   return (
//     <div>
//       <textarea
//         value={value}
//         onChange={(ev: Event) => setValue(ev.target.value)}
//       />
//       <button
//         type="button"
//         onClick={() => speak({ text: value, voice: voices[1] })}>
//         Speak
//       </button>
//       <button type="button" onClick={cancel}>
//         Cancel
//       </button>
//       <button type="button" onClick={pause}>
//         Pause
//       </button>
//       <button type="button" onClick={resume}>
//         Resume
//       </button>
//       <p>{speaking && "Voice is speaking"}</p>
//       <p>{ended && "Voice has ended"}</p>
//       <div>
//         <h2>Voices:</h2>
//         <div>
//           {voices.map((voice) => (
//             <p key={voice.name}>{voice.name}</p>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
