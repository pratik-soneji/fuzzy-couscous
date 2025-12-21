import { RefObject } from "react";

export const useDropDownPosition = (ref : RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>) => {
    const getDropDownPosition = () => {
        if (!ref.current) {
            return { top:0, left: 0}
        }
        const rect = ref.current.getBoundingClientRect();
        const dropdownWidth = 240
        //calculate the initial position
        let left = rect.left + window.scrollX
        const top = rect.bottom + window.scrollY

        //Check if dropdown would go off to the right edge of the viewport
        if (left+dropdownWidth > window.innerWidth) {
            //Align to right edge of bottom instead
            left = rect.right + window.scrollX - dropdownWidth
            //If still off- screen align to the right edge of with some padding
            if (left<0) {
                left = window.innerWidth - dropdownWidth - 16
            }
        }
        //Ensure dropdown does'nt go off left edge
        if (left<0) {
            left=16;
        }
        return {top,left}
    }
    return { getDropDownPosition }
}