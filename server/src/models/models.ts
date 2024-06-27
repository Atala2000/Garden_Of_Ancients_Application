import { Types } from "mysql2";
import { type } from "os";
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize('mysql://kiddie:StrongPass123!@localhost:33061/goa');

// const test = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

// test();

const User = sequelize.define('User',{
    email: {type: DataTypes.STRING, 
        allowNull: true,
    }, 
    phone_no: {type: DataTypes.BIGINT,
        allowNull: true,
    },
    }
)

const Rooms = sequelize.define("Rooms", {
    adult_price: {type: DataTypes.FLOAT,
        allowNull: false,
    },
    child_price: {type: DataTypes.FLOAT, allowNull: false}
})

const Conference = sequelize.define("Conference", {
    conference_price: {type: DataTypes.FLOAT, allowNull: false}
})


const PaymentHistory = sequelize.define("PaymentHistory", {
    time: {type: DataTypes.DATE, allowNull: false}
})