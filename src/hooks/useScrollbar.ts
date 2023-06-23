// Track, thumb and active are derieved from macOS 10.15.7
const scrollBar = {
  track: 'transparent',
  thumb: '#00000066',
  active: '#959595',
};

const useScrollbar = (options = scrollBar) => {
  return {
    scrollbarColor: `${options.thumb} ${options.track}`,
    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
      backgroundColor: options.track,
      width: 12,
      height: 12,
    },
    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
      borderRadius: 2,
      backgroundColor: options.thumb,
      minHeight: 24,
      border: `3px solid ${options.track}`,
      backgroundClip: 'content-box',
    },
    '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
      backgroundColor: options.active,
    },
    '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
      backgroundColor: options.active,
    },
    '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
      backgroundColor: options.active,
    },
    '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
      backgroundColor: options.track,
    },
  };
};

export default useScrollbar;
