'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { clearNotification } from '@/redux/notificationSlice'
import toast from 'react-hot-toast'

export default function DiscountBanner() {
  const dispatch = useDispatch()
  const message = useSelector((state: RootState) => state.notification.message)

  useEffect(() => {
    if (message) {
      toast.success(message)
      dispatch(clearNotification())
    }
  }, [message, dispatch])

  return null
}
