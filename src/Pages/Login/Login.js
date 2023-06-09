import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Login = () => {
  const {login} = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";
  
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email,password)
          .then(result => {
            const user = result.user;

            const currentUser = {
              email: user.email
            };

            console.log(currentUser);

            // get jwt token
            fetch('http://localhost:5000/jwt', {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(currentUser)
            })
              .then(res => res.json())
              .then(data => {
                console.log(data);

                // local storage is the easiest, but not the best place to store jwt token
                localStorage.setItem('genius-token', data.token);
              })

            navigate(from, {replace:true});
          })
          .then(err => console.error(err));
    }
    return (
        <div className="hero w-full my-20">
          <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
            <div className="text-center lg:text-left">
              <img className='w-4/5' src={img} alt="" />
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
                <h1 className="text-5xl font-bold text-center">Login</h1>
              
              <form onSubmit={handleLogin} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="text" name='email' placeholder="Email" className="input input-bordered" required/>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="password" name='password' placeholder="Password" className="input input-bordered" required/>
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                  </label>
                </div>
                <div className="form-control mt-6">
                    <input type="submit" value="Login" className="btn btn-primary"/>
                </div>
              </form>
              <p className='text-center'>New to Genius Car? <Link className='text-orange-600 font-bold' to='/signup'>Sign Up</Link> </p>
            </div>
          </div>
        </div>
    );
};

export default Login;