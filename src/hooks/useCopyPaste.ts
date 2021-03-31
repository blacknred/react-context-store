import { useState, useEffect } from "react";

export const copyToClipboard = (text: string) => {
  const el: HTMLTextAreaElement = document.createElement("textarea");
  const iOS = window.navigator.userAgent.match(/ipad|iphone/i);
  const yPosition = window.pageYOffset || document.documentElement.scrollTop;

  // @ts-ignore
  el.contentEditable = true; // needed for iOS >= 10
  el.readOnly = false; // needed for iOS >= 10
  el.value = text;
  el.style.border = "0";
  el.style.padding = "0";
  el.style.margin = "0";
  el.style.position = "absolute";
  el.style.top = `${yPosition}px`; // sets vertical scroll

  document.body.appendChild(el);

  if (iOS) {
    const range = document.createRange();
    range.selectNodeContents(el);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    el.setSelectionRange(0, 999999);
  } else {
    el.select();
  }

  let successful = false;

  try {
    successful = document.execCommand("copy");
  } catch (e) {
    if (!("clipboardData" in window)) {
      console.error("unable to copy using clipboardData");
    } else {
      // @ts-ignore
      window.clipboardData.setData("text", text);
      successful = true;
    }
  }

  document.body.removeChild(el);

  return successful;
};

/** Copy paste hook */
function useCopyPaste(successDuration = 2000) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const id = setTimeout(() => {
        setIsCopied(false);
      }, successDuration);

      return () => clearTimeout(id);
    }
  }, [isCopied, successDuration]);

  return [
    isCopied,
    (text: string) => {
      setIsCopied(copyToClipboard(text));
    }
  ];
}

export default useCopyPaste;

// Usage