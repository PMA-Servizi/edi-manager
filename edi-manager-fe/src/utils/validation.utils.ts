import type { InputBindsConfig, PublicPathState } from 'vee-validate'

export const validateOnInputIfErrored = (
  state: PublicPathState<string>,
): Partial<InputBindsConfig> => {
  return {
    validateOnModelUpdate: state.errors.length > 0,
    validateOnBlur: true,
  }
}
