import * as yup from 'yup';

const authSchema = yup.object().shape({
  username: yup.string().required('Username field cannot be empty.'),
  password: yup.string().required('Password field cannot be empty.'),
});

export default authSchema;
