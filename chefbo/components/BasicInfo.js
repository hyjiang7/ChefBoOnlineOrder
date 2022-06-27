import React from "react";
import utility from "../styles/utility.module.css";

function BasicInfo(props) {
  return (
    <>
      <div className="row">
        <div className={`card text-center col-12`}>
          <div className="card-body">
            <div
              className={`${utility.fontSizeMedium} ${utility.textRed} card-title`}
              id="delivery"
            >
              Order Delivery
            </div>
            <div className="card-text ">
              <div className="row d-flex justify-content-center  align-items-center">
                <div className="col-5 col-sm-2 col-md-2">
                  <a
                    target="_blank"
                    alt="grubhub"
                    href="https://www.grubhub.com/restaurant/chef-bo-2310-fair-oaks-blvd-ste-a-sacramento/338369"
                  >
                    <img
                      className="w-100"
                      alt="grubhub-logo"
                      src="/grubhub-logo.png"
                    />
                  </a>
                </div>

                <div className="col-5 col-sm-2 col-md-2">
                  <a
                    target="_blank"
                    alt="doordash"
                    href="https://www.doordash.com/store/chef-bo-sacramento-64068/en-US"
                  >
                    <img
                      className="w-100"
                      alt="doordash-logo"
                      src="/doordash-logo.png"
                    />
                  </a>
                </div>

                <div className="col-5 col-sm-2 col-md-2 m-3">
                  <a
                    target="_blank"
                    alt="postmates"
                    href="https://postmates.com/merchant/chef-bo-2310-fair-oaks-blvd"
                  >
                    <img
                      className="w-100"
                      alt="postmates-logo"
                      src="/postmates-logo.png"
                    />
                  </a>
                </div>

                <div className="col-5 col-sm-2 col-md-2">
                  <a
                    target="_blank"
                    alt="postmates"
                    href="https://www.ubereats.com/sacramento/food-delivery/chef-bo/RHeqSaJOT2qItMUZ9w644g"
                  >
                    <img
                      className="w-100"
                      alt="postmates-logo"
                      src="/uber-eats-logo.png"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card text-center col-12 col-md-4">
          <div className="card-body">
            <div
              className={`${utility.fontSizeMedium} ${utility.textRed} card-title`}
              id="location"
            >
              Location
            </div>
            <div className="card-text">
              <a
                href="https://goo.gl/maps/HL348saGFAookUHG6"
                style={{ textDecoration: "none", color: "black" }}
              >
                2310 Fair Oaks Blvd Sacramento, CA 95825
              </a>
              <br></br>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12477.07986599587!2d-121.41914629582409!3d38.57363055135965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ada5790b427db%3A0xec5f609a24bbc66b!2sChef%20Bo%20Sacramento!5e0!3m2!1sen!2sus!4v1616114036052!5m2!1sen!2sus"
                className="w-100"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
        <div className={`card text-center col-12 col-md-4`}>
          <div className="card-body">
            <div className={`${utility.fontSizeMedium} ${utility.textRed} card-title`}>
              Hours of Operation
            </div>
            <div className={`card-text`}>
              <p>Monday to Thursday: 11:00am - 3:00pm; 4:30pm - 9:00pm</p>
              <p>Friday: 11:00am - 3:00pm; 4:30pm - 9:30pm</p>
              <p>Saturday: 12:00pm - 3:00pm; 4:30pm - 9:30pm</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div className="card text-center col-12 col-md-4" id="contact">
          <div className="card-body">
            <div className={`${utility.fontSizeMedium} ${utility.textRed} card-title`}>
              Contact Us
            </div>
            <div className={`card-text `}>
              <p>Tel: (916) 568-6088</p>
              <p>Email: chefbo2310@gmail.com</p>
            </div>
            <div className="align-center col-12 ">
              <a href="https://www.facebook.com/CBoSacramento/" className="card-link"><img  style={{width: "70px"}} src="/yelp-logo.png"/></a>
              <a href="https://www.yelp.com/biz/chef-bo-sacramento?osq=chef+bo" className="card-link"><img  style={{width: "70px"}} src="/facebook-logo.png"/></a>
            </div>
          </div>
        </div>
      </div>

      {/* <div
        className={`${utility.bgRed} card text-center text-white`}
        id="reviews"
      >
        <div className="card-body">
          <h3 className="card-title">Reviews</h3>
          <div className={`card-text ${utility.fontSizeSmall}`}>
            <p>Reviews here</p>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default BasicInfo;
