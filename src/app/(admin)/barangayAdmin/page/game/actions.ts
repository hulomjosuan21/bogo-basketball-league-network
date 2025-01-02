import { createClient } from '@/utils/supabase/server'
import { LiveStream } from './types/live-stream'

export async function subscribeToLiveStream(videoId: string, callback: (state: LiveStream) => void) {
  const supabase = await createClient()
  
  const channel = supabase
    .channel(`live_stream_${videoId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'live_streams',
        filter: `video_id=eq.${videoId}`,
      },
      (payload) => {
        callback(payload.new as LiveStream)
      }
    )
    .subscribe()

  return () => {
    channel.unsubscribe()
  }
}

export async function startLiveStream(videoId: string) {
  const supabase = await createClient()
  
  // First check if the stream exists
  const { data: existingStream } = await supabase
    .from('live_streams')
    .select()
    .eq('video_id', videoId)
    .single()

  if (existingStream) {
    // If it exists, just update it
    const { data, error } = await supabase
      .from('live_streams')
      .update({
        is_live: true,
        started_at: new Date().toISOString(),
      })
      .eq('video_id', videoId)
      .select()
      .single()

    if (error) throw error
    return data
  } else {
    // If it doesn't exist, insert it
    const { data, error } = await supabase
      .from('live_streams')
      .insert({
        video_id: videoId,
        is_live: true,
        started_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return data
  }
}

export async function stopLiveStream(videoId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('live_streams')
    .update({
      is_live: false,
      started_at: null,
    })
    .eq('video_id', videoId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Add a helper function to check stream status
export async function getStreamStatus(videoId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('live_streams')
    .select()
    .eq('video_id', videoId)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
    throw error
  }

  return data
}

