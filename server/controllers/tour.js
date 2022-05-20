import mongoose from "mongoose";
import TourModel from "../models/tour.js";

export const createTour = async (req, res) => {
  const tour = req.body;
  const newTour = new TourModel({
    ...tour,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newTour.save();
    res.status(201).json(newTour);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong!" });
  }
};

export const getTours = async (req, res) => {
  const { page } = req.query;
  const limit = 6;
  try {
    // const tours = await TourModel.find({});
    // res.status(200).json(tours);
    const startIndex = (Number(page) - 1) * limit;
    const total = await TourModel.countDocuments({});
    const tours = await TourModel.find().limit(limit).skip(startIndex);
    res.json({
      data: tours,
      currentPage: Number(page),
      totalTours: total,
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(404).json({ message: "Something went wrong!" });
  }
};

export const getTour = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await TourModel.findById(id);
    res.status(200).json(tour);
  } catch (error) {
    res.status(404).json({ messgae: "Tour not found!" });
  }
};

export const getToursByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid user id!" });
  }
  try {
    const tours = await TourModel.find({ creator: id });
    res.status(200).json(tours);
  } catch (error) {
    res.status(404).json({ messgae: "Tours not found!" });
  }
};

export const deleteTour = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid tour id!" });
  }
  try {
    const tour = await TourModel.findByIdAndRemove(id);
    res.status(200).json(tour);
  } catch (error) {
    res.status(404).json({ messgae: "Tour not found!" });
  }
};

export const updateTour = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, imageFile, tags } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid tour id!" });
  }
  const updatedTour = {
    creator,
    title,
    description,
    tags,
    imageFile,
    _id: id,
  };
  try {
    const tour = await TourModel.findByIdAndUpdate(id, updatedTour, {
      new: true,
    });
    res.status(200).json(tour);
  } catch (error) {
    res.status(404).json({ messgae: "Tour not found!" });
  }
};

export const getToursBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const tours = await TourModel.find({ title });
    res.status(200).json(tours);
  } catch (error) {
    res.status(404).json({ messgae: "Tours not found!" });
  }
};

export const getToursByTag = async (req, res) => {
  const { tag } = req.params;
  try {
    const tours = await TourModel.find({ tags: { $in: tag } });
    res.status(200).json(tours);
  } catch (error) {
    res.status(404).json({ messgae: "Tours not found!" });
  }
};

export const getRelatedTours = async (req, res) => {
  const tags = req.body;
  try {
    const tours = await TourModel.find({ tags: { $in: tags } });
    res.status(200).json(tours);
  } catch (error) {
    res.status(404).json({ messgae: "Tours not found!" });
  }
};

export const likeTour = async (req, res) => {
  const {id} = req.params;

  try {
    if(!req.userId) {
      return res.json({message: 'User is not authenticated!'})
    }
  
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid tour id!" });
    }
  
    const tour = await TourModel.findById(id);
  
    const index = tour.likes.findIndex((id)=> id === String(req.userId))
  
    if(index === -1) {
      tour.likes.push(req.userId);
    } else {
      tour.likes = tour.likes.filter((id)=> id !== (String(req.userId)))
    }
  
    const updatedTour = await TourModel.findByIdAndUpdate(id, tour, {new: true});
  
    res.status(200).json(updatedTour);
  } catch (error) {
    res.status(404).json({ messgae: error.message });
  }
}