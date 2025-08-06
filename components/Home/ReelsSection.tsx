'use client';

import { useRef, useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Volume2, VolumeX, Play, Pause, Camera,Search, SquarePlus } from 'lucide-react';
import { GoHome } from "react-icons/go";

import Image from 'next/image';

const ReelsSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="relative w-[320px] md:w-[370px] aspect-[9/19] mx-auto border-[14px] border-black rounded-[48px] bg-black overflow-hidden shadow-2xl">
      
      {/* النوتش */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-black rounded-b-[20px] z-30" />

      {/* الفيديو */}
      <video
        ref={videoRef}
        src="/videos/evavideo.mp4" // قم بوضع الفيديو هنا
        className="w-full h-full object-contain"
        muted={isMuted}
        loop
        playsInline
        autoPlay
      />

      {/* العنوان العلوي Reels */}
      <div className="absolute top-6 left-4 right-4 z-30 flex justify-between items-center text-white px-2">
        <h1 className="text-lg font-semibold">Reels</h1>
        <Camera size={20} />
      </div>

      {/* عناصر Reels */}
      <div className="absolute bottom-20 left-4 right-4 z-30 text-white flex justify-between items-end">
        {/* معلومات المستخدم */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Image
              src="/images/evaa.jpg" // صورة البروفايل هنا
              alt="EVA Profile"
              width={36}
              height={36}
              className="rounded-full border border-white"
            />
            <p className="text-xs font-bold">EvaSaudiRealEstate@</p>
<a href='https://www.instagram.com/evasaudirealestate/' target='_blank'  className="py-1 px-3 border border-white rounded-md hover:border hover:border-transparent hover:bg-gradient-to-r hover:from-[#faf0b1] hover:to-[#f2df56] transition-all duration-300">
  متابعة
</a >
          </div>
         
          <p className="text-xs leading-snug max-w-[200px]">احنا الدرع مو بس سطر وبيان</p>
        
        </div>

        {/* أيقونات الجنب */}
        <div className="flex flex-col items-center gap-4">
          <button onClick={toggleLike} className="flex flex-col items-center">
            <Heart className={liked ? 'text-red-500 fill-red-500' : ''} />
            <span className="text-[10px]">158.4K</span>
          </button>
          <div className="flex flex-col items-center">
            <MessageCircle />
            <span className="text-[10px]">12.7K</span>
          </div>
          <div className="flex flex-col items-center">
            <Share2 />
            <span className="text-[10px]">3.1K</span>
          </div>
          <Bookmark />
          <button onClick={toggleMute}>
            {isMuted ? <VolumeX /> : <Volume2 />}
          </button>
          <button onClick={togglePlay}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
        </div>
      </div>

      {/* الشريط السفلي مثل إنستجرام */}
      <div className="absolute bottom-0 left-0 w-full h-14 bg-black bg-opacity-60 flex justify-around items-center text-white text-xs z-30">
        <span className="flex flex-col items-center">
          <GoHome size={24} />

        </span>
        <span className="flex flex-col items-center">
          <Search />
        </span>
        <span className="flex flex-col items-center text-white">
          <SquarePlus size={24} />
        </span>
        <span className="flex flex-col items-center">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50" fill="#ffffff">
    <path d="M13.34 4.13L20.26 16H4v-1C4 9.48 8.05 4.92 13.34 4.13zM33.26 16L22.57 16 15.57 4 26.26 4zM46 15v1H35.57l-7-12H35C41.08 4 46 8.92 46 15zM4 18v17c0 6.08 4.92 11 11 11h20c6.08 0 11-4.92 11-11V18H4zM31 32.19l-7.99 4.54C21.68 37.49 20 36.55 20 35.04v-9.08c0-1.51 1.68-2.45 3.01-1.69L31 28.81C32.33 29.56 32.33 31.44 31 32.19z"/>
  </svg>
        </span>
        <span className="flex flex-col items-center">
<Image 
  src="/images/evaa.jpg" 
  width={24} 
  height={24} 
  alt="Profile"
  className="w-6 h-6 object-cover rounded-full border-2 border-white"
/>        </span>
      </div>
    </div>
  );
};

export default ReelsSection;