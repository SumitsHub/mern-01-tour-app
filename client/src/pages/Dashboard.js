import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBCardGroup,
  MDBCardTitle,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTour, getToursByUser } from "../redux/features/tourSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const excerpt = (str) => {
  if (str.length > 40) {
    str = str.substring(0, 40) + "...";
  }
  return str;
};

const Dashboard = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userTours, loading } = useSelector((state) => ({ ...state.tour }));
  const userId = user?.result?._id;

  const dispatch = useDispatch();
  useEffect(() => {
    console.log({ userTours });
    if (userId) {
      dispatch(getToursByUser(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want tot delete?")) {
      dispatch(deleteTour({ id, toast }));
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "900px",
        alignContent: "center",
      }}
    >
      {userTours.length === 0 && (
        <h3>No tours available with user {user?.result?.name}</h3>
      )}
      {userTours.length > 0 && (
        <>
          <h4 className="text-center">Dashboard: {user?.result?.name}</h4>
          <hr style={{ maxWidth: "570px" }} />
        </>
      )}
      {userTours &&
        userTours.map((tour, index) => (
          <MDBCardGroup key={index}>
            <MDBCard
              style={{ maxWidth: "600px" }}
              key={tour._id}
              className="mt-2"
            >
              <MDBRow className="g-0">
                <MDBCol md="4">
                  <MDBCardImage
                    className="rounded"
                    src={tour.imageFile}
                    alt={tour.title}
                    fluid
                  />
                </MDBCol>
                <MDBCol className="md-8">
                  <MDBCardBody>
                    <MDBCardTitle className="text-start">
                      {tour.title}
                    </MDBCardTitle>
                    <MDBCardText className="text-start">
                      <small className="text-muted">
                        {excerpt(tour.description)}
                      </small>
                    </MDBCardText>
                    <div
                      style={{
                        marginLeft: "5px",
                        float: "right",
                        marginTop: "-60px",
                      }}
                    >
                      <MDBBtn className="mt-1" tag="a" color="none">
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "#dd4b39" }}
                          size="lg"
                          onClick={() => handleDelete(tour._id)}
                        />
                      </MDBBtn>
                      <Link to={`/editTour/${tour._id}`}>
                        <MDBIcon
                          fas
                          icon="edit"
                          style={{ color: "#55acee", marginLeft: "10px" }}
                          size="lg"
                        />
                      </Link>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        ))}
    </div>
  );
};

export default Dashboard;
