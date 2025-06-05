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


export const ConfirmSchema = Yup.object().shape({
  note: Yup.string().nullable(), // Có thể rỗng
  address: Yup.string()
    .required('Address cannot be blank'),
  phone: Yup.string()
    .required('Phone cannot be blank')
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
});

export const UpdateUserSchema = Yup.object().shape({
  name: Yup.string()
    .required('Họ tên không được để trống'),
  phone: Yup.string()
    .required('Số điện thoại không được để trống'),
});

export const UpdateUserPasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(6, 'currentPassword cần tối thiểu 6 ký tự')
    .max(50, 'currentPassword tối đa 50 ký tự')
    .required('currentPassword không được để trống'),
  newPassword: Yup.string()
    .min(6, 'newPassword cần tối thiểu 6 ký tự')
    .max(50, 'newPassword tối đa 50 ký tự')
    .required('newPassword không được để trống'),

  confirmNewPassword: Yup.string()
    .required('confirmNewPassword không được để trống')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')

});
