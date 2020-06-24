const Sequelize = require('sequelize');
const sequelize = require('../db');//would contain sequelize/db config and setup

const Loan = sequelize.define('CampOwner', {
    id:{
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    funded_amount: Sequelize.STRING,
    cust_id: Sequelize.BIGINT
});

/*
Sequelize adds created_at/updated_at by default, so that covers payment creation date.
I've added a date_settled column to accommodate tracking when the payment was actually settled vs created
*/
const Payment = sequelize.define('Payment',{
    id:{
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    payment_amount: Sequelize.DECIMAL,
    date_settled: Sequelize.DATE,
    status_id: Sequelize.INTEGER,
    loan_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {         // Payment belongsTo Loan 1:1
          model: 'Loan',
          key: 'id'
        }
      },
});

Payment.belongsTo(Loan, {foreignKey: 'loan_id', as: 'loan'});
Loan.hasMany(Payment, {as: 'payments'});

module.exports = {
    Loan,
    Payment
}