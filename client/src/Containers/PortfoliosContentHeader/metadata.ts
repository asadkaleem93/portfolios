import * as yup from 'yup';

export const addCardValidationSchema = yup.object().shape({
    cards: yup.array().of(
        yup.object().shape({
            name: yup.string().required('Name is required'),
            description: yup.string().required('Description is required'),
            url: yup.string(),
        })
    ),
    userInfo: yup.object().shape({
        email: yup.string().email().required('Email is required'),
        password: yup.string().required('Password is required'),
    })
})

export const updateUserDataFormValidatioSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
  newPassword: yup.string(),
  confirmPassword: yup
  .string()
//   .when('newPassword', {
//     is: true,
//     then: yup.string().required('Must enter confirm password'),
//     })
  .test("match", "Re-entered password must match the new password", function(
    confirmPassword: any
  ) {
      //@ts-ignore
    return confirmPassword === this.parent.newPassword;
  }),
  phoneNumber: yup.string().required('Phone Number is required'),
  describeYourSelf: yup.string().required('Describe your self field is required'),
  degree: yup.string(),
  university: yup.string(),
  gpa: yup.string(),
  skills: yup.string(),
  interests: yup.string(),
  resume: yup.string(),
});