import * as yup from 'yup';

const credSchema = yup.object({
    email: yup.string().required('Email is required').email('Invalid email format'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
});

export default credSchema