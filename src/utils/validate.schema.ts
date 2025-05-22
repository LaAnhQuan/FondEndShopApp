import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Password cannot be blank'),
  email: Yup.string()
    .email('Invalid email')
    .nullable(), // Allow email to be null or empty
  phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .nullable(), // Allow phone to be null or empty
}).test(
  'email-or-phone',
  'Either email or phone must be provided',
  function (value) {
    const { email, phone } = value;
    if (!email && !phone) {
      return false; // Both email and phone are empty, so validation fails
    }
    return true; // At least one field is filled
  }
);


export const SignUpSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Password cannot be blank'),
  email: Yup.string()
    .email('Invalid email')
    .nullable(), // Allow email to be null or empty
  name: Yup.string()
    .required('Name cannot be blank'),
  phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .nullable(), // Allow phone to be null or empty
}).test(
  'email-or-phone',
  'Either email or phone must be provided',
  function (value) {
    const { email, phone } = value;
    if (!email && !phone) {
      return false; // Both email and phone are empty, so validation fails
    }
    return true; // At least one field is filled
  }
);