import { useState } from "react"

export const useArrayState = <T>(initialValue: T[]) : useArrayStateReturnType<T> => {
    const [array, setArray] = useState<T[]>(initialValue);

    const addElement = (element: T) => {
        setArray((prev) => [...prev, element]);
    }

    const removeElement = (element: T) => {
        if(array.length > 0) {
            const elementIndex = array.findIndex(x => x == element);
            if(element != -1) {
                const copy = array.slice();
                copy.splice(elementIndex, 1);

                setArray(copy);
            }
        }
    }

    return [array, addElement, removeElement];
}

type useArrayStateReturnType<T> =   [T[], (el : T) => void, (el: T) => void]