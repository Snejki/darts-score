//type TypedFormDataValue = FormDataEntryValue | Blob


interface TypedFormData<T> {
    get<K extends keyof T>(name: K): T[K] | null
}

export const getTypedFormData = <T>(form: FormData) => {
    return form as TypedFormData<T>
}