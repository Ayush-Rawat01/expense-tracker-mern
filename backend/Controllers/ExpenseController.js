
const UserModel = require("../Models/User");
const addExpense = async (req, res) => {

    const body = req.body;
    console.log(body);

    try {

        const userData = await UserModel.findByIdAndUpdate(
            req.user._id,
            { $push: { expenses: req.body } },
            { new: true } // For Returning the updated documents
        )
        res.status(200)
            .json({
                message: "Expense added successfully",
                success: true,
                data: userData?.expenses
            })
    }
    catch (err) {
        return res.status(400).json(
            {
                message: "something went wrong",
                error: err,
                success: false
            })
    }

}

const fetchExpense = async (req, res) => {


    try {

        const userData = await UserModel.findById(req.user._id).select('expenses');
        res.status(200)
            .json({
                message: "Expense fetched successfully",
                success: true,
                data: userData?.expenses
            })
    }
    catch (err) {
        return res.status(400).json(
            {
                message: "something went wrong",
                error: err,
                success: false
            })
    }

}

const deleteExpense = async (req, res) => {

    const { _id } = req.user;
    const expenseId = req.params.expenseId;
    try {
        const userData = await UserModel.findByIdAndUpdate(
            _id,
            { $pull: { expenses: { _id: expenseId } } },
            { new: true } // For Returning the updated documents
        )
        res.status(200)
            .json({
                message: "Expense Deleted successfully",
                success: true,
                data: userData?.expenses
            })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        })
    }
}

module.exports = { addExpense, fetchExpense, deleteExpense }