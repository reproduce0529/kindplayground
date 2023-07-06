import { removeCookie } from "../util/cookies"
import { useEffect } from 'react'

export default function LogOut() {
  useEffect(() => {
    removeCookie('token')
    window.location.href='/'
  })

  return (
    <></>
  )
}
