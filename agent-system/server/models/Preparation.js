module.exports = (sequelize, DataTypes) => {

    const Preparation = sequelize.define("Preparation", {
        PreparationID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        VehicleReadyDate: {
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
        Status: {
            type: DataTypes.STRING,
            allowNull:false,
        },
    });
    

    return Preparation;
};