import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getToursByTag } from "../redux/features/tourSlice";
import { excerpt } from "../utils";

function TagTours() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tagTours, loading } = useSelector((state) => ({ ...state.tour }));
  const { tag } = useParams();

  useEffect(() => {
    if (tag) {
      dispatch(getToursByTag(tag));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);

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
      <h3 className="text-center">Tours with tag: {tag}</h3>
      <hr style={{ maxWidth: "570px" }} />
      {tagTours &&
        tagTours.map((tour) => (
          <MDBCardGroup key={tour._id}>
            <MDBCard style={{ maxWidth: "600px" }} className="mt-2">
              <MDBRow className="g-0">
                <MDBCol md="4">
                  <MDBCardImage
                    className="rounded"
                    src={tour.imageFile}
                    alt={tour.title}
                    fluid
                  />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody>
                    <MDBCardTitle className="text-start">
                      {tour.title}
                    </MDBCardTitle>
                    <MDBCardText className="text-start">
                      {excerpt(tour.description, 40)}
                    </MDBCardText>
                    <div style={{ float: "left", marginTop: "-10px" }}>
                      <MDBBtn
                        size="sm"
                        rounded
                        color="info"
                        onClick={() => navigate(`/tour/${tour._id}`)}
                      >
                        Read More
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        ))}
    </div>
  );
}

export default TagTours;
