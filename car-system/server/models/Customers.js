module.exports = (sequelize, DataTypes) => {

    const Customers = sequelize.define("Customers", {
        CustomerID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        FirstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        DateOfBirth: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        DrivingLicenseNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Address: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        PhoneNumber: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });
    
    Customers.associate = (models) => {
        Customers.hasMany(models.Rental, {
            onDelete: "cascade",
        });
    };

    return Customers;
};