import Navbar from "../../components/Navbar/Navbar";
import "./SignUp2.scss";
import { useState } from "react";
import PendingModal from "../../components/PendingModal/PendingModal";
// import Pending from "../../assets/";
import Pending from "../../assets/Pending.png";
// import { genSaltSync, hashSync } from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { hashPassword } from "../../utils";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

// const salt = genSaltSync(10);

const SignUp2 = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    houseNumber: "",
    street: "",
    city: "",
    state: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    password: "",
    confirmPassword: "",
  });

  const userBusinessInfo = JSON.parse(localStorage.getItem("userBusinessInfo"));

  const users = JSON.parse(localStorage.getItem("users")) || [];

  // console.log(userBusinessInfo);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleModalClick = () => {
    setModalOpen(false);

    localStorage.removeItem("userBusinessInfo");
    navigate("/");
  };

  const handleSubmit = (e) => {
    // console.log(123);
    e.preventDefault();

    const {
      houseNumber,
      street,
      city,
      state,
      contactName,
      contactPhone,
      contactEmail,
      password,
      confirmPassword,
    } = formData;

    const {
      businessName,
      businessEmail,
      businessPhone,
      businessCategory,
      accountNo,
      image,
    } = userBusinessInfo;

    if (
      houseNumber === "" ||
      street === "" ||
      city === "" ||
      state === "" ||
      contactName === "" ||
      contactPhone === "" ||
      contactEmail === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      toast.error("Please fill in all fields", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(contactEmail)) {
      toast.error("Please enter a valid email address", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
      return;
    }

    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!regex.test(password)) {
      toast.error(
        "Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character",
        {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 3000,
        }
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
      return;
    }

    const hashedPassword = hashPassword(password, contactEmail);

    const userAddress = `${houseNumber}, ${street}, ${city}, ${state}`;

    const user = {
      businessName,
      businessEmail,
      businessPhone,
      businessCategory,
      accountNo,
      image,
      name: contactName,
      phone: contactPhone,
      email: contactEmail,
      password: hashedPassword,
      address: userAddress,
    };

    const checkEmail = users.find((el) => el.email === contactEmail);

    if (checkEmail) {
      toast.error("User already exists", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
      return;
    }
    // store user in an array

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    if (localStorage.getItem("users")) {
      toast.success("Registration successful", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
      setModalOpen(true);
    } else {
      toast.error("Registration failed", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container-3">
        {modalOpen && (
          <PendingModal>
            <div className="title">
              <div>
                <img src={Pending} alt="pending" />
              </div>
              <h1 className="head">Pending</h1>
            </div>
            <div className="body">
              <p>
                Your registration is awaiting approval from our partnership team
              </p>
            </div>
            <div className="footer">
              <button onClick={handleModalClick} id="cancelBtn">
                Done
              </button>
            </div>
          </PendingModal>
        )}
        <div className="form-section">
          <h1 className="color header">Welcome to Xpress Rewards</h1>
          <p className="p-1">Complete the form below to get started</p>
          <div className="divide"></div>
          <h2 className="color h2">Business Address</h2>
          <form onSubmit={handleSubmit}>
            <div className=" flex">
              <div className="field one">
                <p className="labels" htmlFor="">
                  House Number
                </p>
                <div>
                  <input
                    className="input-fields a"
                    name="houseNumber"
                    value={formData.houseNumber}
                    onChange={handleChange}
                    type="text"
                  />
                </div>
              </div>
              <div className="field two">
                <p className="labels" htmlFor="">
                  Street
                </p>
                <div>
                  <input
                    className="input-fields b"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="field one">
                <div className="labels" htmlFor="">
                  City
                </div>
                <div>
                  <input
                    className="input-fields b"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    type="text"
                  />
                </div>
              </div>
              <div className="field two">
                <div className="labels" htmlFor="">
                  State
                </div>

                <div>
                  <input
                    className="input-fields c"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    type="text"
                  />
                </div>
              </div>
            </div>
            <h2 className="color h2">Contact Person Infomation</h2>
            <div className="labels" htmlFor="">
              Contact Name
            </div>
            <div>
              <input
                className="input-fields"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                type="text"
              />
            </div>
            <div className="labels" htmlFor="">
              Contact Phone Number
            </div>
            <div>
              <input
                className="input-fields"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                type="text"
              />
            </div>
            <div className="labels" htmlFor="">
              Contact Email Address
            </div>
            <div>
              <input
                className="input-fields"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                type="text"
              />
            </div>
            <h2 className="color h2">Password</h2>
            <div className="labels" htmlFor="">
              Password
            </div>
            <div>
              <input
                className="input-fields"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
              />
            </div>
            <div className="labels" htmlFor="">
              Confirm Password
            </div>
            <div>
              <input
                className="input-fields"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                type="password"
              />
            </div>

            <div className="footer-btn">
              <button className="btn">Submit</button>
              <p>Step 2 of 2</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp2;
