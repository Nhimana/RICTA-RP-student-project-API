import { Application } from "../models/application.model.js";

const asyncHandler = (callback) => {
  return (req, res, next) => {
    try {
      callback(req, res, next);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };
};
export const createApplication = asyncHandler(async (req, res) => {
  const { title, description, images } = req.body;
  const response = await Application.create({
    user: req.userId,
    title,
    description,
    images,
  });
  res.send(response);
});

export const getApplication = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const application = await Application.findById(id)/*.populate("user")*/;
  res.json(application);
});

export const cancelApplication = (req, res) => {
  try {
  } catch (error) {}
};

export const updateApplication = (req, res) => {
  try {
  } catch (error) {}
};
