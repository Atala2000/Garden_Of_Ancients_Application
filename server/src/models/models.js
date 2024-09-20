import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(
  "mysql://kiddie:StrongPass123!@localhost:3306/goa"
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
  admin: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false }
});

const Rooms = sequelize.define("Rooms", {
  adult_price: { type: DataTypes.FLOAT, allowNull: false },
  child_price: { type: DataTypes.FLOAT, allowNull: false },

});

const Tour = sequelize.define("Tour", {
  spiceGarden: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 60 },
  beeGarden: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 50 },
  both: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 100 }
});





const Conference = sequelize.define("Conference", {
  conference_price: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 100 },
  photography_price: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 40 },
  videographu_price: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 60 },
  wedding_price: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 120 }
});



const PaymentHistory = sequelize.define("PaymentHistory", {
  email: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: false },
  startTime: { type: DataTypes.TIME, allowNull: true },
  endTime: { type: DataTypes.TIME, allowNull: true },
  period: { type: DataTypes.FLOAT, allowNull: false },
  time: { type: DataTypes.FLOAT, allowNull: true }
});



(async () => {
  await sequelize.sync(); // Sync all defined models to the database
  console.log('All models were synchronized successfully.');

}
)();

export { User, Rooms, Conference, PaymentHistory, Tour };