import * as yup from 'yup';

const shoeSchema = yup.object({
    brand: yup.string().required('Brand is required'),
    model: yup.string().required('Model is required')
})

export default shoeSchema