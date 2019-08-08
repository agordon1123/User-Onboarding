import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';

const LoginForm = ({ touched, errors }) => {
    return (
        <div className='login-form'>
            <Form>
                <div>
                    {touched.name && errors.name && <p>{errors.name}</p>}
                    <Field
                        type='text'
                        name='name'
                        placeholder='Name'
                    />
                </div>
                
                <div>
                    {touched.email && errors.email && <p>{errors.email}</p>}
                    <Field
                        type='email'
                        name='email'
                        placeholder='Email address'

                    />
                </div>
                
                <div>
                    {touched.password && errors.password && <p>{errors.password}</p>}
                    <Field
                        type='password'
                        name='password'
                        placeholder='Password'

                    />
                </div>
                
                <div>
                    <Field
                        type='checkbox'
                        name='terms'
                        // check={values.terms}
                     />
                    <p>Agree to the terms</p>
                </div>

                <button type='submit'>Submit</button>
            </Form>
        </div>
    )
}

const FormikLoginForm = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
        return {
            name: name || '',
            email: email | '',
            password: password || '',
            terms: terms || false,
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email not valid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be 6 characters or longer')
            .required('Password is required')
        // terms: Yup.
    }),

    handleSubmit(values) {
        console.log(values)
    }

})(LoginForm);

export default FormikLoginForm;
