import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { MdAddCircleOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';

const CourseBuilderForm = () => {

    const {register, handleSubmit, setValue, formState:{errors}} = useForm();
    const [editSectionName, setEditSectionName] = useState(null);
    const {course} = useSelector((state) => (state.course));

    const cancelEdit = () => {
        setEditSectionName(null);
        setValue('sectionName', "");
    }

  return (
    <div className='text-white'>
    <p>Course Builder</p>
    <form>
        <div>
            <label htmlFor='sectionName'>Section Name<sup>*</sup></label>
            <input
                id='sectionName'
                placeholder='Add section name'
                {...register('sectionName', {required:true})}
                className='w-full'
            />
            {
                errors.sectionName && (
                    <span>Section name is required</span>
                )
            }
        </div>

        <div className='mt-10 flex w-full'>
        <IconBtn
            type='Submit'
            text={editSectionName ? 'Edit Section Name' : 'Create Section'}
            outline={true}
            customClasses={'text-white'}
        >
            <MdAddCircleOutline className='text-yellow-50' size={50}/>
        </IconBtn>
            
            {editSectionName && (
                <button
                type='button'
                onClick={cancelEdit}
                className='text-sm text-richblack-500 underline ml-10'
                >
                    Cancel Edit
                </button>
            )}
       

        </div>
    </form>

    </div>
  )
}

export default CourseBuilderForm