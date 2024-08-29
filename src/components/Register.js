// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// export const Register = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     confirmPassword: '',
//     email: '',
//     role: '',
//   });

//   const [errors, setErrors] = useState({
//     password: '',
//     confirmPassword: '',
//     email: '',
//   });

//   const [touched, setTouched] = useState({
//     password: false,
//     confirmPassword: false,
//     email: false,
//   });

//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [id]: value,
//     }));

//     // Validate fields on change for password and confirmPassword
//     if (id === 'password') {
//       const passwordError = touched.password ? validatePassword(value) : '';
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         password: passwordError,
//       }));
//     }

//     if (id === 'confirmPassword') {
//       const confirmPasswordError = touched.confirmPassword ? validateConfirmPassword(value) : '';
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         confirmPassword: confirmPasswordError,
//       }));
//     }
//   };

//   const handleBlur = (e) => {
//     const { id, value } = e.target;
//     setTouched((prevTouched) => ({
//       ...prevTouched,
//       [id]: true,
//     }));

//     let errorMsg = '';

//     if (id === 'password') {
//       errorMsg = validatePassword(value);
//     } else if (id === 'confirmPassword') {
//       errorMsg = validateConfirmPassword(value);
//     } else if (id === 'email') {
//       errorMsg = validateEmail(value);
//     }

//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [id]: errorMsg,
//     }));
//   };

//   const validatePassword = (password) => {
//     const hasUpperCase = /[A-Z]/.test(password);
//     const hasLowerCase = /[a-z]/.test(password);
//     const hasDigits = /\d/.test(password);
//     const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
//     const hasMinLength = password.length >= 8;

//     let errorMsg = '';
//     if (!hasUpperCase || !hasLowerCase || !hasDigits || !hasSpecialChars || !hasMinLength) {
//         errorMsg += "Invalid Password ! Missing: ";
//         if (!hasUpperCase) errorMsg += "A-Z ";
//         if (!hasLowerCase) errorMsg += "a-z ";
//         if (!hasDigits) errorMsg += "123 ";
//         if (!hasSpecialChars) errorMsg += "Special Char ";
//         if (!hasMinLength) errorMsg += "Minimum 8 Characters";
//     }

//     return errorMsg.trim();
//   };


//   const validateConfirmPassword = (confirmPassword) => {
//     return confirmPassword !== formData.password ? 'Passwords do not match!' : '';
//   };

//   const validateEmail = (email) => {
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailPattern.test(email) ? '' : 'Invalid email address';
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const passwordError = validatePassword(formData.password);
//     const confirmPasswordError = validateConfirmPassword(formData.confirmPassword);
//     const emailError = validateEmail(formData.email);

//     if (passwordError || confirmPasswordError || emailError) {
//       setErrors({
//         password: passwordError,
//         confirmPassword: confirmPasswordError,
//         email: emailError,
//       });
//       return;
//     }

//     try {
//       const response = await fetch(`${BASE_URL}/api/auth/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success('Registration successful! Check your Mail! Redirecting to login...');
//         setTimeout(() => {
//           window.location.href = '/login?registered=true';
//         }, 2000); // Delay to allow toast to display before redirecting
//       } else {
//         toast.error(`Registration failed! ${data.message}`);
//       }
//     } catch (error) {
//       toast.error('An error occurred during registration.');
//     }
//   };

//   return (
//     <section className="vh-100 pt-4" style={{ backgroundColor: 'white' }}>
//       <ToastContainer />
//       <div className="container-fluid h-custom">
//         <div className="row d-flex justify-content-center align-items-center h-100">
//           <div className="col-md-9 col-lg-6 col-xl-5">
//             <img
//               src="/Logo.jpg"
//               className="img-fluid"
//               alt="Sample image"
//               width="550px"
//               height="450px"
//               style={{ borderRadius: '15px' }}
//             />
//           </div>
//           <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
//             <form onSubmit={handleSubmit}>
//               <div className="form-outline mb-4">
//                 <label className="form-label" style={{ color: '#1F316F' }} htmlFor="username">
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   id="username"
//                   className="form-control form-control-lg"
//                   placeholder="Username"
//                   value={formData.username}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="form-outline mb-4">
//                 <label className="form-label" style={{ color: '#1F316F' }} htmlFor="email">
//                   Email address
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="form-control form-control-lg"
//                   placeholder="email@gmail.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                   onBlur={handleBlur} // Trigger validation on blur
//                 />
//                 {touched.email && errors.email && <small className="text-danger">{errors.email}</small>}
//               </div>

