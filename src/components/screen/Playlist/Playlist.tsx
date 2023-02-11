import React, { useState, useEffect, useMemo } from "react";
import useSound from "use-sound";
import { Scratch } from "@/components/common";
import { SOUNDS } from "@/constants/sounds";
import { PlaylistProps } from "./Playlist.type";

const MAX_LENGTH = 15;

const Playlist = (props: PlaylistProps) => {
  const { setOpen, isOpen } = props;

  const [isPlaying, setIsPlaying] = useState(false);
  const [nowIndex, setNowIndex] = useState(0);
  const [isRandom, setIsRandom] = useState(false);

  const [play, { pause, stop }] = useSound(SOUNDS[nowIndex].path, {
    volume: 0.5,
    onend: () => {
      if (isRandom) {
        setNowIndex(Math.floor(Math.random() * SOUNDS.length));
      } else {
        if (nowIndex === SOUNDS.length - 1) {
          setNowIndex(0);
        } else {
          setNowIndex(nowIndex + 1);
        }
      }
    },
  });

  const soundName = useMemo(() => {
    if (SOUNDS[nowIndex].name.length > MAX_LENGTH) {
      return SOUNDS[nowIndex].name.slice(0, MAX_LENGTH) + "...";
    }
    return SOUNDS[nowIndex].name;
  }, [nowIndex]);

  const soundArtist = useMemo(() => {
    if (SOUNDS[nowIndex].artist.length > MAX_LENGTH) {
      return SOUNDS[nowIndex].artist.slice(0, MAX_LENGTH) + "...";
    }
    return SOUNDS[nowIndex].artist;
  }, [nowIndex]);

  const handleIndex = (mode: "next" | "prev") => {
    stop();
    switch (mode) {
      case "next":
        if (nowIndex === SOUNDS.length - 1) {
          setNowIndex(0);
        } else {
          setNowIndex(nowIndex + 1);
        }
        break;
      case "prev":
        if (nowIndex === 0) {
          setNowIndex(SOUNDS.length - 1);
        } else {
          setNowIndex(nowIndex - 1);
        }
        break;
    }
  };

  useEffect(() => {
    if (isPlaying) {
      play();
    } else {
      pause();
    }
  }, [isPlaying, play, pause]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className={`
        absolute z-30 m-3 bg-slate-800 text-sm flex flex-col items-center justify-center w-fit pt-1 pb-5 px-3 rounded-xl border-2 border-gray-200 shadow-lg shadow-gray-200 transition-all 
        ${isOpen ? "visible" : "collapse opacity-0"}
        `}
    >
      <div className="my-2 w-full flex flex-row justify-between">
        <button
          className="rounded-sm border-2 border-gray-200 w-6 h-6 flex justify-items-center cursor-pointer"
          onClick={() => {
            setOpen(false);
          }}
        >
          <span className="m-auto">×</span>
        </button>
        <div className="w-4/5 bg-gray-200 text-slate-800 rounded-sm px-2 flex items-center">
          {"///MUSIC/////////////"}
        </div>
      </div>
      <div className="w-fit h-fit border-x-2 border-gray-200 px-5">
        <p className="text-gray-200 mr-auto mb-8 border-b-2 py-1 w-fit border-gray-200">
          imaimai&#39;s playlist
        </p>
        <Scratch togglePlay={togglePlay} />
      </div>
      <div className="flex flex-row gap-10 text-gray-200 mt-5 place-items-center">
        <div>
          <p className="font-bold">NAME</p>
          <p className="text-ellipsis overflow-hidden">{soundName}</p>
        </div>
        <div>
          <p className="font-bold">ARTIST</p>
          <p>{soundArtist}</p>
        </div>
      </div>
      <div className="text-xl mt-5 flex flex-row gap-10">
        <div
          className="flex justify-items-center cursor-pointer border-2 border-gray-200 rounded-full h-10 w-10 hover:border-4 transition-all"
          onClick={() => {
            handleIndex("prev");
          }}
        >
          <span className="m-auto">👈</span>
        </div>
        <div
          className={`flex justify-items-center cursor-pointer border-2 border-gray-200 rounded-full h-10 w-10 hover:border-4 transition-all 
              ${isRandom && "border-orange-300"}
              `}
          onClick={() => {
            setIsRandom(!isRandom);
          }}
        >
          <span className="m-auto">🎲</span>
        </div>
        <div
          className="flex justify-items-center cursor-pointer border-2 border-gray-200 rounded-full h-10 w-10 hover:border-4 transition-all"
          onClick={() => {
            handleIndex("next");
          }}
        >
          <span className="m-auto">👉</span>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
