const User = require('../models/userModel');
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
//geting the password into a jwt token and make it expire
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

//function to send the token to the user
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
};

//creating signup function
exports.signup = async (req, res) => {
    try {
        const emailCheck = await User.findOne({ email: req.body.email });

        if (emailCheck) {
            return res.status(409).json({ message: "The email is already in use" })
        }

        if (!validator.isEmail(req.body.email)) {
            return res.status(400).json({ message: "The email is not valide" })
        }
        if (req.body.password !== req.body.passwordConfirm) {
            return res.status(400).json({ message: "Password and PasswordConfirm don't match" })
        }
        const newUser = await User.create({
            fullName: req.body.fullName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            role: req.body.role,
        });
        createSendToken(newUser, 201, res)
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err)
    }
}

//login function
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //we are checking now if the user is exist
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!(await user.checkPassword(password, user.password))) {
            return res.status(401).json({ message: "Incorrect email or password" })
        }

        createSendToken(user, 200, res);
    } catch (err) {
        console.log(err);
    }
};

exports.protect = async (req, res, next) => {
    try {
        // 1- we should check if the user exist
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return res.status(401)
                .json({ message: "You're not Logged in" });
        }

        // 2- Token verification
        let decoded;
        try {
            decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        } catch (error) {
            if (error.name === "JsonWebTokenError") {
                return res.status(401)
                    .json("Invalid Token");
            }
            else if (error.name === "TokenExpiredError") {
                return res.status(401)
                    .json("Your sessions token has expired !! Login again");

            }
        }

        // 3- check if the user still exist
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401)
                .json({ message: "The token owner no longer exist" });
        }

        // 4- check if the user changed the pass after taking the token
        if (currentUser.passwordChangedAfterTokenIssued(decoded.iat)) {
            return res.status(401).json({ message: "Your password has been changed, please login again !" })
        }

        // iza ata3nehon kellon weadd the user to all the request
        req.user = currentUser;
        next()
    } catch (err) {
        console.log(err)
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).send({ success: true, message: "Deleted Successfully", data: users });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
};


exports.editUser = async (req, res) => {
    try {
        let { id } = req.params;
        let body = req.body;
        const updateUser = await User.updateOne(
            { _id: id },
            {
                $set: body,
            },
        );
        if (!updateUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).send({ success: true, message: "Edit Successfully", data: updateUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err)
    }

}
exports.deleteUser = async (req, res) => {
    try {
        let { id } = req.params;
        const deleteUser = await User.findByIdAndDelete(
            { _id: id }
        );
        if (!deleteUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).send({ success: true, message: "Deleted Successfully", data: deleteUser });
    } catch (err) {
        console.log(err)
    }
}
