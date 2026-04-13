require("dotenv").config();

module.exports = {
	PORT: Number(process.env.PORT) || 5555,
	mongoDBURL: process.env.MONGODB_URL || "",
};