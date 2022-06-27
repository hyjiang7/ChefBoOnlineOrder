import React, {useEffect} from "react";
import { useRouter } from "next/router";

import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import About from "../components/About";
import BestSellers from "../components/BestSellers";
import BasicInfo from "../components/BasicInfo";
import utility from "../styles/utility.module.css";


export default function Home({ popular }) {

  const carouselImgs = ['/img-1.jpg', '/img-2.jpg', '/img-3.jpg']
  const router = useRouter();


  return (
    <div>
      <div className="mh-100" > 
      <Carousel>
        {carouselImgs.map((img, ind) =>(
          <Carousel.Item key={ind} interval={2000}>
          <img style={{ maxHeight: "90vh" }} className="d-block w-100" src={img} alt={img} />
          <Carousel.Caption>
            <Link href="/routes/menu" passHref>
              <Button variant="dark" size="sm" block className={utility.fontSizeSmall}>
                View Menu
              </Button>
            </Link>
            <Link href="/routes/pickup" passHref>
              <Button variant="dark" size="sm" block className={utility.fontSizeSmall}>
                Order Pickup
              </Button>
            </Link>
          </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      </div>
      <About></About>
      <BestSellers></BestSellers>
      <BasicInfo></BasicInfo>
    </div>
  );
}
