import mongoose from "mongoose";

const tellerSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const Teller = mongoose.model("Teller", tellerSchema);

export default Teller;
