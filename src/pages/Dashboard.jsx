import React from 'react'
import { useSelector } from 'react-redux'
import {Outlet} from "react-router-dom"
import Sidebar from "../Components/core/Dashboard/Sidebar"

const Dashboard = () => {
    const {loading: authLoading} = useSelector( (state) => state.profile);
    const {loading: profileLoading} = useSelector( (state) => state.auth);

    if(authLoading || profileLoading){
        return (
            <div className='mt-10'>
                Loading...
            </div>
        )
    } 


  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
        <Sidebar/>

        <div className='h-[calc(100vh-3.5rem)] overflow-auto'>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                <Outlet/>
            </div>

        </div>
    </div>
  )
}

export default Dashboard