const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: [true, "Please enter the title"],
        minLength: 3,
        trim: true
    },
    type: {
        type: String,
        default: "expense",
        enum: ["income", "expense"],
    },

    isDefault: {
        type: Boolean,
        default: false,
    },

    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

},
    {
        timestamps: true
    }
);


module.exports = mongoose.model("Category", categorySchema);
