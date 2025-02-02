import { useForm } from 'react-hook-form';
import { CiHome } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from './SocialLogin';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const Register = () => {
    const { createUser, updateUser } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const img_hosting_key = import.meta.env.VITE_image_hosting_key;
    const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async(data) => {
        // console.log(data);
        let profile_img = null;
        if(data.image.length){
            const res = await axiosPublic.post(img_hosting_api, {image: data.image[0]}, {
                headers: {
                    "content-type": 'multipart/form-data'
                }
            });
            profile_img = res.data.data.display_url;
        }
        
        // console.log(new Date().toISOString().slice(0,10));
        const user = {
            displayName: data.name,
            photoURL: profile_img,
            email: data.email,
            provider: null,
            password: data.password,
            role: 'student',
            req_status: 'No',
            admin_status: "not_attempted",
            instructor_status: 'not_attempted',
            createdAt: new Date().toISOString().slice(0,10),
        }
        // console.log(user);
        axiosPublic.post('/users', user)

        createUser(data.email, data.password)
        .then(res=>{
            console.log(res);
            updateUser(data.name, profile_img)
            .then(()=>{
                // console.log('profile updated successfully!!');
                Swal.fire({
                    title: "Great job!",
                    text: "User Created Successfully!",
                    icon: "success"
                  });
                navigate('/');
            })
            .catch(error=>{
                // console.log(error.message);
                Swal.fire({
                    title: "User Created But!",
                    text: error.message,
                    icon: "warning"
                  });
                navigate('/');
            })
        })
        .catch(error=>{
            // console.log(error.message);
            Swal.fire({
                title: "Unfortunately!",
                text: error.message,
                icon: "warning"
              });
        })
    }

    return (
        <div className='min-h-screen py-10 bg-base-200'>
            <div className="flex justify-center items-center gap-3">
                <img className="w-10 h-10 rounded" src="https://cdn-icons-png.flaticon.com/128/3048/3048425.png" alt="web Icon" />
                <h2 className="text-gray-800 text-xl">Elevate<span className="text-2xl text-red-600">Ex</span></h2>
            </div>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="w-[50%] text-center space-y-4 lg:text-left">
                        <Link to={'/'} className='mb-5 btn btn-outline inline-flex justify-start items-center gap-2'>
                            <span className='text-xl'>Back to </span>
                            <CiHome className='font-bold text-3xl' />
                        </Link>
                        <img src="https://app.10minuteschool.com/assets/login/routine3.svg" alt="login image" />
                        <div className='space-y-2'>
                            <h1 className="text-5xl font-bold">Unlock Your Potential</h1>
                            <p>Explore a world of knowledge and take control of your future with ElevateEx. Your potential is limitless. ElevateEx is here to help you realize it.</p>
                        </div>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <h2 className='text-xl text-center font-semibold'>Sign Up Now</h2>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Your Name</span>
                                </label>
                                <input type="text" name="name" placeholder={'Enter Your Name'} {...register("name", { required: true })} className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Your Email</span>
                                </label>
                                <input type="email" name="email" placeholder={'Enter Your Email'} {...register("email", { required: true })} className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder='Enter Password here' {...register("password", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/, minLength: 6, maxLength: 12 })} className="input input-bordered" />
                                {/* {errors.password && <span className='text-xs font-mulish text-red-600 mt-1'>This field is required</span>} */}
                                {errors?.password?.type == 'maxLength' && <span className='text-xs font-mulish text-red-600 mt-1'>Maximum password length should be 12 characters</span>}
                                {errors?.password?.type == 'minLength' && <span className='text-xs font-mulish text-red-600 mt-1'>Minimum password length should be 6 characters</span>}
                                {errors?.password?.type == 'pattern' && <span className='text-xs font-mulish text-red-600 mt-1'>password should at least one capital letter, one small letter and a special character</span>}
                            </div>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Upload Your Profile Image</span>
                                </div>
                                <input type="file"  {...register("image")} name='image' className="file-input file-input-bordered w-full max-w-xs" required />
                            </label>
                            <div className="form-control mt-2">
                                <input className="btn bg-red-600 text-white hover:bg-red-500" type='submit' value={'SignUp'} />
                            </div>
                            <div className="divider">OR Sign in with</div>
                            <SocialLogin/>
                            <p className='w-full text-center'>Already have an Account? <Link className='text-red-400' to={'/login'}>Sign in</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;