module.exports = (sequelize, DataTypes) => {

    const Billing = sequelize.define("Billing", {
        BillingID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        Cost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    });
    

    return Billing;
};