import React, {
  ReactNode,
  useState,
  useEffect,
  useRef,
  ReactEventHandler,
} from "react";

interface VideoBackgroundWrapperProps {
  videoSrc?: string;
  children: ReactNode;
  className?: string;
  horizontalAlign?: "left" | "center" | "right";
  verticalAlign?: "top" | "center" | "bottom";
  onPlay?: () => void;
}

const VideoBackgroundWrapper: React.FC<VideoBackgroundWrapperProps> = ({
  videoSrc = "/images/hero.mp4",
  children,
  className = "",
  horizontalAlign = "center",
  verticalAlign = "center",
  onPlay = () => { },
}) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleEnded = () => {
      if (videoRef.current) {
        // Restart video at 7 seconds when it ends
        videoRef.current.currentTime = 8;
        videoRef.current.play();
      }
    };

    // Attach the 'ended' event listener to the video
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("ended", handleEnded);
      videoElement.addEventListener("playing", onPlay);
    }
    handleEnded();

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleEnded);
        window.removeEventListener("resize", handleResize);
        videoElement.removeEventListener("playing", onPlay);
      }
    };
  }, []);

  const getHorizontalAlignment = () => {
    switch (horizontalAlign) {
      case "left":
        return "object-left";
      case "right":
        return "object-right";
      default:
        return "object-center";
    }
  };

  const getVerticalAlignment = () => {
    switch (verticalAlign) {
      case "top":
        return "object-top";
      case "bottom":
        return "object-bottom";
      default:
        return "object-center";
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="fixed inset-0 w-screen h-screen overflow-hidden">
        <video
          src={videoSrc}
          ref={videoRef}
          muted
          playsInline
          className={`absolute top-1/2 xs:left-1/2 -translate-x-1/2  left-auto  -translate-y-1/2 min-w-full min-h-full w-auto h-auto max-w-none ${getHorizontalAlignment()} ${getVerticalAlignment()}`}
        />
      </div>
      <div className="absolute inset-0  from-transparent via-black/30 to-black opacity-70" />
      <div className="relative ">{children}</div>
    </div>
  );
};

export default VideoBackgroundWrapper;
