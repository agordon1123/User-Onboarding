import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';

function LoginForm ({ touched, errors, values, status }) {
    const [users, setUser] = useState([])
    useEffect(() => {
        if(status) {
            setUser([...users, status])
        }
    })

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
                    {touched.terms && errors.terms && <p>{errors.terms}</p>}
                    <Field
                        type='checkbox'
                        name='terms'
                        checked={values.terms}
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
        email: Yup.string()
            .email('Email not valid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be 6 characters or longer')
            .required('Password is required'),
        terms: Yup.bool()
        .oneOf([true], 'Terms agreement is required')
        // .test('consent', 'Terms agreement is required', value => value === true)
    }),

    handleSubmit(values, { resetForm, setErrors, setSubmitting }, { setUser } ) {
        console.log(values)
        Axios.post('https://reqres.in/api/users/', values)
        .then(res => {
            console.log('res.data ', res.data)
            resetForm();
            setSubmitting(false);
            // setUser(res.data)
            // console.log(users)
        })
        .catch(err => {
            console.log('err ', err)
            setErrors();
        })
    }

})(LoginForm);

export default FormikLoginForm;
