import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact us - United Digital Prints"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            For any queries and information about our products, feel free to call us anytime. We are available 24/7.
          </p>
          <p className="mt-3">
            <BiMailSend /> : uniteddigitalprint@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : +91-9948168347
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
          <p className="mt-3">
            <strong>Address:</strong> Shop No 3-5-8710pp, OLD MLA Quarters, Hyderguda, Hyderguda-Basheer Bagh, Hyderabad - 500029, Telangana, India
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
