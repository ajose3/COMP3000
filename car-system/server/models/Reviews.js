module.exports = (sequelize, DataTypes) => {

    const Reviews = sequelize.define("Reviews", {
        Review: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return Reviews;
};