/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'

const Account = () => {


  const {user,loading,error,isAuthenticated} = useSelector(state=>state.user)

  return (
    <>
    <div>Account</div>
    <div>{user.name}</div>
    <img src={user.avatar.url} alt="" />
    </>
  )
}

export default Account