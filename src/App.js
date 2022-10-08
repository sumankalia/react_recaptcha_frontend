import axios from 'axios';
import React, { useRef, useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

import "./App.css";

const SITE_KEY = '';

const App = () => {
  const [formValues, setFormValues] = useState({});
  const [recaptchaValue, setRecaptchaValue] = useState('');
  const captchaRef = useRef()

  const handleInput = (e) => {
    const values = {...formValues};

    values[e.target.name] = e.target.value;

    setFormValues(values);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    captchaRef.current.reset();
    
    axios.post('http://localhost:4001/api/users/create', {
      ...formValues,
      recaptchaValue,
    }).then(res => alert('User created!'))
    .catch(error => alert(error.response.data.message));
  }

  const onChange = value => {
    setRecaptchaValue(value);
  }

  return (
    <div className="app">  
    <h3>Your details</h3>
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='firstName'>First Name</label>
        <input className='form-control' name='firstName' onChange={handleInput}/>
      </div>

      <div className='form-group'>
        <label htmlFor='lastName'>Last Name</label>
        <input className='form-control' name='lastName' onChange={handleInput}/>
      </div>

      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input className='form-control' name='email' onChange={handleInput}/>
      </div>

      <div className='form-group'>
        <label htmlFor='phone'>Phone</label>
        <input className='form-control' name='phone' onChange={handleInput}/>
      </div>

      <div className='form-group mt-2'>
        <ReCAPTCHA
          sitekey={SITE_KEY}
          onChange={onChange}
          ref={captchaRef}
        />
      </div>

        <button 
          className='btn btn-primary mt-2' 
          type='submit'
          disabled={!formValues.firstName || 
              !formValues.lastName || 
              !recaptchaValue || 
              !formValues.email ||
              !formValues.phone}
        >Submit</button>
      </form>
    </div>
  );
};

export default App;
