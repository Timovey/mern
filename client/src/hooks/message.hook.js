import { useCallback } from 'react';

export const useMessage = () => {
    return useCallback(text => {
        //менял тут
        if (window.M && text) {
            window.M.toast({ html: text })
        }
    }, [])
}