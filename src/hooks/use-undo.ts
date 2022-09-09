import {useCallback, useState} from "react";

export const useUndo = <T>(initialPresent: T) => {
    const [state, setState] = useState<{
        past: T[],
        present: T,
        future: T[],
    }>({
        past: [],
        present: initialPresent,
        future: [],
    });

    const undo = useCallback(() => {
        setState(prevState => {
            const { past, present, future } = prevState;
            if(past.length === 0) return prevState;

            const previous = past[past.length - 1];
            const newPast = past.slice(0, past.length - 1);
            return {
                past: newPast,
                present: previous,
                future: [present, ...future],
            };
        });
    }, []);

    const redo = useCallback(() => {
        setState(prevState => {
            const { past, present, future } = prevState;
            if(future.length === 0) return prevState;

            const next = future[0];
            // ['present', 'f1', 'f2', 'f3'] => ['present', 'f2', 'f3']
            const newFuture = future.slice(1);

            return {
                past: [...past, present],
                present: next,
                future: newFuture,
            };
        });
    }, []);

    const set = useCallback((newPresent: T) => {
        setState(prevState => {
            const { past, present } = prevState;
            if(newPresent === present) return prevState;

            return {
                past: [...past, present],
                present: newPresent,
                future: []
            };
        });
    }, []);

    const reset = useCallback((newPresent: T) => {
        // 过去/未来 一笔勾销
        setState({
            past: [],
            present: newPresent,
            future: [],
        });
    }, []);

    return [
        state,
        {
            set,
            reset,
            undo,
            redo,
            canUndo: state.past.length !== 0,
            canRedo: state.future.length !== 0,
        },
    ];
};
