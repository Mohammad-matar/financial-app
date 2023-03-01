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
            message: 'Successfully fetched transaction',
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
            user_id,
            category_id,
        } = req.body;

        const addNewTransaction = await Transaction.create({
            title,
            description,
            amount,
            date,
            currency,
            user_id,
            category_id,
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