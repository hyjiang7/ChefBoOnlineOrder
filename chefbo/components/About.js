import React from "react";
import utility from "../styles/utility.module.css";


function About() {
  return (
    <div className="card text-center">
      <div className="card-body w-75 m-auto">
        <div className={`${utility.fontSizeMedium} ${utility.textRed} card-title `}>Our Food</div>
        <p className={`${utility.fontSizeSmall} card-text`}>
          Chef Bo is a family owned and operated restaurant since 2013. We
          strive to treat each and every customer as a member of our own family
          by providing friendly service and delicious Chinese comfort food. By using
          only the freshest of ingredients, you are sure to find harmony in our
          flavors.
        </p>
      </div>
    </div>
  );
}

export default About;
