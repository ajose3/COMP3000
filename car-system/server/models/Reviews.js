module.exports = (sequelize, DataTypes) => {

    const Reviews = sequelize.define("Reviews", {
        Review: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        FirstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Reviews;
};