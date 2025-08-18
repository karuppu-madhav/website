import React, { useEffect, useState } from 'react'
import { useUserActions } from '../actions/user'
import { useUserStore } from '../store/userStore'
import Logo from '../assets/madhav-logo.jpg'

export default function DataRoute({ children }) {

  const { getSettings,getAllProducts } = useUserActions()
  const { settings, loaded, setLoaded } = useUserStore()

  const [loading, setLoading] = useState(false)

  async function fetchData() {
    setLoading(true)
    await getSettings()
    await getAllProducts()
    setLoaded(true)
    setLoading(false)
  }

  useEffect(() => {
    if (!loaded)
      fetchData()
  }, [])

  if (loading) return <Loader />

  return <>{children}</>
}

const Loader = () => {
  return (
    <div className='w-screen h-screen fixed top-0 left-0 bg-white flex flex-col justify-center items-center' >
      <img className='animate-bounce w-[100px]' src={Logo} alt='madhav crackers' />
      <p>Loading...</p>
    </div>
  )
}
