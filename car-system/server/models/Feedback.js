module.exports = (sequelize, DataTypes) => {

    const FeedBack = sequelize.define("Feedback", {
        FeedBack: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return FeedBack;
};