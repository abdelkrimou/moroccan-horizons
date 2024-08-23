function LoadingPage() {
  return (
    <div className="fixed center text-mainGreen bg-mainGreen/30 z-50  inset-0 flex justify-center items-center">
      <div className="animate-pulse flex gap-2 items-center ] justify-center ">
        <img className="w-[80px]" src="/logo.png" alt="logo" />
        <h2 className="text-[40px] ml-5 font-textFont">Loading ...</h2>
      </div>
    </div>
  );
}

export default LoadingPage;
