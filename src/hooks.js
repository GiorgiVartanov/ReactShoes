import { useEffect } from "react";

export function useDetectClickOutside(ref, callBack) {
    // custom hook that will detect if it was clicked outside of ref
    // if it was it will run passed function
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callBack();
            }
        };
        // bind event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // unbind event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}
