
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:  true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        lastLoginAt: {
            type: DataTypes.DATE,
        }
    })

    return user
}