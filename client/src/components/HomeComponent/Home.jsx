import React from "react";
import { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import NonProfitCard from "./Card/Card"
import Overlay from "./Overlay/Overlay"
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
    const [isLoggedIn, setIsLoggedIn]= useState(false);
    const [causes, setCauses] = useState([]);
    const [nonProfits, setNonProfits] = useState([]);
    const [name, setName] = useState("");
    const [cart, setCart] = useState([]);
    const [selectedCause, setSelectedCause] = useState("adoption");
    const [searchTerm, setSearchTerm] = useState("");
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  
    const navigate = useNavigate();
  
    const populateDashboard = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/donate`, {
          method: "GET",
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        });
        const causesData = await response.json();
        if (causesData.status === "ok") {
          setIsLoggedIn(true)
          setCauses(causesData.data.causes);
        } else {
          // Handle error fetching causes array
          console.error("Error fetching causes array:", causesData.status);
        }
        // Post selectedCause to receive related data
        const selectedCauseResponse = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/donate/selectedCause`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ selectedCause: selectedCause, searchTerm: searchTerm }),
          }
        );
        const selectedCauseData = await selectedCauseResponse.json();
        if (selectedCauseData.status === "ok") {
          if (selectedCauseData.data.nonprofits && selectedCauseData.data.nonprofits.length>0)
            setNonProfits(selectedCauseData.data.nonprofits);
        } else {
          console.error(
            "Error fetching data related to selectedCause:",
            selectedCauseData.status
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        const user = jwt.decode(token); //payload
        setName(user.name);
        if (!user) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true }); //if user is on /home, this line when executed, url changes to /login
          //  if the user clicks the back button, they won't go back to /home but will leave the site instead.
        } else {
          populateDashboard();
        }
      } else {
        navigate("/login");
      }
    }, [selectedCause, searchTerm]);
  
    const addToCart = (item) => {
      setCart([...cart, item]);
    };
    const toggleOverlay = () => {
      setIsOverlayVisible(!isOverlayVisible);
    };
    const logoutHandler=()=>{
      localStorage.removeItem("token");
      navigate("/login")
    }
    const loginHandler=()=>{
      navigate("/login")
    }
  
  
    return (
      <div>
        <header>
          <nav
            className="navbar navbar-expand-lg navbar-light bg-white p-4"
            style={{
              borderRadius: "8px",
              boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="container" style={{ width: "80%" }}>
              <a className="navbar-brand" href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="d-inline-block align-text-top me-2"
                  height="1.5em"
                  viewBox="0 0 512 512"
                >
                  {" "}
                  <path d="M256 416c114.9 0 208-93.1 208-208S370.9 0 256 0 48 93.1 48 208s93.1 208 208 208zM233.8 97.4V80.6c0-9.2 7.4-16.6 16.6-16.6h11.1c9.2 0 16.6 7.4 16.6 16.6v17c15.5.8 30.5 6.1 43 15.4 5.6 4.1 6.2 12.3 1.2 17.1L306 145.6c-3.8 3.7-9.5 3.8-14 1-5.4-3.4-11.4-5.1-17.8-5.1h-38.9c-9 0-16.3 8.2-16.3 18.3 0 8.2 5 15.5 12.1 17.6l62.3 18.7c25.7 7.7 43.7 32.4 43.7 60.1 0 34-26.4 61.5-59.1 62.4v16.8c0 9.2-7.4 16.6-16.6 16.6h-11.1c-9.2 0-16.6-7.4-16.6-16.6v-17c-15.5-.8-30.5-6.1-43-15.4-5.6-4.1-6.2-12.3-1.2-17.1l16.3-15.5c3.8-3.7 9.5-3.8 14-1 5.4 3.4 11.4 5.1 17.8 5.1h38.9c9 0 16.3-8.2 16.3-18.3 0-8.2-5-15.5-12.1-17.6l-62.3-18.7c-25.7-7.7-43.7-32.4-43.7-60.1.1-34 26.4-61.5 59.1-62.4zM480 352h-32.5c-19.6 26-44.6 47.7-73 64h63.8c5.3 0 9.6 3.6 9.6 8v16c0 4.4-4.3 8-9.6 8H73.6c-5.3 0-9.6-3.6-9.6-8v-16c0-4.4 4.3-8 9.6-8h63.8c-28.4-16.3-53.3-38-73-64H32c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32z" />
                </svg>
              </a>
              <div className="d-flex flex-fill justify-content-center">
                  <input
                    className="form-control me-2"
                    style={{ backgroundColor: "whitesmoke" }}
                    type="search"
                    onChange={(e)=>{setSearchTerm(e.target.value)}}
                    placeholder="Start searching nonprofits to support!"
                    aria-label="Search"
                  />
              </div>
              <div className="d-flex ms-4">
                <button
                  type="button"
                  className="btn btn-outline-success me-2"
                  onClick={toggleOverlay}
                >
                  <span>{cart.length} </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-cart"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                  </svg>
                </button>
                {isLoggedIn===true && <span className="navbar-text me-2">Welcome, {name}</span>}
                {isLoggedIn===true ? <button className="btn btn-primary" onClick={logoutHandler}>Logout</button> : <button className="btn btn-primary" onClick={loginHandler}>Login</button>}

              </div>
            </div>
          </nav>
        </header>
  
        <div className="container mt-5 body">
        {isLoggedIn ? (
          <div className="row">
            {/* <Sidebar /> */}
            <div className="col-lg-3 col-md-4">
              {/* List of Causes */}
              <div className="mb-4">
                <h4>Causes</h4>
                <ul className="list-unstyled">
                  {causes.map((cause) => (
                    <li key={cause}>
                      <button
                        type="button"
                        className="btn btn-link m-2"
                        style={{
                          cursor: "pointer",
                          transition: "background-color 0.3s",
                          textDecoration:"none"
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "whitesmoke")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                        onClick={(e) => {
                          setSelectedCause(cause)
                          e.target.style.backgroundColor = "seashell";
                          e.target.style.color = "#333";
                        }}
                      >
                        {cause}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* <MainContent /> */}
                <div className="col-lg-9 col-md-8">
                <h2 className="mb-4">{nonProfits.length} {selectedCause} Non-Profits {searchTerm? `Supporting ${searchTerm}`:``}</h2>
                <div className="row">
                  {nonProfits.map((card) => (
                    <div key={card.slug} className="col-lg-6 mb-4">
                      {/* NonProfitCard */}
                      <NonProfitCard nonprofit={card} addToCart={addToCart} />
                    </div>
                  ))}
                </div>
                </div>
              
          </div>
          ) : (
            <div className="row text-center">
            <h1 className="mb-4 font-weight-bold">
            Please <Link to="/login">login</Link> to access content.
          </h1>
          </div>
          )}
        </div>
        {isOverlayVisible && <Overlay cart={cart} onClose={toggleOverlay} />}
      </div>
    );
                }