const category = require("../models/categoryModel");
// const connectDB = require("../config/db");
// exports.getCategory = (req, res) => {
//   categorySchema.find((err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       if (data) {
//         res.render("../views/pages/category.ejs", { data: data });
//       } else {
//         res.render("../views/pages/404.ejs");
//       }
//     }
//   });
// };
// exports.getCategoryId = (req, res) => {
//   // res.render("../views/editCategory.ejs");
//   // console.log(req.params.id);
//    categorySchema.findById(req.params.id,(err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       if (data) {
//         res.render("../views/pages/editCategory.ejs", { data: data });
//       } else {
//         res.render("../views/pages/404.ejs");
//       }
//     }
//   });
// };
exports.newCategory = async (req, res, next) => {
	const name = req.body.name
	if(!req.body){
		res.status(400).json({
			success: false,
			message: "Enter the category name"
		})
	}else{
		const categorySelect = await category.findOne({name : req.body.name})
		if(categorySelect){
			res.status(404).json({
				success: false,
				message: "Category already exist"
			})
		}else{
			await category.create(req.body)
			res.status(200).json({
				success: true,
				message: "Category created successfully"
			})
		}
	}
};
// exports.updateCategory = (req, res) => {
//   categorySchema.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true },
//     (err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.redirect("/category");
//       }
//     }
//   );
// };
// exports.deleteCategory = (req, res) => {
//   console.log();
//   categorySchema.findByIdAndRemove(req.params.id, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.redirect("/category");
//     }
//   })
// };
