import Container from "../components/layout/Container";
function Aboutus() {
  return (
    <Container>
      <main className="min-h-screen text-mainGreen text-center flex flex-col gap-10 font-textFont">
        <div className="flex flex-col text-[18px] mt-10 gap-4">
          <h2 className=" text-center text-[35px] border-b-[0.5px] pb-3 w-fit m-auto border-mainGreen font-light">
            Discover the Heart of Morocco with Us:
          </h2>
          <p className="font-light">
            At Moroccan Horizons, we believe that travel is more than just
            visiting new places—it's about creating unforgettable experiences
            and connecting with the soul of a destination. Founded by passionate
            explorers with a deep love for Morocco, our mission is to showcase
            the beauty, diversity, and warmth of this incredible country to the
            world.
          </p>
          <p className="font-light">
            With years of experience in the travel industry, our team is
            dedicated to crafting authentic and immersive journeys that go
            beyond the ordinary. From the bustling souks of Marrakech to the
            serene sands of the Sahara, every tour we offer is designed to
            reveal the true essence of Morocco, allowing you to experience its
            rich history, vibrant culture, and breathtaking landscapes.
          </p>
        </div>
        <div className="flex md:flex-row gap-4 flex-col lg:items-start items-center">
          <div className="md:w-1/2  border-[1px] overflow-hidden rounded-lg">
            <img
              className="w-full hover:scale-[1.025] transition-all ease-in-out duration-200  h-[600px] m-auto object-cover"
              src="/vision.jpeg"
              alt="vision"
            />
            <h3 className="text-center text-2xl bg-mainYellow/20   m-auto px-5 py-2  font-headFont">
              Our Vision
            </h3>
            <p className="font-light p-4">
              To be the leading provider of transformative travel experiences in
              Morocco, where every journey opens new horizons.
            </p>
          </div>
          <div className="md:w-1/2 border-[1px]  overflow-hidden rounded-lg">
            <img
              className="w-full h-[600px] hover:scale-[1.025] transition-all ease-in-out duration-200 m-auto object-cover"
              src="/mission.jpeg"
              alt="mission"
            />
            <h3 className="text-center text-2xl bg-mainYellow/20   m-auto px-5 py-2  font-headFont">
              Our Mission
            </h3>
            <p className="font-light   p-4">
              To offer personalized and sustainable tours that reflect the
              unique character of Morocco, ensuring our guests return home with
              cherished memories .
            </p>
          </div>
        </div>

        <div>
          <h3 className=" text-center text-2xl border-b-[0.25px] w-fit m-auto pb-3 mb-10 border-mainGreen">
            Why Choose Us?
          </h3>
          <div className="flex flex-col lg:flex-row gap-2 mt-8">
            <p className="font-light leading-[28px] first-letter:text-3xl">
              <span className="block font-medium text-lg mb-2 underline">
                Local Expertise
              </span>{" "}
              We’re not just tour operators—we’re locals who know Morocco inside
              and out. We’ll take you off the beaten path to discover hidden
              gems that few travelers ever see.
            </p>
            <p className="font-light leading-[28px] first-letter:text-3xl">
              <span className="block font-medium text-lg mb-2 underline">
                Authentic Experiences
              </span>{" "}
              We pride ourselves on providing experiences that are as genuine as
              they are memorable. Whether it's a traditional Berber village stay
              or a cooking class with a local chef, authenticity is at the heart
              of what we do.
            </p>
            <p className="font-light leading-[28px] first-letter:text-3xl">
              <span className="block font-medium text-lg mb-2 underline">
                Sustainability Commitment
              </span>{" "}
              We care about the places we visit and the people who live there.
              Our tours are designed with sustainability in mind, supporting
              local communities and preserving the natural beauty of Morocco.
            </p>
          </div>
        </div>
        <p className="my-10">
          Join us on a journey where every adventure is a story, every
          destination is a discovery, and every moment is a memory waiting to be
          made.
        </p>
      </main>
    </Container>
  );
}

export default Aboutus;
