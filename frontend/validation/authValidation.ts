// validation/authValidation.ts
import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});

export const SignupSchema = Yup.object().shape({
  username: Yup.string().min(3, 'Too short!').required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});

export const PostSchema = Yup.object().shape({
  caption: Yup.string().required('Caption is required'),
  media: Yup.string().required('Image must be selected'),
});
