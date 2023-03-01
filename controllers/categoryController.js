const Category = require("../models/categoryModel")

// Get all transaction 
exports.getAllCategories = async (req, res) => {
    try {
        const category = await Category.find();
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).send({ message: true, data: category });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}

// li betjib categories default ma3 l types li 7ateton l user bass elou
exports.getDefaultCategoriesWithCustomizeByType = async (req, res) => {
    try {
        const { type } = req.query;
        const categories = await Category.aggregate([
            { $match: { $and: [{ $or: [{ isDefault: true }, { user_id: req.user._id }] }, { type: type }] } },
        ]);
        res.status(200).send({ message: "Get All Default Categories With Customize By Type Successfuly", data: categories });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}
// li betjib categories default ma3 l types 
exports.getDefaultCategoriesByType = async (req, res) => {
    try {
        const { type } = req.query;
        const categories = await Category.aggregate([
            { $match: { $and: [{ isDefault: true }, { type: type }] } },
        ]);
        res.status(200).send({ message: "Get All Default Categories By Type Successfuly", data: categories });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}
// li betjib categories Admin and user
exports.getDefaultCategoriesToTheAdminAndUser = async (req, res) => {
    try {
        const categories = await Category.aggregate([
            { $match: { isDefault: true } },
        ]);
        res.status(200).send({ message: "Get All Default Categories To The Admin And User Successfuly", data: categories });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}
// li betjib category by type    
exports.getDefaultCategoriesByType = async (req, res) => {
    try {
        const { type } = req.query;
        const categories = await Category.aggregate([
            { $match: { type: type } },
        ]);
        res.status(200).send({ message: "Get All Categories By Type Successfuly", data: categories });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}

//Get Category by id 
exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({
            success: true,
            data: category,
            message: 'Successfully category',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

//Add a new Category

exports.addCategory = async (req, res) => {
    try {
        const {
            title,
            type,
            isDefault,
        } = req.body;

        const addNewCategory = await Category.create({
            title,
            type,
            isDefault,
            user_id: req.user._id,
        });

        if (!addNewCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res
            .status(200)
            .send({ success: true, message: "Add Successfully", data: addNewCategory });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
};

// Edit Category

exports.editOneCategory = async (req, res) => {
    try {
        let { id } = req.params;
        let body = req.body;
        const updateCategory = await Category.updateOne(
            { _id: id },
            {
                $set: body,
            },
        );
        if (!updateCategory) {
            return res.status(404).json({ message: "Category is not found" });
        }
        res.status(200).send({ success: true, message: "Edit Successfully", data: updateCategory });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err)
    }
}

//Delete One Category

exports.deleteCategory = async (req, res) => {
    try {
        let { id } = req.params;
        const deleteOneCategory = await Category.findByIdAndDelete(
            { _id: id }
        );
        if (!deleteOneCategory) {
            return res.status(404).json({ message: "Category Not Found" });
        }
        res.status(200).send({ success: true, message: "Category Deleted", data: deleteOneCategory });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}