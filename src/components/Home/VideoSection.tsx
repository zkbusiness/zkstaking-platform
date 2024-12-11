import { useEffect, useRef } from "react";
import Image from "next/image";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
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
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleEnded);
      }
    };
  }, []);

  return (
    <div className=" video-wrapper flex h-fit w-full  overflow-hidden justify-center  absolute left-0  -z-50 items-center top-0 ">
      <video
        ref={videoRef}
        className="   hidden md:block min-w-[100%] lg:min-w-[120%] xl:min-w-[1500px]  max-w-none xl:-translate-y-32 "
        autoPlay
        muted
        loop={false} // Disable loop, since we handle restarting manually
      >
        <source src="/images/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Image
        src={"/images/hero-mobile.webp"}
        alt="hero-mobile"
        className=" block md:hidden m-36 "
        width={360}
        height={500}
      />
      <div
        className="h-28  absolute bottom-32  w-full hidden xl:block"
        style={{
          backgroundImage: "linear-gradient(to bottom, transparent  , black )",
        }}
      ></div>
    </div>
  );
};

export default VideoPlayer;
