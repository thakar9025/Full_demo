var bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
        },
    })
    User.beforeCreate((user, options) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
    });
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
      }; 
    return User
}


// export User model for use in other files.
