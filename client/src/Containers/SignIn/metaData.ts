import * as React from 'react';
import * as yup from 'yup';

export const signInFormValidatioSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup
  .string()
  .required("Confirm password is required")
  .test("match", "Re-entered password must match the new password", function(
    confirmPassword: any
  ) {
      //@ts-ignore
    return confirmPassword === this.parent.password;
  }),
  userName: yup.string().required('User name is required'),
});