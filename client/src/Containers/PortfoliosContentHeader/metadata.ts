import * as yup from 'yup';

export const addCardValidationSchema = yup.object().shape({
    cards: yup.array().of(
        yup.object().shape({
            name: yup.string().required('Name is required'),
            description: yup.string().required('Description is required'),
            link: yup.string(),
        })
    ),
    userInfo: yup.object().shape({
        email: yup.string().email().required('Email is required'),
        password: yup.string().required('Password is required'),
    })
})