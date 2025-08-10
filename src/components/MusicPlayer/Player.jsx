/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Player = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData }) => {
  const ref = useRef(null);
  const { bitrate } = useSelector(state => state.player);

  // eslint-disable-next-line no-unused-expressions
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);
  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);

  const getAudioSource = () => {
    if (!activeSong?.downloadUrl) return '';
    const selectedBitrate = activeSong.downloadUrl.find(url => url.quality === `${bitrate}kbps`);
    return selectedBitrate ? selectedBitrate.link : activeSong.downloadUrl[0]?.link; // Fallback to first available if specific bitrate not found
  };

  return (
    <audio
      src={getAudioSource()}
      ref={ref}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;