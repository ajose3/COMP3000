module.exports = (sequelize, DataTypes) => {

    const Rental = sequelize.define("Rental", {
        RentingID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Cost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        StartDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        EndDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
    });

    return Rental;
};