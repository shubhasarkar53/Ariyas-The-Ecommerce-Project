import React, { Fragment } from 'react'
import Loader from '../Loader/Loader'
import { Route } from 'react-router-dom/cjs/react-router-dom.min'

const ProtectedRoute = ({component:Component,...rest}) => {
  return (
    <Fragment>
        {
            !loading&&(
                <Route
                    {...rest}
                    render={(props)=>{
                        if(!isAuthenticated){
                            history.push("/login")
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