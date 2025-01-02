import { AdminLiveStream } from "./components/admin-live-stream"
import { LiveStreamViewer } from "./components/live-stream-viewer"

export default function Page() {
  const videoId = "example-video-124"

  return (
    <div className="container mx-auto p-4 space-y-8">
      <AdminLiveStream videoId={videoId} />
      <LiveStreamViewer videoId={videoId} />
    </div>
  )
}

