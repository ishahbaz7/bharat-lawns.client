import spinner from "/assets/loading-spinner.gif";

function Loading() {
  return (
    <div className="fixed top-0  left-0 z-[100] h-screen w-screen">
      <div className="flex h-full w-full items-center justify-center text-3xl text-white">
        <img width={250} height={250} src={spinner} alt="image" />
      </div>
    </div>
  );
}

export default Loading;
