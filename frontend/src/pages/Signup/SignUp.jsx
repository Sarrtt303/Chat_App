import {Link} from "react-router-dom";
import {useState} from "react";
// import useSignup from "";
 

const SignUp=()=>{

    const[inputs, setInputs]= useState({
        fullName:"",
        username: "",
		password: "",
		confirmPassword: "",
		gender: "",
    });

    // hooks are used that are defined seperately to be used globally
    const { loading, signup } = useSignup();//to be added

    const handleCheckboxChange=(gender)=>{
        setInputs({...inputs, gender});
    };

    const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
             <div>
                <h1> Sign up<span> ChatApp</span></h1>
                <form onSubmit={handleSubmit}>
                    <div>
                    <label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input
							type='text'
							placeholder='John Doe'
							className='w-full input input-bordered  h-10'
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
                    </div>
                    <div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='johndoe'
							className='w-full input input-bordered h-10'
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
					</div>
                    <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

					<Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
						href='#'
					>
						Already have an account?
					</Link>
                    <div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
					</div>
                </form>
             </div>
        </div>
    );
}
export default SignUp;
