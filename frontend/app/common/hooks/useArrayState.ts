import { useState } from "react"

export const useArrayState = <T>(initialValue: T[]) : useArrayStateReturnType<T> => {
    const [array, setArray] = useState<T[]>(initialValue);


    const addElement = (element: T) => {
        setArray((prev) => [...prev, element]);
    }

    return [array, addElement];
}

type useArrayStateReturnType<T> =   [T[], (el : T) => void]