import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBFooter,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login, googleSignIn } from "../redux/features/authSlice";
import { GoogleLogin } from "react-google-login";


const initialState = {
  email: "",
  password: "",
};

const goodleClientIDProd = '780984985349-hhiu2lns3b2guhrqondbb2a968d2mrnh.apps.googleusercontent.com';
const googleClientID = '780984985349-nmtrit650hmdu1019bh9rf00mfp46hgk.apps.googleusercontent.com';
const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const devEnv = process.env.NODE_ENV !== 'production';
  const clientId = devEnv ? googleClientID : goodleClientIDProd;

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const googleSuccess = (res) => {
    console.log(res);
    const email = res?.profileObj?.email;
    const name = res?.profileObj?.name;
    const token = res?.tokenId;
    const googleId = res?.googleId;
    const result = {email, name, token, googleId};
    console.log(result);
    dispatch(googleSignIn({result, navigate, toast}));
  }

  const googleFailure = (err) => {
    toast.error(err);
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12">
              <MDBValidationItem invalid feedback="Please provide email">
                <MDBInput
                  label="Email"
                  type="email"
                  value={email}
                  name="email"
                  onChange={onInputChange}
                  required
                />
              </MDBValidationItem>
            </div>
            <div className="col-md-12">
              <MDBValidationItem invalid feedback="Please provide password">
                <MDBInput
                  label="Password"
                  type="password"
                  value={password}
                  name="password"
                  onChange={onInputChange}
                  required
                />
              </MDBValidationItem>
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />
          <GoogleLogin
            clientId={clientId}
            render={(renderProps) => (
              <MDBBtn
                style={{ width: "100%" }}
                color="danger"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <MDBIcon className="me-2" fab icon="google" /> Google Sign In
              </MDBBtn>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
        </MDBCardBody>
        <MDBFooter>
          <Link to="/register">
            <p>Don't have an account? Sign Up</p>
          </Link>
        </MDBFooter>
      </MDBCard>
    </div>
  );
};

export default Login;
