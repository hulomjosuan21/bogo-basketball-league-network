'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LiveStreamState } from '../types/live-stream'
import { getStreamStatus, startLiveStream, stopLiveStream, subscribeToLiveStream } from '../actions'

interface AdminLiveStreamProps {
  videoId: string
}

export function AdminLiveStream({ videoId }: AdminLiveStreamProps) {
  const [state, setState] = useState<LiveStreamState>({
    isLive: false,
    videoId: null,
    startedAt: null,
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Initial fetch of stream status
    const fetchInitialStatus = async () => {
      try {
        const status = await getStreamStatus(videoId)
        if (status) {
          setState({
            isLive: status.is_live,
            videoId: status.video_id,
            startedAt: status.started_at,
          })
        }
      } catch (error) {
        console.error('Failed to fetch initial status:', error)
      }
    }

    fetchInitialStatus()

    // Subscribe to changes
    subscribeToLiveStream(videoId, (stream) => {
      setState({
        isLive: stream.is_live,
        videoId: stream.video_id,
        startedAt: stream.started_at,
      })
    })


  }, [videoId])

  const handleStartStream = async () => {
    setIsLoading(true)
    try {
      await startLiveStream(videoId)

    } catch (error) {
      console.error('Failed to start stream:', error)

    } finally {
      setIsLoading(false)
    }
  }

  const handleStopStream = async () => {
    setIsLoading(true)
    try {
      await stopLiveStream(videoId)

    } catch (error) {
      console.error('Failed to stop stream:', error)

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Live Stream Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Status: {state.isLive ? 'Live' : 'Offline'}</span>
          <span className={`h-3 w-3 rounded-full ${state.isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`} />
        </div>
        {state.startedAt && (
          <div>Started at: {new Date(state.startedAt).toLocaleTimeString()}</div>
        )}
        <div className="flex gap-4">
          <Button
            onClick={handleStartStream}
            disabled={state.isLive || isLoading}
            className="flex-1"
            variant={state.isLive ? "secondary" : "default"}
          >
            {isLoading ? "Loading..." : "Start Live"}
          </Button>
          <Button
            onClick={handleStopStream}
            disabled={!state.isLive || isLoading}
            className="flex-1"
            variant="destructive"
          >
            {isLoading ? "Loading..." : "Stop Live"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

