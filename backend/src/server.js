import app from "./app.js";

const PORT = process.env.PORT || 5000;

console.log("JWT", process.env.JWT)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
