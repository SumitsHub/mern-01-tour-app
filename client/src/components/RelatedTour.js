import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { excerpt } from "../utils";

const RelatedTour = ({ relatedTours, tourId }) => {
  return (
    <>
      {relatedTours && relatedTours.length > 0 && (
        <>
          {relatedTours.length > 1 && <h4>Related tours</h4>}
          <MDBRow className="row-cols-1 row-cols-md-3 g-4">
            {relatedTours
              .filter((tour) => tour._id !== tourId)
              .splice(0, 3)
              .map((tour) => (
                <MDBCol key={tour._id}>
                  <MDBCard>
                    <Link to={`/tour/${tour._id}`}>
                      <MDBCardImage
                        src={tour.imageFile}
                        alt={tour.title}
                        position="top"
                      />
                    </Link>
                    <span className="text-start tag-card">
                      {tour.tags.map((tag) => (
                        <Link to={`/tours/tag/${tag}`} key={tag}>#{tag}</Link>
                      ))}
                    </span>
                    <MDBCardBody>
                      <MDBCardTitle className="text-start">
                        {tour.title}
                      </MDBCardTitle>
                      <MDBCardText className="text-start">
                        {excerpt(tour.description, 45)}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))}
          </MDBRow>
        </>
      )}
    </>
  );
};

export default RelatedTour;
