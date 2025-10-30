import {Text, Container, ActionIcon, Group, Grid} from "@mantine/core";
import {BsTwitter, BsYoutube, BsInstagram} from "react-icons/bs";
import {useStyles} from "./style";
import {footerData} from "../../data/data";

const Footer = () => {
  const {classes} = useStyles();

  const groups = footerData.map((group) => {
    const links = group.links.map((link, index) => (
      <Text
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner} size="xl">
        <Grid>
          <Grid.Col span={4}>
            <div
              style={{
                paddingBottom: "0.5rem",
              }}
            >              
                <h2
                  style={{
                    color: "#fff",
                  }}
                >
                  Web Based Bus Ticket Booking System
                </h2>           
            </div>
            <small
              style={{
                color: "#828894",
                display: "block",
                marginBottom: "0.75rem",
              }}
            >
              <span
                style={{
                  color: "#fff",
                }}
              >
                This website provide facilities to the bus booking system to short time and
              also provide better service with a very
              interactive content management system to easily access the
              information
              </span>{" "}
              
            </small>
            <small style={{color: "#fff"}}>
              Copyright © 2023.{" "}
              <span
                style={{
                  color: "#fff",
                }}
              >
                WEB BASED BUS TICKET BOOKING SYSTEM 
              </span>
            </small>
          </Grid.Col>          
          <Grid.Col span={4}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "5.5rem",
                marginLeft:"4rem"
              }}
            >
              <h3
                style={{
                  color: "##fff",
                  marginBottom: "1rem",
                  fontWeight: "500",
                  
                }}
              >
                <span
                  class="border-b-2"
                  style={{
                    borderColor: "#fff",
                    borderBottom: "2px solid #fff",
                    color:"#fff"
                  }}
                >
                  Connect With Us
                </span>
               
              </h3>
              <div
                style={{
                  color: "#fff",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <small
                  style={{
                    paddingRight: "0.5rem",
                  }}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 384 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path>
                  </svg>
                </small>
                <small>Dhaka, Bangladesh</small>
              </div>
              <div
                style={{
                  color: "#fff",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <small
                  style={{
                    paddingRight: "0.5rem",
                  }}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M256 32C114.52 32 0 146.496 0 288v48a32 32 0 0 0 17.689 28.622l14.383 7.191C34.083 431.903 83.421 480 144 480h24c13.255 0 24-10.745 24-24V280c0-13.255-10.745-24-24-24h-24c-31.342 0-59.671 12.879-80 33.627V288c0-105.869 86.131-192 192-192s192 86.131 192 192v1.627C427.671 268.879 399.342 256 368 256h-24c-13.255 0-24 10.745-24 24v176c0 13.255 10.745 24 24 24h24c60.579 0 109.917-48.098 111.928-108.187l14.382-7.191A32 32 0 0 0 512 336v-48c0-141.479-114.496-256-256-256z"></path>
                  </svg>
                </small>
                <small>01835859540</small>
              </div>

            </div>
          </Grid.Col>
          <Grid.Col span={4}>
          <div style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "5.5rem",
              }}>
          <h3
                style={{
                  color: "#7950F2",
                  marginBottom: "1rem",
                  fontWeight: "500",
                }}
              >
                <span
                  class="border-b-2"
                  style={{
                    borderColor: "#fff",
                    borderBottom: "2px solid #fff",
                    color:"#fff"
                  }}
                >
                  Follow Us On
                </span>               
              </h3>
              <div
                class="my-2 flex"
                style={{
                  display: "flex",
                  marginTop: "0.1rem",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ActionIcon size="lg">
            <BsYoutube size={20} color="coral" />
          </ActionIcon>
          <ActionIcon size="lg">
            <BsInstagram size={20} color="coral" />
          </ActionIcon>
               
              </div>
          </div>
          </Grid.Col>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
