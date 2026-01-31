import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form';
import CountryCode from '../../data/countrycode.json'
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful},
    } = useForm();

    const submitContactForm = async(data) => {
        console.log("Logging data", data);
        try{
            setLoading(true);
            // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            const response = {status:"OK"}
            console.log("Logging response", response);
            setLoading(false);
        }
        catch(error){
            console.log("Error:", error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:""
            })
        }
    },[isSubmitSuccessful, reset])

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>

        <div className='flex flex-col gap-6'>

            <div className='flex gap-5'>
                {/* firstName */}
                <div className='flex flex-col'>
                    <label htmlFor='firstname'>First Name</label>
                    <input 
                        type='text'
                        name='firstname'
                        id='firstname'
                        placeholder='Enter first name'
                        className='text-black'
                        {...register("firstname", {required: true})}
                    />
                    {
                        errors.firstname && (
                            <span>
                                please enter your name
                            </span>
                        )
                    }
                </div>

                    {/* lastName */}
                <div className='flex flex-col'>
                    <label htmlFor='lastname'>First Name</label>
                    <input 
                        type='text'
                        name='lastname'
                        id='lastname'
                        placeholder='Enter last name'
                        className='text-black'
                        {...register("lastname")}
                    />
                    
                </div>

                {/* email */}
                <div className='flex flex-col'>
                    <label htmlFor='email'>Email Address</label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Enter your email address'
                        className='text-black'
                        {...register("email", {required: true})}
                    />
                    {
                        errors.email && (
                            <span>
                                Please enter your email address
                            </span>
                        )
                    }
                </div>
            </div>

            {/* phoneNo */}
            <div className='flex flex-col '>
                <label htmlFor='phonenumber'>Phone Number</label>
                <div className='flex flex-row gap-1'>
                    {/* dropdown */}
                    <div className='flex w-[80px] gap-5' >
                        <select
                            name='dropdown'
                            id='dropdown'
                            className='bg-yellow-50 w-[80px]'
                            {...register("countryCode", {required: true})}
                        >
                        {
                            CountryCode.map( (element, index) => {
                                return (
                                    <option key={index} value={element.code}>
                                        {element.code} - {element.country}
                                    </option>
                                )
                            })
                        }

                        </select>
                    </div>

                    <div>
                        <input 
                            type='number'
                            name='phonenumber'
                            id='phonenumber'
                            placeholder='12345 67890'
                            className='text-black  w-[calc(100%-90px)]'
                            {...register("phoneNo", 
                            {
                                required: {value: true, message: "Please enter your phone number"},
                                maxLength: {value: 10, message: "Phone number cannot exceed 10 digits"},
                                minLength: {value: 8, message: "Phone number must be at least 10 digits"}
                            }

                            )}
                        />
                    </div>

                </div>
                {
                    errors.phoneNo && (
                        <span>
                            {errors.phoneNo.message}
                        </span>

                    )
                }
            </div>

                
            {/* message */}
            <div className='flex flex-col'>
                <label htmlFor='message'>Message</label>
                <textarea
                    name='message'
                    id='message'
                    cols='30'
                    rows='7'
                    placeholder='Enter your message here'
                    className='text-black'
                    {...register("message", {required: true})}
                />
                {
                    errors.message && (
                        <span>
                            Please enter your email message
                        </span>
                    )
                }
            </div>
            

            <button type='submit'
            className='rounded-md bg-yellow-50 text-ceter px-6 text-[16px] font-bold text-black'>
                send message
            </button>

        </div>

    </form>
  )
}

export default ContactUsForm