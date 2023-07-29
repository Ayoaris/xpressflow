import Navbar from "../../components/Navbar/Navbar";
import cloud from "../../assets/cloud.png";
import clip from "../../assets/clip.png";
import "./SignUp.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const SignUp = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    businessEmail: "",
    businessPhone: "",
    businessCategory: "",
    accountNo: "",
    image: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      businessName,
      businessEmail,
      businessPhone,
      businessCategory,
      accountNo,
      image,
    } = formData;

    if (
      businessName === "" ||
      businessEmail === "" ||
      businessPhone === "" ||
      businessCategory === "" ||
      accountNo === ""
    ) {
      toast.error("Please fill in all fields", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(businessEmail)) {
      toast.error("Please enter a valid email address", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
      return;
    }

    const checkEmail = users.find((el) => el.businessEmail === businessEmail);

    if (checkEmail) {
      toast.error("Business email already registered", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
      return;
    }

    const phoneRegex = /^[0]\d{10}$/;

    if (!phoneRegex.test(businessPhone)) {
      toast.error("Please enter a valid phone number", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
      return;
    }

    const accountRegex = /^[0-9]{10}$/;

    if (!accountRegex.test(accountNo)) {
      toast.error("Please enter a valid account number", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
      return;
    }

    const checkAccount = users.find((el) => el.accountNo === accountNo);

    if (checkAccount) {
      toast.error("Account number has already been registered", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
      return;
    }

    const userBusinessInfo = {
      businessName,
      businessEmail,
      businessPhone,
      businessCategory,
      accountNo,
      image,
    };

    localStorage.setItem("userBusinessInfo", JSON.stringify(userBusinessInfo));

    if (localStorage.getItem("userBusinessInfo")) {
      // alert("Account created successfully");

      navigate("/sign-up2");
    } else {
      toast.error("Unable to save user business info", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container-2">
        <div className="form-section">
          <h1 className="color header">Welcome to Xpress Rewards</h1>
          <p className="p-1">Complete the form below to get started</p>
          <div className="divide"></div>
          <h2 className="color h2">Business Information</h2>
          <form action="">
            <div className="labels" htmlFor="">
              Business name
            </div>
            <div>
              <input
                className="input-fields"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                type="text"
              />
            </div>

            <div className="labels" htmlFor="">
              Business Email Address
            </div>
            <div>
              <input
                className="input-fields"
                name="businessEmail"
                value={formData.businessEmail}
                onChange={handleChange}
                type="text"
              />
            </div>
            <div className="labels" htmlFor="">
              Business Phone Number
            </div>
            <div>
              <input
                className="input-fields"
                name="businessPhone"
                value={formData.businessPhone}
                onChange={handleChange}
                type="text"
              />
            </div>
            <div className="labels" htmlFor="">
              Business Category
            </div>
            <div>
              <input
                className="input-fields"
                name="businessCategory"
                value={formData.businessCategory}
                onChange={handleChange}
                type="text"
              />
            </div>
            <div className="labels" htmlFor="">
              Account No
            </div>
            <div>
              <input
                className="input-fields"
                name="accountNo"
                value={formData.accountNo}
                onChange={handleChange}
                type="text"
              />
            </div>
            <div className="labels" htmlFor="">
              Image (Logo)
            </div>
            <div className="image-logo">
              <div className="icon">
                <img src={cloud} alt="download icon" />
              </div>
              <p>Drag here or click the button below to upload</p>
              {/* <button className="file">
                <span>
                  <img src={clip} alt="clip" />

                  <input type="file" name="image" id="files" className="file" />
                </span>
                Choose file
              </button> */}

              <div className="">
                <input type="file" name="image" id="files" className="file" />
              </div>

              <p>Maxium upload size: 10MB (.jpg)</p>
            </div>

            <div className="footer-btn">
              <button onClick={handleSubmit} className="btn">
                Next
              </button>
              <p>Step 1 of 2</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
