import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(
  "mysql://kiddie:StrongPass123!@localhost:33061/goa"
);

/*const test = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

test();*/



const User = sequelize.define("User", {
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone_no: { type: DataTypes.BIGINT, allowNull: true },
  password: { type: DataTypes.STRING, allowNull: false },
});

const Rooms = sequelize.define("Rooms", {
  adult_price: { type: DataTypes.FLOAT, allowNull: false },
  child_price: { type: DataTypes.FLOAT, allowNull: false },

});



const Conference = sequelize.define("Conference", {
  conference_price: { type: DataTypes.FLOAT, allowNull: false },
});



const PaymentHistory = sequelize.define("PaymentHistory", {
  time: { type: DataTypes.DATE, allowNull: false },
});

(async () => {
  await sequelize.sync(); // Sync all defined models to the database
  console.log('All models were synchronized successfully.');
}
)();

export { User, Rooms, Conference, PaymentHistory };