import Container from "../components/layout/Container";
function DownloadApp() {
  return (
    <Container>
      <div className=" min-h-dvh text-[45px] font-headFont py-20">
        <h2 className="text-center">Our app is coming soon !</h2>
        <p className="text-xl text-mainGreen mt-10 bg-mainYellow/10 m-auto w-fit  text-center">
          Stay Tuned!
          <span className="text-[16px] text-accentGreen ml-4 font-mainFont">
            {" "}
            Our team is working hard to bring this to you soon.
          </span>
        </p>
      </div>
    </Container>
  );
}

export default DownloadApp;
