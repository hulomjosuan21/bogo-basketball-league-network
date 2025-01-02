export interface LiveStream {
    id: string
    video_id: string
    is_live: boolean
    started_at: string | null
    created_at: string
  }
  
  export interface LiveStreamState {
    isLive: boolean
    videoId: string | null
    startedAt: string | null
  }
  
  