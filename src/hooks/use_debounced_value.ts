import { useEffect, useRef, useState } from 'react';

export const useDebouncedValue = <T>(value: T, duration = 500): T => {
    const timerRef = useRef<number | null>(null);
    const [returnValue, setReturnValue] = useState<T>(value);

    useEffect(() => {
        if (!window || !duration) {
            setReturnValue(value);
            return;
        }
        if (timerRef.current) {
            window.clearTimeout(timerRef.current ?? undefined);
        }
        timerRef.current = window.setTimeout(() => {
            setReturnValue(value);
            timerRef.current = null;
        }, duration);
    }, [JSON.stringify(value)]);

    if (!duration) {
        return value;
    }
    return returnValue;
};
