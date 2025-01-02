'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LiveStreamState } from '../types/live-stream'
import { subscribeToLiveStream } from '../actions'

interface LiveStreamViewerProps {
  videoId: string
}

export function LiveStreamViewer({ videoId }: LiveStreamViewerProps) {
  const [state, setState] = useState<LiveStreamState>({
    isLive: false,
    videoId: null,
    startedAt: null,
  })

  useEffect(() => {
    const unsubscribe = async () => {
        return subscribeToLiveStream(videoId, (stream) => {
            setState({
              isLive: stream.is_live,
              videoId: stream.video_id,
              startedAt: stream.started_at,
            })
          })
    }

    return () => {
      unsubscribe()
    }
  }, [videoId])

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Live Stream Viewer</CardTitle>
      </CardHeader>
      <CardContent>
        {state.isLive ? (
          <div className="space-y-4">
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white">Live Stream Content</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
              <span>LIVE</span>
            </div>
          </div>
        ) : (
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Stream is offline</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

