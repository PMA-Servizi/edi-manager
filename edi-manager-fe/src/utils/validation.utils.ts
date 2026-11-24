import type { InputBindsConfig, PublicPathState } from 'vee-validate'

export const validateOnInputIfErrored = <T>(
  state: PublicPathState<T>,
): Partial<InputBindsConfig> => {
  return {
    validateOnModelUpdate: state.errors.length > 0,
    validateOnBlur: true,
  }
}
