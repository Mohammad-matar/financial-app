const Transaction = require("../models/transactionModel")
const mongoose = require('mongoose');

// Get all transaction 
exports.getTransactions = async (req, res) => {
    try {
        const transaction = await Transaction.find();
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        res.status(200).send({ message: true, data: transaction });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}

// li betjib Transactions related to the user id
exports.getTransactionByUserId = async (req, res) => {
    try {
        const transaction = await Transaction.aggregate([
            { $match: { user_id: req.user._id } }]);
        res.status(200).send({ message: "Get All Transaction With  By User id Successfuly", data: transaction });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}


// li betjib Transactions related to the user id
exports.getTransactionByType = async (req, res) => {
    try {
        let { type } = req.query;
        const transaction = await Transaction.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "category"
                }
            },
            //to change the array of category to object
            {
                $unwind: "$category"
            },
            {
                $match: {
                    "category.type": type
                }
            }
        ]);
        res.status(200).send({ message: "Get All Transaction With  By type Successfuly", data: transaction });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}

// li betjib Transactions by date
exports.getTransactionByDate = async (req, res) => {
    try {
        let { date } = req.query;
        const transaction = await Transaction.aggregate([
            { $match: { date: date } }]);
        res.status(200).send({ message: "Get All Transaction With  By date Successfuly", data: transaction });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}

// li betjib Transactions month 
exports.getTransactionByMonth = async (req, res) => {
    try {
        let { date } = req.query;
        const specifiedDate = new Date(date); // replace with the desired date
        const transaction = await Transaction.aggregate([
            {
                $match: {
                    $and: [
                        {
                            date: {
                                $gte: new Date(specifiedDate.getFullYear(), specifiedDate.getMonth(), 1),
                                $lt: new Date(specifiedDate.getFullYear(), specifiedDate.getMonth() + 1, 1)
                            }
                        },
                        // {
                        //     user_id: req.user._id
                        // }
                    ]
                }
            },

        ])
        res.status(200).send({ message: "Get All Transaction With  By Month Successfuly", data: transaction });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}

// Get Transactions By Year

exports.getTransactionByYear = async (req, res) => {
    try {
        let { date } = req.query;
        const specifiedDate = new Date(date); // replace with the desired date
        const transaction = await Transaction.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(specifiedDate.getFullYear(), 0, 1),
                        $lt: new Date(specifiedDate.getFullYear() + 1, 0, 1)
                    }
                }
            }
        ])
        res.status(200).send({ message: "Get  Transaction With  By Year Successfuly", data: transaction });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}
// get transaction by category
exports.getTransactionByCategory = async (req, res) => {
    try {
        const transaction = await Transaction.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "category"
                }
            },
        ]);
        res.status(200).send({ message: "Get All Transaction With  Successfuly", data: transaction });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}
//Get transaction by id 
exports.getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findById(id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json({
            success: true,
            data: transaction,
            message: 'Successfully transaction',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

//Add a new Transaction

exports.addTransaction = async (req, res) => {
    try {
        const {
            title,
            description,
            amount,
            date,
            currency,
            category_id,
        } = req.body;

        const addNewTransaction = await Transaction.create({
            title,
            description,
            amount,
            date,
            currency,
            category_id,
            //user jeye mn l token zetou te3 l user
            user_id: req.user._id,
        });

        if (!addNewTransaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res
            .status(200)
            .send({ success: true, message: "Add Successfully", data: addNewTransaction });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
};

// Edit Transaction

exports.editTransication = async (req, res) => {
    try {
        let { id } = req.params;
        let body = req.body;
        const updateTransiction = await Transaction.updateOne(
            { _id: id },
            {
                $set: body,
            },
        );
        if (!updateTransiction) {
            return res.status(404).json({ message: "Transaction is not found" });
        }
        res.status(200).send({ success: true, message: "Edit Successfully", data: updateTransiction });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err)
    }
}

//Delete One Transaction

exports.deleteTransaction = async (req, res) => {
    try {
        let { id } = req.params;
        const deleteOneTransaction = await Transaction.findByIdAndDelete(
            { _id: id }
        );
        if (!deleteOneTransaction) {
            return res.status(404).json({ message: "Transaction Not Found" });
        }
        res.status(200).send({ success: true, message: "Transaction Deleted", data: deleteOneTransaction });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}