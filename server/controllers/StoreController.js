const Store = require("../models/Store");

// Create Store
const createStore = async (req, res) => {
  try {
    const store = await Store.create(req.body);

    res.status(201).json({
      message: "Store created successfully",
      store,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get Store
const getStore = async (req, res) => {
  try {
    const store = await Store.findOne();

    res.status(200).json(store);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createStore,
  getStore,
};