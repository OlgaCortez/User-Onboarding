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
                component="select"
                className="role-select"
                name="role">
                <option>Please Choose a Role</option>    
                <option value="front-end">Front-end Developer</option>  
                <option value="back-end">Back-end Developer</option>    
                <option value="full-stack">Full Stack Developer</option>    
                <option value="ui-ux">UI/UX Developer</option>      
                </Field>
                {touched.role && errors.role && (<p className="error">{errors.role}</p>)}

                <Field
                name="password"
                type={values.showPassword ? 'text' : 'password'}
                placeholder="Password"
                />
                {touched.password && errors.password && (<p className="error">{errors.password}</p>)}

                <label className="checkbox-container">
                    Terms of Service
                    <Field
                    type="checkbox"
                    name="TOS"
                    checked={values.TOS}
                  />  
                  <span className="checkmark"></span>      
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
    mapPropsToValues({name, email, role, password, TOS}) {
        return {
            name: name || "",
            email: email || "",
            role: role || "",
            password: password || "",
            TOS: TOS || false
        };
},
validationSchema: Yup.object().shape({
    name: Yup.string().required("Your name please!"),
    email: Yup.string().required("Uh uh, we need an email!"),
    role: Yup.string().required(),
    password: Yup.string().required()
}),

handleSubmit(values, {setStatus, resetForm}) {
    axios.post("https://reqres.in/api/users/", values)
    .then(res => {
        setStatus(res.data);
        resetForm();
    })
    .catch(err => console.log(err.res));
}
    
})(UserForm);

export default FormikUserForm;