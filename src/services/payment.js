const Payment = require("../models").Payment;

const get = (paymentId) => {
    return Payment.findOne({
        where: {
            id: paymentId
        },
        raw: true
   }).then(payment => {
        if (!payment)
            throw new Error('Payment not found or you don\'t have access to view this payment.');
        return loan;
    });
}

const get_all = (loanId) => {
    return Payment.findAll({
        where: {
            loan_id:loanId
        },
        raw: true
   }).then(payments => {
        return payments;
    });
}

const get_total_payments = (loanId) =>{
    return Payment.findAll({
        attributes: [[sequelize.fn('sum', sequelize.col('payment_amount')), 'total']],
        group : ['Payment.loan_id'],
        raw: true,
    });
};

exports.getBestSellerItems = () => SaleItem.findAll({

    order: sequelize.literal('total DESC')
  });

const create = payment => Payment.create(payment);

module.exports = {get, get_all, create, get_total_payments};