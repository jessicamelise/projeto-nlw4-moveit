import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownProviderProps {
  children: ReactNode;
}

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFineshed: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);
  const [time, setTime] = useState(0.1 * 60); //25 * 60
  const [isActive, setIsActive] = useState(false);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const [hasFineshed, setHasFineshed] = useState(false);

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setHasFineshed(false);
    setTime(0.1 * 60); //25 * 60
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFineshed(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time])


  return (
    <CountdownContext.Provider 
      value={
        {
          minutes,
          seconds,
          hasFineshed,
          isActive,
          startCountdown,
          resetCountdown
        }
      }
    >
      {children}
    </CountdownContext.Provider>
  );
}