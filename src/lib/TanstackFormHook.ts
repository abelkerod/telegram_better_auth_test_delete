import { createFormHook, createFormHookContexts } from "@tanstack/react-form"
import { FormInput } from "@/components/form/FormInput"

export const { fieldContext, formContext, useFieldContext } = createFormHookContexts()

export const { useAppForm } = createFormHook({
  // TODO: fix the type error here
  fieldComponents: {
    FormInput,
  },
  formComponents: {},
  fieldContext,
  formContext,
})
