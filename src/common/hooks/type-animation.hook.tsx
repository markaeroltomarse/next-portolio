import { useCallback, useEffect, useState } from "react";

type UseTypingEffectOptions = {
  duration: number; // in milliseconds
  isStop?: boolean;
};

const useTypingEffect = (
  text: string,
  options: UseTypingEffectOptions
): string => {
  const [typedText, setTypedText] = useState(text);
  const { duration, isStop } = options;
  const [typingTimer, setTypingTimer] = useState<
    number | null | NodeJS.Timeout
  >(null);

  const startTimer = useCallback(() => {
    const len = text.length;
    let isReversed = true;
    let currentIndex = len;

    let currentTyped = text;
    if (!typingTimer) {
      const id = setInterval(() => {
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

      setTypingTimer(id);
    }
  }, [text, duration]);

  useEffect(() => {
    return () => {
      if (typingTimer) clearInterval(typingTimer);
    };
  }, [typingTimer]);

  useEffect(() => {
    if (isStop && typingTimer) {
      clearInterval(typingTimer);
    }

    if (!isStop) {
      startTimer();
    }
  }, [isStop]);

  return typedText;
};

export default useTypingEffect;
