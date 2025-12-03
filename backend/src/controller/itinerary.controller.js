import expenseModel from "../model/expense.model.js";
import itineraryModel from "../model/itinerary.model.js";

export const createItinerary = async (req, res) => {
  try {
    const data = await itineraryModel.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
export const getItineraries = async (req, res) => {
  try {
    const itineraries = await itineraryModel.find().sort({ createdAt: -1 });

    // Attach total expenses to each itinerary
    const withTotals = await Promise.all(
      itineraries.map(async (it) => {
        const total = await expenseModel.aggregate([
          { $match: { itineraryId: it._id } },
          { $group: { _id: null, sum: { $sum: "$amount" } } }
        ]);

        return {
          ...it.toObject(),
          totalExpenses: total[0]?.sum || 0
        };
      })
    );

    res.json(withTotals);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching itineraries" });
  }
};
// export const getItineraries = async (req, res) => {
//     const list = await itineraryModel.find({ userId: req.user });
//     res.json(list);
// };
export const getItineraryById = async (req, res) => {
  try {
    const itinerary = await itineraryModel.findById(req.params.id);
    if (!itinerary) return res.status(404).json({ message: "Itinerary not found" });
    res.json(itinerary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateItinerary = async (req, res) => {
  const { id } = req.params;
  const updateData = { ...req.body };

  // Convert date strings to Date objects
  if (updateData.startDate) updateData.startDate = new Date(updateData.startDate);
  if (updateData.endDate) updateData.endDate = new Date(updateData.endDate);

  try {
    const itinerary = await itineraryModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!itinerary) return res.status(404).json({ message: "Itinerary not found" });
    res.json(itinerary);
  } catch (err) {
    console.error('Error updating itinerary:', err.message);
    res.status(500).json({ message: err.message });
  }
};


export const deleteItinerary = async (req, res) => {
  try {
    const { id } = req.params;

    const itinerary = await itineraryModel.findById(id);
    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    // Delete related expenses
    await expenseModel.deleteMany({ itineraryId: id });

    // Delete the itinerary
    await itineraryModel.findByIdAndDelete(id);

    return res.json({ message: "Itinerary and related expenses deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return res.status(500).json({ message: "Error deleting itinerary", error: err.message });
  }
};