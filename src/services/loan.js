const Loan = require("../models").Loan;

const get = (loanId) => {
    return Loan.findOne({
        where: {
            id: loanId
        },
        raw: true
   }).then(loan => {
        if (!loan)
            throw new Error('Loan not found or you don\'t have access to view this loan.');
        return loan;
    });
}

const get_all = (userId) => {
    return Loan.findAll({
        where: {
            cust_id:userId
        },
        raw: true
   }).then(loans => {
        return loans;
    });
}

module.exports = {get, get_all};