import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const UserForm = ({values, errors, touched, status}) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
        }
    },[status]);

    return(
        <div className="user-form">
            <Form>

                <Field
                name="name"
                type="text"
                placeholder="Name"
                />
                {touched.name && errors.name && (<p className="error">{errors.name}</p>)}

                <Field
                name="email"
                type="text"
                placeholder="Email"
                />
                {touched.email && errors.email && (<p className="error">{errors.email}</p>)}

                <Field
                name="password"
                type={values.showPassword ? 'text' : 'password'}
                placeholder="Password"
                />
                {touched.password && errors.password && (<p className="error">{errors.password}</p>)}

                <label className="checkbox-container">
                    <Field
                    type="checkbox"
                    name="TOS"
                    checked={values.TOS}
                  />        
                </label>

                <button>Submit</button>  
            </Form>

            {users.map(user => (
                <ul key={user.id}>
                    <li>Name:{user.name}</li>
                    <li>Email:{user.email}</li>
                </ul>
            ))}

        </div>
      
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, TOS}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            TOS: TOS || false
        };
},
validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required()
}),

handleSubmit(values, {setStatus}) {
    axios.post("https://reqres.in/api/users/", values)
    .then(res => {
        setStatus(res.data);
    })
    .catch(err => console.log(err.res));
}
    
})(UserForm);

export default FormikUserForm;