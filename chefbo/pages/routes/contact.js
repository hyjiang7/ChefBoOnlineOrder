import React, { useState, useContext, useEffect } from "react";
import utility from "../../styles/utility.module.css"

const contact = () =>{

    const [messageSent, setMessageSent] = useState(false)

    useEffect(()=>{
        
    }, [messageSent])

    const submitMessage = (event) =>{
        event.preventDefault();
        console.log(event.target.form.name.value)
        console.log(event.target.form.email.value)
        console.log(event.target.form.phone.value)
        console.log(event.target.form.message.value)



        setMessageSent(true)
    }
    return (
        <>
             <div className="" >
                <h1 className="text-center">Contact Us</h1>
                <div className="row">
                    <div className="col-5 d-flex align-items-center ">
                        <h5 className="ml-3 pl-2">We love hearing from our customers! We strive to provide the best customer service and 
                        great chinese food. Use the form for inquires, comments and suggestions and we will get back to you shortly.
                        </h5>

                    </div>
                    <div className="col-7">
                        {messageSent ? 
                        <div className="d-flex align-items-center " style={{height: "50vh"}}>
                                Thank you for your message! We will get back to you shortly!
                        </div>
                        : 
                        <form className="form w-75 m-auto">
                            <div className="form-group">
                                <label htmlFor="name" className=""> Name</label>
                                <input id="name" className="form-control" type="text" required/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email"> Email</label>
                                <input id="email" className="form-control" type="email" required/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input id="phone" className="form-control" type="number" required/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" className="form-control" type="text-area" rows="5" col="50" required/>
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={submitMessage}> Submit</button>
                        </form>
                        }

                    </div>
                </div>
            </div>
            <div className="card text-center col-12 ">
                <div className="card-body">
                    <div
                    className={`${utility.fontSizeMedium} ${utility.textRed} card-title`}
                    id="location"
                    >
                    Location
                    </div>
                    <div className="card-text">
                    <div className="mb-2">
                    <a
                        href="https://goo.gl/maps/HL348saGFAookUHG6"
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        2310 Fair Oaks Blvd Sacramento, CA 95825
                    </a>
                    </div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12477.07986599587!2d-121.41914629582409!3d38.57363055135965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ada5790b427db%3A0xec5f609a24bbc66b!2sChef%20Bo%20Sacramento!5e0!3m2!1sen!2sus!4v1616114036052!5m2!1sen!2sus"
                        className="w-75"
                        height="300"
                        loading="lazy"
                    ></iframe>
                    </div>
                </div>
                </div>
                <div className={`card text-center col-12 `}>
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

                <div className="card text-center col-12" id="contact">
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
      

        </>
    )
};
export default contact;