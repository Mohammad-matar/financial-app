const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please enter your full name"],
        minLength: 3,
        trim: true
    },
    image: String,
    username: {
        type: String,
        required: [true, "Please enter your username"],
        minLength: 3,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: [true, "Please enter your email"],
    },
    password: {
        type: String,
        minLength: 8,
        trim: true,
        required: [true, "Please enter your password"],
    },
    passwordConfirm: {
        type: String,
        minLength: 8,
        trim: true,
        required: [true, "Please confirm your password"],
    },
    phoneNumber: {
        type: String,
        minLength: 8,
        trim: true,
    },
    location: {
        type: String,
        minLength: 3,
        trim: true
    },
    passwordChangedAt: Date,

    role: {
        type: String,
        default: "user",
        enum: ["admin", "user"]
    },
},
    {
        timestamps: true
    }
);
//checking the passowrd and hashing it in signup
userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) {
            return next();
        }
        this.password = await bcrypt.hash(this.password, 12);
        this.passwordConfirm = undefined;
    } catch (err) {
        console.log(err)
    }
})


userSchema.methods.checkPassword = async function (
    candidatePassword, // password inside to body
    userPassword //inside the DB
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};


userSchema.methods.passwordChangedAfterTokenIssued = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const passwordChangeTime = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );
        return passwordChangeTime > JWTTimestamp
    }
    return false;
};


module.exports = mongoose.model("User", userSchema);
