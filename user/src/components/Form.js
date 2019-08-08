import React from 'react';
import { withForm, Form, Field } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';

const LoginForm = ({ touched, errors }) => {
    return (
        <div className='login-form'>
            <Form>
                <div>
                    {/* {touched.name && errors.name && <p>{errors.name}</p>} */}
                    <Field
                        type='text'
                        name='name'
                        placeholder='Name'
                    />
                </div>
                
                <div>
                    <Field
                        type='email'
                        name='email'
                        placeholder='Email address'

                    />
                </div>
                
                <div>
                    <Field
                        type='password'
                        name='password'
                        placeholder='Password'

                    />
                </div>
                
                <div>
                    <Field
                        type='checkbox'
                        name='terms'>
                            <p>Agree to the <strong>terms</strong></p>
                    </Field>
                </div>
            </Form>

            <button type='submit'>Submit</button>
        </div>
    )
}

export default LoginForm;
