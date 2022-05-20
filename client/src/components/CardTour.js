import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likeTour } from "../redux/features/tourSlice";

const excerpt = (str) => {
  if (str.length > 45) {
    str = str.substring(0, 45) + "...";
  }
  return str;
};
const CardTour = ({ title, description, imageFile, tags, _id, name, likes }) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=> ({...state.auth}));
  const userId = user?.result?._id || user?.result?.googleId;

  const Like = () => {
    if(likes.length > 0) {
      return likes.find((like)=> like === userId) ? (
        <>
          <MDBIcon fas icon="thumbs-up" />
          &nbsp; 
          {likes.length > 2 ? (
            <MDBTooltip tag='a' title={`You and ${likes.length - 1} others liked`} >
              {likes.length} Likes
            </MDBTooltip>
          ): (
            `${likes.length} Like${likes.length > 1 ? 's' : ''}`
          )}
        </>
      ): (
        <>
          <MDBIcon far icon="thumbs-up" />
          &nbsp;{likes.length} {likes.length === 1? 'Like': 'Likes'}
        </>
      )
    }
    return (
      <>
        <MDBIcon far icon="thumbs-up" />
        &nbsp; Like
      </>
    );
  };

  const handleLike = () => {
    dispatch(likeTour({id: _id}));
  };

  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
        <MDBCardImage
          src={imageFile}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "180px" }}
        />
        <div className="top-left">{name}</div>
        <span className="text-start tag-card">
          {tags.map((tag, index) => (
            <Link to={`/tours/tag/${tag}`} key={index}>
              # {tag}
            </Link>
          ))}

          <MDBBtn
            style={{ float: "right" }}
            tag="a"
            color="none"
            onClick={user?.result ? handleLike: null}
          >
            {!user?.result ? (
              <MDBTooltip title='Please login to like tour' tag='a'>
                <Like />
              </MDBTooltip>
            ): (
              <Like />
            )}
          </MDBBtn>
        </span>
        <MDBCardBody>
          <MDBCardTitle className="text-start">{title}</MDBCardTitle>
          <MDBCardText className="text-start">
            {excerpt(description)}
            <Link to={`/tour/${_id}`}>Read More</Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardTour;
