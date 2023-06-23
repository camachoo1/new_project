import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate, useLocation } from 'react-router-dom'

const Callback = () => {
  const { handleRedirectCallback } = useAuth0()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleAuthResult = async () => {
      await handleRedirectCallback()
      navigate('/')
    }

    if (location.search.includes('code=') && location.search.includes('state=')) {
      handleAuthResult()
    }
  }, [handleRedirectCallback, navigate, location])

  return (
    <div>Loading...</div>
  )
}

export default Callback