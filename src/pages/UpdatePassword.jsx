import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { resetPassword } from '../services/operations/authAPI'

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation()

    const {loading} = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const {password, confirmPassword} = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value,
            }
        ))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(password, confirmPassword, token))
    }

  return (
    <div className='text-white'>
    {
        loading ? (
            <div>Loading ...</div>
        ) : (
            <div>
                <h1>Choose New Password</h1>
                <p>Almost done. Enter new password and you are all set</p>
                <form onSubmit={handleOnSubmit}>
                    <label>
                        <p>New Password<sup >*</sup></p>
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name='password'
                            value={password}
                            onChange={handleOnChange}
                            placeholder='Enter New Password'
                        />
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}>
                           {showPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                    </label>

                    <label>
                        <p>Confirm New Password<sup >*</sup></p>
                        <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={handleOnChange}
                            placeholder='Confirm Password'
                        />
                        <span
                            onClick={() => setShowConfirmPassword((prev) => !prev)}>
                           {showConfirmPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                    </label>

                    <button type='submit'>
                        Reset Password
                    </button>

                </form>
                
                <div>
                    <Link to="/login">
                        <p>Back to login</p>
                    </Link>
                </div>

            </div>
        )
    }

    </div>
  )
}

export default UpdatePassword