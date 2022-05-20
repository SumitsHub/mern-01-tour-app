import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBValidationItem,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTour, updateTour } from "../redux/features/tourSlice";

const initialState = {
  title: "",
  description: "",
  tags: [],
};

const AddEditTour = () => {
  const [tourData, setTourData] = useState(initialState);
  const { title, description, tags } = tourData;
  const { error, userTours } = useSelector((state) => ({ ...state.tour }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const {id} = useParams();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if(id) {
      const singleTour = userTours.find((tour)=> tour._id === id);
      setTourData(singleTour);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && tags) {
      const updatedTourData = { ...tourData, name: user?.result?.name };
      if(!id) {
        dispatch(createTour({ updatedTourData, navigate, toast }));
      } else {
        dispatch(updateTour({id, updatedTourData, toast, navigate}));
      }
    }
    handleClear();
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({
      ...tourData,
      [name]: value,
    });
  };

  const handleAddTag = (tag) => {
    setTourData({ ...tourData, tags: [...tourData.tags, tag] });
  };

  const handleDeleteTag = (deleteTag) => {
    setTourData({
      ...tourData,
      tags: tourData.tags.filter((tag) => tag !== deleteTag),
    });
  };

  const handleClear = (e) => {
    setTourData({ title: "", description: "", tags: [] });
  };
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <h5>{id ? "Update": "Update"} Tour</h5>
        <MDBCardBody>
          <MDBValidation className="row g-3" noValidate onSubmit={handleSubmit}>
            <MDBValidationItem invalid feedback="Please provide title">
              <div className="col-md-12">
                <MDBInput
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  name="title"
                  onChange={onInputChange}
                  required
                />
              </div>
            </MDBValidationItem>
            <MDBValidationItem invalid feedback="Please provide description">
              <div className="col-md-12">
                <MDBInput
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  name="description"
                  onChange={onInputChange}
                  required
                />
              </div>
            </MDBValidationItem>
            <div className="col-md-12">
              <ChipInput
                name="tags"
                variant="outlined"
                placeholder="Enter tag"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
            </div>
            <div className="d-flex justify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setTourData({ ...tourData, imageFile: base64 })
                }
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>{id ? "Update": "Submit"}</MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditTour;
