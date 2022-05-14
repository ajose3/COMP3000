const Reviews = require("./Reviews");

module.exports = (sequelize, DataTypes) => {

    const Vehicles = sequelize.define("Vehicles", {
        RegPlate: {
            type: DataTypes.STRING(7),
            allowNull: false,
            primaryKey: true
        },
        CarMake: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        CarModel: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        CarYear: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        CarImage: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        CarPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        CarCategory: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        CarTransmission: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        CarSeats: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Vehicles.associate = (models) => {
        Vehicles.hasMany(models.Reviews, {
            onDelete: "cascade",
        });
        Vehicles.hasMany(models.Rentals, {
            onDelete: "cascade",
        });
        Vehicles.hasMany(models.Feedback, {
            onDelete: "cascade",
        });
    };
    
    
    return Vehicles;
};