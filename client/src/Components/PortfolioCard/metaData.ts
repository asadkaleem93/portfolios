import * as React from 'react';
import * as yup from 'yup';

export const updateCardValidationSchema = yup.object().shape({
  name: yup.string().required('Name of card is required'),
  description: yup.string().required('Description of card is required'),
  url: yup.string(),
  imgLink: yup.string(),
  userName: yup.string().required(),
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password field is required'),
})