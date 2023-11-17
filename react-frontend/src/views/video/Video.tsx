import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";

export const Video = () => {
  const [state, setState] = useState<OnProgressProps>();

  const handleProgress = (progressState: OnProgressProps) => {
    console.log("onProgress", progressState);
    setState(progressState);
  };

  const nodeRef = useRef<ReactPlayer | null>(null);
  return (
    <div className="h-full ">
      <div className="shadow-lg border flex items-start justify-start">
        <ReactPlayer
          ref={nodeRef}
          url="http://4.236.205.249:8080/video/0011aecaded0c2c6cbaf107611ccba7e.mp4"
          controls
          width="60%"
          height="90%"
          onProgress={handleProgress}
        />

        <div>{state?.playedSeconds.toFixed() || 0}</div>
      </div>
    </div>
  );
};
