module.exports = (sequelize, DataTypes) => {

    const Agents = sequelize.define("Agents", {
        AgentID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        Username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    
    

    return Agents;
};