//               <div className="form-outline mb-3">
//                 <label className="form-label" style={{ color: '#1F316F' }} htmlFor="password">
//                   Password
//                 </label>
//                 <div className="position-relative">
//                   <input
//                     type={passwordVisible ? 'text' : 'password'}
//                     id="password"
//                     className="form-control form-control-lg"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     onBlur={handleBlur} // Trigger validation on blur
//                   />
//                   <button
//                     type="button"
//                     className="btn position-absolute end-0 top-0 mt-1 me-3"
//                     onClick={() => setPasswordVisible(!passwordVisible)}
//                   >
//                     {passwordVisible ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
//                   </button>
//                 </div>
//                 {touched.password && errors.password && <small className="text-danger">{errors.password}</small>}
//               </div>

//               <div className="form-outline mb-3">
//                 <label className="form-label" style={{ color: '#1F316F' }} htmlFor="confirmPassword">
//                   Confirm Password
//                 </label>
//                 <div className="position-relative">
//                   <input
//                     type={confirmPasswordVisible ? 'text' : 'password'}
//                     id="confirmPassword"
//                     className="form-control form-control-lg"
//                     placeholder="Confirm Password"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     onBlur={handleBlur} // Trigger validation on blur
//                   />
//                   <button
//                     type="button"
//                     className="btn position-absolute end-0 top-0 mt-1 me-3"
//                     onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
//                   >
//                     {confirmPasswordVisible ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
//                   </button>
//                 </div>
//                 {touched.confirmPassword && errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
//               </div>

//               <div className="form-outline mb-3">
//                 <label className="form-label" style={{ color: '#1F316F' }} htmlFor="role">
//                   {/* Role */}
//                 </label>
//                 <input
//                   type="hidden"
//                   id="role"
//                   className="form-control form-control-lg"
//                   placeholder="Admin / Organizer / Attendee"
//                   value="Admin"
//                   // onChange={handleChange}
//                 />
//               </div>

//               <div className="text-center text-lg-start mt-4 mb-4 pt-2">
//                 <button
//                   type="submit"
//                   className="btn btn-dark btn-lg"
//                   style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', backgroundColor: '#1F316F' }}
//                 >
//                   Register
//                 </button>

//                 <p className="small fw-bold mt-2 pt-1 mb-0" style={{ color: 'grey' }}>
//                   Already have an account?{' '}
//                   <Link to="/login" className="link ms-2" style={{ color: '#1F316F' }}>
//                     Login
//                   </Link>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// export const Register = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     confirmPassword: '',
//     email: '',
//     role: '',
//   });

//   const [errors, setErrors] = useState({
//     password: '',
//     confirmPassword: ''
//   });

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [id]: value,
//     }));
//   };

//   const validatePassword = (password) => {
//     const hasUpperCase = /[A-Z]/.test(password);
//     const hasLowerCase = /[a-z]/.test(password);
//     const hasDigits = /\d/.test(password);
//     const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

//     let errorMsg = '';
//     if (!hasUpperCase) errorMsg += 'Password must contain at least one UPPERCASE letter. ';
//     if (!hasLowerCase) errorMsg += 'Password must contain at least one LOWERCASE letter. ';
//     if (!hasDigits) errorMsg += 'Password must contain at least one DIGIT. ';
//     if (!hasSpecialChars) errorMsg += 'Password must contain at least one SPECIAL CHARACTER. ';

//     return errorMsg.trim();
//   };

//   const handleBlur = () => {
//     const passwordError = validatePassword(formData.password);
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       password: passwordError
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const passwordError = validatePassword(formData.password);
//     if (passwordError) {
//       setErrors({ ...errors, password: passwordError });
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setErrors({ ...errors, confirmPassword: 'Passwords do not match!' });
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:8080/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert('Registration successful!');
//         // Optionally redirect to login page
//         window.location.href = '/login';
//       } else {
//         alert(`Registration failed! ${data.message}`);
//         console.error('Registration failed:', data);
//       }
//     } catch (error) {
//       alert('An error occurred during registration.');
//       console.error('An error occurred:', error);
//     }
//   };

//   return (
//     <section className="vh-100 pt-4" style={{ backgroundColor: 'white' }}>
//       <div className="container-fluid h-custom">
//         <div className="row d-flex justify-content-center align-items-center h-100">
//           <div className="col-md-9 col-lg-6 col-xl-5">
//             <img
//               src="/Logo.jpeg"
//               className="img-fluid"
//               alt="Sample image"
//               width="550px"
//               height="450px"
//               style={{ borderRadius: '25px 25px 250px 25px' }}
//             />
//           </div>
//           <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
//             <form onSubmit={handleSubmit}>
//               <div className="form-outline mb-4">
//                 <label className="form-label" style={{ color: '#1F316F' }} htmlFor="username">
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   id="username"
//                   className="form-control form-control-lg"
//                   placeholder="Username"
//                   value={formData.username}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="form-outline mb-3">
//                 <label className="form-label" style={{ color: '#1F316F' }} htmlFor="password">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   className="form-control form-control-lg"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   onBlur={handleBlur} // Trigger validation on blur
//                 />
//                 {errors.password && <small className="text-danger">{errors.password}</small>}
//               </div>

