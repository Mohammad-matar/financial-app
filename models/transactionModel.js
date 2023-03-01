const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter the title"],
        minLength: 3,
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter the description"],
        minLength: 3,
        trim: true
    },
    amount: {
        type: String,
        unique: true,
        required: [true, "Please enter your amount"],
    },
    date: {
        type: String,
        minLength: 8,
        trim: true,
        required: [true, "Please enter the date"],
    },
    currency: {
        type: String,
        trim: true,
        required: [true, "Please add the currency"],
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    }

},
    {
        timestamps: true
    }
);



module.exports = mongoose.model("Transaction", transactionSchema);
