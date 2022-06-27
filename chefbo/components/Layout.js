import Head from "next/head";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import styles from "../styles/nav.module.css";
import utility from "../styles/utility.module.css";
import Link from "next/link";

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title> Chef Bo Chinese Food {title}</title>
        <meta
          name="description"
          content="Chef Bo Chinese Restaurant Online Order"
        />
        <meta
          name="keywords"
          content="Chinese food, takeout, online order, pickup, delivery, chow mein, noodles, fried rice, rice, soup, orange chicken"
        />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
          crossOrigin="anonymous"
        />
      </Head>
      <header>
        <Navbar
          className={styles.navbar}
          expand="xl"
          variant="dark"
          collapseOnSelect="true"
        >
          <Link href="/" passHref>
            <Navbar.Brand>
              <img
                className="img-responsive"
                src="/chefbo.png"
                width="50px"
                height="50px"
                alt="chefbo-logo"
              />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="order-3" id="basic-navbar-nav">
            <Nav>
              <Link href="/" passHref>
                <Nav.Link className={utility.textCenter}>Home </Nav.Link>
              </Link>
              <Link href="/routes/menu" passHref>
                <Nav.Link className={utility.textCenter}>Menu </Nav.Link>
              </Link>
              {/* <Link href="/#location" passHref scroll={false}>
                <Nav.Link className={utility.textCenter}>
                  Hours & Location
                </Nav.Link>
              </Link> */}
              <NavDropdown
                className={`${utility.textCenter} `}
                title="Order Online"
              >
                <Link href="/routes/pickup" passHref>
                  <NavDropdown.Item
                    className={`${utility.textCenter} ${styles.dropdownItem}`}
                  >
                    Order Pickup
                  </NavDropdown.Item>
                </Link>
                <Link href="/#delivery" passHref>
                  <NavDropdown.Item
                    className={`${utility.textCenter} ${styles.dropdownItem}`}
                  >
                    Order Delivery Through 3rd Party
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
              <Link href="/routes/contact" passHref>
                <Nav.Link className={utility.textCenter}>Contact Us </Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
  
        {children}
  
      
      <script
        src="https://code.jquery.com/jquery-1.12.4.min.js"
        integrity="sha384-nvAa0+6Qg9clwYCGGPpDQLVpLNn0fRaROjHqs13t4Ggj3Ez50XnGQqc/r8MhnRDZ"
        crossOrigin="anonymous"
      ></script>
    </>
  );
};

export default Layout;
