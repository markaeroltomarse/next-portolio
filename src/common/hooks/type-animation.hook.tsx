import { useEffect, useState } from "react";

type UseTypingEffectOptions = {
  duration: number; // in milliseconds
};

const useTypingEffect = (
  text: string,
  options: UseTypingEffectOptions
): string => {
  const [typedText, setTypedText] = useState(text);
  const { duration } = options;

  useEffect(() => {
    const len = text.length;
    let isReversed = true;
    let currentIndex = len;
    let typingTimer: string | number | NodeJS.Timeout | null | undefined = null;
    let currentTyped = text;
    if (!typingTimer) {
      typingTimer = setInterval(() => {
        if (isReversed) {
          currentIndex -= 1;
          if (currentIndex === 0) {
            isReversed = false;
          }
        } else {
          currentIndex += 1;
          if (currentIndex >= len) {
            isReversed = true;
          }
        }

        currentTyped = text.slice(0, currentIndex);
        setTypedText(currentTyped);
      }, duration);
    }

    return () => {
      if (typingTimer) clearInterval(typingTimer);
    };
  }, [text, duration]);

  return typedText;
};

export default useTypingEffect;
