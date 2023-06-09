import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const SignUp = () => {
    const {createUser} = useContext(AuthContext);


    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        // create user
        createUser(email,password)
        .then(result => {
            const user = result.user;
            console.log(user);
        })
        .catch(err => console.error(err));
    }
    return (
        <div className="hero w-full my-20">
          <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
            <div className="text-center lg:text-left">
              <img className='w-4/5' src={img} alt="" />
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
                <h1 className="text-5xl font-bold text-center">Sign Up</h1>
              
              <form onSubmit={handleSignUp} className="card-body">
              <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="text" name='email' placeholder="Email" className="input input-bordered" required/>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input type="text" name='name' placeholder="Your Name" className="input input-bordered" required/>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="password" name='password' placeholder="Password" className="input input-bordered" required/>

                </div>
                <div className="form-control mt-6">
                    <input type="submit" value="Sign Up" className="btn btn-primary"/>
                </div>
              </form>
              <p className='text-center'>Already have an account? <Link className='text-orange-600 font-bold' to='/login'>Login</Link> </p>
            </div>
          </div>
        </div>
    );
};

export default SignUp;