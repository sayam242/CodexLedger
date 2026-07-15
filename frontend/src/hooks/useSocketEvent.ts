import { useEffect, useRef } from "react";
import { getSocket } from "../lib/socket";

export function useSocketEvent(
  event: string,
  handler: (...args: unknown[]) => void
) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const listener = (...args: unknown[]) => handlerRef.current(...args);
    socket.on(event, listener);

    return () => {
      socket.off(event, listener);
    };
  }, [event]);
}
