const WatchFrame = ({src}) => {
  return (
    <iframe
      width="100%"
      height="100%"
      frameBorder="0"
      scrolling="no"
      allowFullScreen="true"
      className="w-full h-screen"
      src={src}
    ></iframe>
  );
};

export default WatchFrame;
