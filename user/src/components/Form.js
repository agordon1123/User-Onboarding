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
    }, [status])
    console.log(users)

    return (
        <div className='login-form'>
            <Form>
                <div>
                    <Field
                        type='text'
                        name='name'
                        placeholder='Name'
                    />
                    {touched.name && errors.name && <p className='error'>{errors.name}</p>}
                </div>
                
                <div>
                    <Field
                        type='email'
                        name='email'
                        placeholder='Email address'                        
                    />
                    {touched.email && errors.email && <p className='error'>{errors.email}</p>}
                </div>
                
                <div>
                    <Field
                        type='password'
                        name='password'
                        placeholder='Password'
                    />
                    {touched.password && errors.password && <p className='error'>{errors.password}</p>}
                </div>
                
                <div>
                    <label className='terms'>
                    <Field
                        type='checkbox'
                        name='terms'
                        checked={values.terms}
                    />
                    <p>Agree to the terms</p>
                    </label>
                    {touched.terms && errors.terms && <p className='error'>{errors.terms}</p>}
                </div>

                <button type='submit'>Submit</button>
            </Form>
            {users.map(user => {
                return (
                    <p>{user.name}, {user.email}</p>
                )
            })}
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
            .email('Email is required')
            .required('Email not valid'),
        password: Yup.string()
            .min(6, 'Password must be 6 characters or longer')
            .required('Password is required'),
        terms: Yup.bool()
        .oneOf([true], 'Terms agreement is required')
        // .test('consent', 'Terms agreement is required', value => value === true)
    }),

    handleSubmit(values, { setStatus } ) {
        console.log(values)
        Axios.post('https://reqres.in/api/users/', values)
        .then(res => {
            console.log('res.data ', res.data)
            setStatus(res.data)
            // resetForm();
            // setSubmitting(false);
            // console.log(users)
        })
        .catch(err => {
            console.log('err ', err)
            // setErrors();
        })
    }

})(LoginForm);

export default FormikLoginForm;
