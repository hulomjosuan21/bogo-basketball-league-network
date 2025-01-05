'use client'

import { useState, useEffect } from 'react'

export function useBrowserNotifications() {
    const [permission, setPermission] = useState<NotificationPermission>('default')

    useEffect(() => {
        if ('Notification' in window) {
            setPermission(Notification.permission)
        }
    }, [])

    const requestPermission = async () => {
        if (!('Notification' in window)) {
            console.error('This browser does not support notifications')
            return false
        }

        try {
            const permission = await Notification.requestPermission()
            setPermission(permission)
            return permission === 'granted'
        } catch (error) {
            console.error('Error requesting notification permission:', error)
            return false
        }
    }

    const showNotification = (title: string, options?: NotificationOptions) => {
        if (permission === 'granted') {
            return new Notification(title, options)
        }
        return null
    }

    return {
        permission,
        requestPermission,
        showNotification,
        isSupported: 'Notification' in window
    }
}

