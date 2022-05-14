module.exports = (sequelize, DataTypes) => {

    const Rentals = sequelize.define("Rentals", {
        RentingID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        StartDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        EndDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        PickUp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        DropOff: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Cost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Rentals.associate = (models) => {
        Rentals.hasMany(models.Preparation, {
            onDelete: "cascade",
        });
    };
    

    return Rentals;
};