import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import momentz from "moment-timezone"; //needed
import store from "../../state/GlobalState";
import { useRouter } from "next/router";

import { addCustomerInfo, setTips } from "../../state/Actions";

const FULL12FORMAT = "dddd MM-DD-YY HH:mm";
const DATEFORMAT = "dddd MM-DD-YY";
const TIMEZONE = "America/Los_Angeles";

const checkout = () => {
    // const closedDays = ["11/25/2021", "12/25/2021", "07/04/2022"]
    const lunch = store.getState().lunchInCart > 0;
    const router = useRouter();

    console.log(store.getState().Cart.length);

    const lunchSpecialHours = [
        [],
        ["11:00", "15:00", "15:00", "15:00"],
        ["11:00", "15:00", "15:00", "15:00"],
        ["11:00", "15:00", "15:00", "15:00"],
        ["11:00", "15:00", "15:00", "15:00"],
        ["11:00", "15:00", "15:00", "15:00"],
        ["12:00", "15:00", "15:00", "15:00"],
    ];

    var hoursOfOperation = [
        [], //change!!!
        ["11:00", "15:00", "16:30", "21:00"],
        ["11:00", "15:00", "16:30", "21:00"],
        ["11:00", "15:00", "16:30", "21:00"],
        ["11:00", "15:00", "16:30", "21:00"],
        ["11:00", "15:00", "16:30", "21:30"],
        ["12:00", "15:00", "16:30", "21:30"],
    ];

    if (lunch > 0) hoursOfOperation = lunchSpecialHours;

    var today = moment(moment()).tz(TIMEZONE);
    var day = today.day(); //number
    var date = today.format(DATEFORMAT); //string
    var todayClose2 = moment.tz(
        `${date} ${hoursOfOperation[day][hoursOfOperation[day].length - 1]}`,
        FULL12FORMAT,
        TIMEZONE
    );
    var open = today.isBefore(todayClose2);
    var validTimesOne = [];
    var validDays = [];
    var validTimesTwo = [];
    var dateOne, dateTwo, dateTwoDay;
    var dayOneOpen1, dayOneClose1, dayOneOpen2, dayOneClose2;
    var dayTwoOpen1, dayTwoClose1, dayTwoOpen2, dayTwoClose2;

    //today is open! time is before final closing
    if (open) {
        validDays.push(`Today (${date})`);
        dateOne = date;
        dayOneOpen1 = moment.tz(`${dateOne} ${hoursOfOperation[day][0]}`, FULL12FORMAT, TIMEZONE);
        dayOneClose1 = moment.tz(`${dateOne} ${hoursOfOperation[day][1]}`, FULL12FORMAT, TIMEZONE);
        dayOneOpen2 = moment.tz(`${dateOne} ${hoursOfOperation[day][2]}`, FULL12FORMAT, TIMEZONE);
        dayOneClose2 = moment.tz(`${dateOne} ${hoursOfOperation[day][3]}`, FULL12FORMAT, TIMEZONE);

        day == 6 ? (dateTwo = today.add(2, "days")) : (dateTwo = today.add(1, "days"));
        dateTwoDay = dateTwo.day();
        dateTwo = dateTwo.format(DATEFORMAT);
        validDays.push(dateTwo);

        dayTwoOpen1 = moment.tz(
            `${dateTwo} ${hoursOfOperation[dateTwoDay][0]}`,
            FULL12FORMAT,
            TIMEZONE
        );
        dayTwoClose1 = moment.tz(
            `${dateTwo} ${hoursOfOperation[dateTwoDay][1]}`,
            FULL12FORMAT,
            TIMEZONE
        );
        dayTwoOpen2 = moment.tz(
            `${dateTwo} ${hoursOfOperation[dateTwoDay][2]}`,
            FULL12FORMAT,
            TIMEZONE
        );
        dayTwoClose2 = moment.tz(
            `${dateTwo} ${hoursOfOperation[dateTwoDay][3]}`,
            FULL12FORMAT,
            TIMEZONE
        );
    

        today = moment(moment()).tz(TIMEZONE); //reset today
        if (today.isBefore(dayOneOpen1)) {
            //store not opened yet
            validTimesOne = availablePickUpTimes(dayOneOpen1, dayOneClose1);
        } else if (today.isBefore(dayOneClose1)) {
            // validTimesOne.length > 0 ? validTimesOne.push("ASAP"): null;
            validTimesOne = validTimesOne.concat(availablePickUpTimes(today, dayOneClose1));
        } else {
            // validTimesOne.length > 0 ? validTimesOne.push("ASAP"): null;
            validTimesOne = validTimesOne.concat(availablePickUpTimes(today, dayOneClose2));
        }

        validTimesOne = validTimesOne.concat(availablePickUpTimes(dayOneOpen2, dayOneClose2));

        validTimesTwo = availablePickUpTimes(dayTwoOpen1, dayTwoClose1);

        validTimesTwo = validTimesTwo.concat(availablePickUpTimes(dayTwoOpen2, dayTwoClose2));
    } else {
        day == 6 ? (dateOne = today.add(2, "days")) : (dateOne = today.add(1, "days"));
        day = dateOne.day();
        dateOne = dateOne.format(DATEFORMAT);
        validDays.push(dateOne);
        dayOneOpen1 = moment.tz(`${dateOne} ${hoursOfOperation[day][0]}`, FULL12FORMAT, TIMEZONE);
        dayOneClose1 = moment.tz(`${dateOne} ${hoursOfOperation[day][1]}`, FULL12FORMAT, TIMEZONE);
        dayOneOpen2 = moment.tz(`${dateOne} ${hoursOfOperation[day][2]}`, FULL12FORMAT, TIMEZONE);
        dayOneClose2 = moment.tz(`${dateOne} ${hoursOfOperation[day][3]}`, FULL12FORMAT, TIMEZONE);

        dateTwo = today.add(1, "days");
        dateTwoDay = dateTwo.day();
        dateTwo = dateTwo.format(DATEFORMAT);
        validDays.push(dateTwo);
        dayTwoOpen1 = moment.tz(
            `${dateTwo} ${hoursOfOperation[dateTwoDay][0]}`,
            FULL12FORMAT,
            TIMEZONE
        );
        dayTwoClose1 = moment.tz(
            `${dateTwo} ${hoursOfOperation[dateTwoDay][1]}`,
            FULL12FORMAT,
            TIMEZONE
        );
        dayTwoOpen2 = moment.tz(
            `${dateTwo} ${hoursOfOperation[dateTwoDay][2]}`,
            FULL12FORMAT,
            TIMEZONE
        );
        dayTwoClose2 = moment.tz(
            `${dateTwo} ${hoursOfOperation[dateTwoDay][3]}`,
            FULL12FORMAT,
            TIMEZONE
        );

        console.log(dayOneOpen1, dayOneClose1, dayOneOpen2, dayOneClose2);
        validTimesOne = availablePickUpTimes(dayOneOpen1, dayOneClose1);
        validTimesOne = validTimesOne.concat(availablePickUpTimes(dayOneOpen2, dayOneClose2));
        validTimesTwo = availablePickUpTimes(dayTwoOpen1, dayTwoClose1);
        validTimesTwo = validTimesTwo.concat(availablePickUpTimes(dayTwoOpen2, dayTwoClose2));
    }

    function availablePickUpTimes(startTime, endTime) {
        var timeArr = [];
        const mins = 15 - (startTime.minute() % 15); //number of mins to next 15 minute mark
        var firstTime = startTime.add(mins, "m");

        mins == 15 ? null : firstTime.add(15, "m");

        while (firstTime.isBefore(endTime)) {
            timeArr.push(new moment(firstTime).format("h:mm a"));
            firstTime.add(15, "m");
        }
        return timeArr;
    }

    const tipsPercent = [0, 12, 15, 18, 20, 22];

    function calcTips() {
        const { subtotal } = store.getState();

        var tips = [];
        tipsPercent.forEach((i) => {
            tips.push((subtotal * (i / 100)).toFixed(2));
        });

        console.log(tips);
        return tips;
    }

    const [dateChange, setDateChange] = useState(0);
    const [times, setTimes] = useState(validTimesOne);
    const [timeChange, setTime] = useState(validTimesOne[0]);
    const [tipsSelection, SetTipsSelection] = useState([""]);
    const [fnameError, setFnameError] = useState("");
    const [lnameError, setLnameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [tipsError, setTipsError] = useState("");

    useEffect(() => {
        SetTipsSelection(calcTips());

        dateChange == 0 ? setTimes(validTimesOne) : setTimes(validTimesTwo);
    }, [dateChange]);

    function handleDateChange(e) {
        setDateChange(e.target.value);
    }

    function handleTimeChange(e) {
        setTime(e.target.value);
    }

    async function reviewOrder(e) {
        //check if payment is valid
        e.preventDefault();

        var tips = e.target.form.elements.tips.value;
        var fname = e.target.form.elements.fname.value;
        var lname = e.target.form.elements.lname.value;
        var email = e.target.form.elements.email.value;
        var phone = e.target.form.elements.phone.value;

        if (!fname || !lname || !email || !phone || !tips) {
            if (!fname) {
                setFnameError("Required!!");
            } else {
                setFnameError("");
            }
            if (!lname) {
                setLnameError("Required!!");
            } else {
                setLnameError("");
            }
            if (!email) {
                setEmailError("Required!!");
            } else {
                setEmailError("");
            }
            if (!phone) {
                setPhoneError("Required!!");
            } else {
                setPhoneError("");
            }
            if (!tips) {
                setTipsError("Required!!");
            } else {
                setTipsError("");
            }
        } else {
            var req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/validate/email`,{
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email }),
            });
            const validEmail = await req.json();
            console.log(validEmail);
            if (!validEmail) {
                setEmailError("Invalid Email");
                return;
            } else {
                setEmailError("");
            }

            req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/validate/phone`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phone: phone }),
            });
            const validPhone = await req.json();
            if (!validPhone) {
                setPhoneError("Invalid Phone");
                return;
            } else {
                setPhoneError("");
            }

            setFnameError("");
            setLnameError("");
            setTipsError("");

            const customer = {
                fname: fname,
                lname: lname,
                email: email,
                phone: phone,
                time: timeChange,
                date: dateOne
            };

            dateChange == 0 ? (customer.date = dateOne) : (customer.date = dateTwo);

            store.dispatch(setTips(parseFloat(tips)));

            store.dispatch(addCustomerInfo(customer));
            router.push("/routes/submit");
        }
    }

    
    return (
    <>
     <meta http-equiv="refresh" content="600"></meta>
        <div className="col-12 col-sm-8 col-lg-6 m-auto">
            <form className="form">
                <div className="form-group">
                    <label className="" htmlFor="day">
                        Select Pick Up Date
                    </label>
                    <select name="day" className="form-control" onChange={handleDateChange}>
                        {validDays.map((i, ind) => (
                            <option key={ind} value={ind}>
                                {i}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="" htmlFor="time">
                        Select a Time
                    </label>
                    <select name="time" className="form-control" onChange={handleTimeChange}>
                        {times.map((i, ind) => (
                            <option key={ind} value={`${i}`}>
                                {i}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="row">
                    <div className="col mb-2">
                        <label htmlFor="fname">
                            {" "}
                            First Name* <span className="text-danger">{fnameError}</span>
                        </label>
                        <input name="fname" type="text" className="form-control" required />
                    </div>

                    <div className="col">
                        <label htmlFor="lname">
                            {" "}
                            Last Name* <span className="text-danger">{lnameError}</span>
                        </label>
                        <input name="lname" type="text" className="form-control" required />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="email">
                        {" "}
                        Email* <span className="text-danger">{emailError}</span>
                    </label>
                    <input
                        name="email"
                        id="email"
                        type="email"
                        pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">
                        {" "}
                        Phone number (digits only)*{" "}
                        <span className="text-danger">{phoneError}</span>
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                        className="form-control"
                        required
                    />
                </div>

                <div className="">
                    <p>
                        Select Tip Amount <span className="text-danger">{tipsError}</span>
                    </p>
                    <div className="input-group">
                        {tipsSelection.map((i, ind) => (
                            <div className="form-check w-50" key={ind}>
                                <input
                                    className="form-check-input"
                                    name="tips"
                                    id={i}
                                    type="radio"
                                    value={i}
                                    aria-label={`Radio tips amount ${tipsPercent[ind]}%`}
                                    required
                                />
                                <label htmlFor={i}>{`${i} (${tipsPercent[ind]}%)`}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-group d-flex justify-content-center mt-3">
                    <input
                        id="submit"
                        type="submit"
                        onClick={reviewOrder}
                        className="btn btn-primary"
                        value="Review and Submit Order"
                    />
                </div>
            </form>
        </div>
        </>
    );
};

export default checkout;
