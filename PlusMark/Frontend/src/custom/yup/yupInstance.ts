import * as yup from 'yup';
import { convertFromRaw } from 'draft-js';

yup.addMethod(yup.string, 'isEditorRequired', function (errorMessage: string) {
  return this.test('is-editor-required', errorMessage, function (value: any) {
    const { path, createError } = this;
    const obj = JSON.parse(value)
    const contentState = convertFromRaw(obj);
    if (!contentState.hasText() && contentState.getPlainText() == '') {
      return createError({ path, message: errorMessage })
    }
    return true;
  });
})

yup.addMethod(yup.array, "requiredAtLeast", function (errorMessage: string) {
  return this.test('required-at-least', errorMessage, function (value: any) {
    const { path, createError } = this;
    if (!Array.isArray(value)) {
      return createError({ path, message: errorMessage });
    }
    value = value.filter(item => item && item.length)
    if (!value.length) {
      return createError({ path, message: errorMessage });
    }
    return true;
  });
});

export default yup