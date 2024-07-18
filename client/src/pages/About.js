import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - United Digital Prints"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/about.jpeg"
            alt="aboutus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-6">
          <h2>About United Digital Prints</h2>
          <p className="text-justify mt-2">
            Established in the year 2011, United Digital Prints in Hyderguda-Basheer Bagh, Hyderabad is a top player in the category of Flex Sign Board Dealers in Hyderabad. This well-known establishment acts as a one-stop destination servicing customers both local and from other parts of Hyderabad. Over the course of its journey, this business has established a firm foothold in its industry. 
          </p>
          <p className="text-justify mt-2">
            The belief that customer satisfaction is as important as their products and services have helped this establishment garner a vast base of customers, which continues to grow by the day. This business employs individuals that are dedicated towards their respective roles and put in a lot of effort to achieve the common vision and larger goals of the company.
          </p>
          <p className="text-justify mt-2">
            In the near future, this business aims to expand its line of products and services and cater to a larger client base. In Hyderabad, this establishment occupies a prominent location in Hyderguda-Basheer Bagh. It is an effortless task in commuting to this establishment as there are various modes of transport readily available. It is at Hyderguda, Opp OLD MLA Quarters, which makes it easy for first-time visitors in locating this establishment.
          </p>
          <p className="text-justify mt-2">
            United Digital Prints in Hyderguda-Basheer Bagh has a wide range of products and/or services to cater to the varied requirements of their customers. The staff at this establishment are courteous and prompt at providing any assistance.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