//               <div className="form-outline mb-3">
//                 <label className="form-label" style={{ color: '#1F316F' }} htmlFor="confirmPassword">
//                   Confirm Password
//                 </label>
//                 <input
//                   type="password"
//                   id="confirmPassword"
//                   className="form-control form-control-lg"
//                   placeholder="Confirm Password"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                 />
//                 {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
//               </div>

//               <div className="form-outline mb-4">
//                 <label className="form-label" style={{ color: '#1F316F' }} htmlFor="email">
//                   Email address
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="form-control form-control-lg"
//                   placeholder="email@gmail.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="form-outline mb-3">
//                 <label className="form-label" style={{ color: '#1F316F' }} htmlFor="role">
//                   Role
//                 </label>
//                 <input
//                   type="text"
//                   id="role"
//                   className="form-control form-control-lg"
//                   placeholder="Admin / Organizer / Attendee"
//                   value={formData.role}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="text-center text-lg-start mt-4 mb-4 pt-2">
//                 <button
//                   type="submit"
//                   className="btn btn-dark btn-lg"
//                   style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', backgroundColor: '#1F316F' }}
//                 >
//                   Register
//                 </button>

//                 <p className="small fw-bold mt-2 pt-1 mb-0" style={{ color: 'grey' }}>
//                   Already have an account?{' '}
//                   <Link to="/login" className="link ms-2" style={{ color: '#1F316F' }}>
//                     Login
//                   </Link>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };



import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css'; // Make sure to create this file to style the signup page
import { FaArrowLeft } from 'react-icons/fa';
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    role: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
    email: '',
  });

  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false,
    email: false,
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));

    // Validate fields on change
    if (id === 'password') {
      const passwordError = validatePassword(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: passwordError,
      }));
    }

    if (id === 'confirmPassword') {
      const confirmPasswordError = value !== formData.password ? 'Passwords do not match' : '';
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: confirmPasswordError,
      }));
    }

    if (id === 'email') {
      const emailError = validateEmail(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: emailError,
      }));
    }
  };

  const handleBlur = (e) => {
    const { id } = e.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [id]: true,
    }));
  };

  const validatePassword = (password) => {
    return password.length < 6 ? 'Password must be at least 6 characters long' : '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email) ? 'Invalid email address' : '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = !errors.password && !errors.confirmPassword && !errors.email;

    if (!isValid) {
      toast.error('Please correct the errors in the form.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Registration successful!');
        setTimeout(() => {
          window.location.href = '/login?registered=true';
        }, 2000);
      } else {
        const data = await response.json();
        const errorMessage = data.message || 'Registration failed!';
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error('An error occurred while registering.');
    }
  };

  return (
    <>
      <div className="auth-out">
      <button 
          className="back-button" 
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
        </button>
        <section className="auth-container">
          <ToastContainer />
          <div className="auth-left">
            <div className="auth-header">
              <h1 className="auth-title">Create an Account</h1>
              <p className="auth-subtitle">Join us today!</p>
            </div>
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-form-group">
                <label htmlFor="username" className="auth-form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  className="auth-form-input"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="auth-form-group">
                <label htmlFor="email" className="auth-form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="auth-form-input"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {touched.email && errors.email && (
                  <div className="auth-error-message">{errors.email}</div>
                )}
              </div>
              <div className="auth-form-group">
                <label htmlFor="password" className="auth-form-label">Password</label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  className="auth-form-input"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {touched.password && errors.password && (
                  <div className="auth-error-message">{errors.password}</div>
                )}

              </div>
              <div className="auth-form-group">
                <label htmlFor="confirmPassword" className="auth-form-label">Confirm Password</label>
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  className="auth-form-input"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <div className="auth-error-message">{errors.confirmPassword}</div>
                )}
              </div>
              <button type="submit" className="auth-submit-button">Sign up</button>
            </form>
            <p className="auth-signup-text">
              Already have an account? <Link to="/login" className="auth-link">Log in</Link>
            </p>
          </div>
          <div className="auth-right">
            <p className="auth-connect-text">Join Celebration.</p>
            <p className="auth-dashboard-text">Create your events with ease in an intuitive, customizable dashboard.</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Register;

