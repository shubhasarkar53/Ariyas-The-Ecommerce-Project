/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react'
import Loader from '../Loader/Loader'
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({component:Component,...rest}) => {


    const{loading,isAuthenticated,user}=useSelector(state=>state.user)

  return (
    <Fragment>
        {
            !loading&&(
                <Route
                    {...rest}
                    render={(props)=>{
                        if(!isAuthenticated){
                            return <Redirect to={'/login'}/>
                        }
                        return <Component {...props}/>
                    }}
                />
            )
        }
    </Fragment>
  )
}

export default ProtectedRoute