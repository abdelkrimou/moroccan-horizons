import Container from "../components/layout/Container";
import { CiInstagram } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import ContactForm from "../components/common/ContactForm";

function Contact() {
  return (
    <Container>
      <div className="min-h-screen font-textFont text-accentGreen p-5 bg-mainGreen/5 my-10">
        <div>
          <h2 className="text-[35px] text-center mt-10">
            We're Here to Help You Explore Morocco
          </h2>
          <p className="text-center text-mainGreen leading-7 mt-5 text-lg max-w-[800px] m-auto">
            Have questions about our tours, need assistance planning your trip,
            or just want to learn more about what we offer? We'd love to hear
            from you! At Moroccan Horizons, our team is dedicated to providing
            you with the best possible experience.
          </p>
          <div>
            <h3 className="text-3xl mb-8 text-center mt-10 border-b-[0.5px] border-mainGreen w-fit m-auto p-4">
              Get in Touch
            </h3>
            <div className="flex flex-col lg:flex-row gap-6 justify-center items-center ">
              <div className="bg-white rounded-md p-5 w-full md:max-w-[550px]  ">
                <ContactForm />
              </div>
              <div className="flex flex-col  flex-1 text-center gap-4 items-center ">
                <div className="w-full   ">
                  <h4 className="text-xl text-mainGreen/50 underline mb-5">
                    Email:
                  </h4>
                  <p className="text-mainGreen  ">
                    For general inquiries, please email us at:
                    <br />
                    <a
                      className="hover:underline font-light"
                      href="mailto:info@moroccanhorizons.com"
                    >
                      " info@moroccanhorizons.com "
                    </a>
                  </p>
                </div>
                <div className="w-full   ">
                  <h4 className="text-xl text-mainGreen/50 underline mb-5 ">
                    Phone:
                  </h4>
                  <p className="text-mainGreen">
                    Prefer to talk to someone directly? <br /> Call us at :{" "}
                    <a
                      className="hover:underline font-light"
                      href="tel:+212 123 456 789"
                    >
                      " +212 123 456 789 ".
                    </a>
                  </p>
                  <p className="font-mainFont uppercase text-[11px] text-black">
                    We're available from 9 AM to 6 PM (GMT+1), Monday to Friday.
                  </p>
                </div>
                <div className="w-full   ">
                  <h4 className="text-xl text-mainGreen/50 underline mb-5">
                    Address:
                  </h4>
                  <address className="text-black font-light">
                    Drop by our office for a chat:
                    <br /> Moroccan Horizons
                    <br /> 123 Avenue des Explorateurs
                    <br /> Marrakech, Morocco
                  </address>
                </div>
                <div className="w-full   ">
                  <h4 className="text-xl mb-5 text-mainGreen/50 underline">
                    Connect with Us Online:
                  </h4>

                  <div className="icons flex gap-2 justify-center items-center text-mainGreen  text-3xl">
                    <a
                      href="https://www.facebook.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <CiFacebook />
                    </a>
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <CiInstagram />
                    </a>
                    <a
                      href="https://www.x.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaXTwitter />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Contact;
