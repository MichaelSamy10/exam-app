export const formatTime = (seconds: number) => {
  // Get minutes
  const min = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");

  // Get seconds
  const sec = (seconds % 60).toString().padStart(2, "0");

  // Format time to mm:ss
  return `${min}:${sec}`;
};
