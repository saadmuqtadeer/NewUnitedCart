import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy - United Digital Prints"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="bg-dark p-2 text-white text-center">PRIVACY POLICY</h1>
          <div className="privacy-content">
            <p className="text-justify mt-2">
              <strong>Introduction</strong><br />
              United Digital Prints respects your privacy and is committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website or interact with us in any way.
            </p>
            <p className="text-justify mt-2">
              <strong>What Data We Collect</strong><br />
              We may collect, use, store, and transfer different kinds of personal data about you, including:
              <ul>
                <li>Identity Data: Name, title, and contact details.</li>
                <li>Contact Data: Address, email address, and phone numbers.</li>
                <li>Transaction Data: Details about payments to and from you and other details of products and services you have purchased from us.</li>
              </ul>
            </p>
            <p className="text-justify mt-2">
              <strong>Data Security</strong><br />
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. We also limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
            </p>
            <p className="text-justify mt-2">
              <strong>Your Legal Rights</strong><br />
              You have rights under data protection laws in relation to your personal data, including the right to access, correct, or erase your personal data, and to object to or restrict the processing of your personal data.
            </p>
            <p className="text-justify mt-2">
              <strong>Contact Details</strong><br />
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
              <ul>
                <li><strong>Email</strong>: majeed@example.com</li>
                <li><strong>Phone Number</strong>: 012-3456789</li>
                <li><strong>Address</strong>: Shop No 3-5-8710pp, OLD MLA Quarters, Hyderguda, Hyderabad - 500029, Telangana, India</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
