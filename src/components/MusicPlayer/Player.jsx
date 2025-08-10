/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { displayMessage } from '../../utils/prompt';
import { pause } from '../../utils/player';

const Player = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData }) => {
  const ref = useRef(null);
  const { bitrate } = useSelector(state => state.player);

  // Handle play/pause based on isPlaying state
  useEffect(() => {
    if (ref.current) {
      if (isPlaying) {
        ref.current.play().catch(error => {
          console.error("Audio play failed:", error);
          displayMessage("Failed to play song. Please try another.");
          pause(); // Dispatch pause action if play fails
        });
      } else {
        ref.current.pause();
      }
    }
  }, [isPlaying]); // Dependency on isPlaying

  // Update volume
  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);

  // Update seek time
  useEffect(() => {
    if (ref.current) {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);

  // Determine audio source
  const audioSource = useMemo(() => {
    if (!activeSong?.downloadUrl || activeSong.downloadUrl.length === 0) {
      console.warn("No download URL found for active song:", activeSong);
      return '';
    }
    const selectedBitrate = activeSong.downloadUrl.find(url => url.quality === `${bitrate}kbps`);
    const source = selectedBitrate ? selectedBitrate.link : activeSong.downloadUrl[0]?.link;
    if (!source) {
      console.warn("No valid audio link found for active song:", activeSong);
    }
    return source;
  }, [activeSong, bitrate]); // Dependencies on activeSong and bitrate

  // Set audio source when it changes
  useEffect(() => {
    if (ref.current) {
      ref.current.src = audioSource;
      // If source changes while playing, try to play it
      if (isPlaying) {
        ref.current.play().catch(error => {
          console.error("Audio play failed after source change:", error);
          displayMessage("Failed to play song after source update. Please try another.");
          pause();
        });
      }
    }
  }, [audioSource]); // Dependency on audioSource

  return (
    <audio
      ref={ref}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;