const loanService = require("../services/loan");
const paymentService = require("../services/payment");

async function get_loan_balance(req,res){
    const totalPayments = paymentService.get_total_payments(req.body.loanId)
    .then(value=>{
        let totalPaid = value.data.total;
        const loan = loanService.get(req.body.loanId).
        then(result=>{
            let fundedAmount = result[0].data.funded_amount;
            let balance = fundedAmount - totalPaid;
            return res.send({balance:balance});
        })
        .catch((err)=>{
            return res.status(500).send({
                message: err.message
             });
        })
    })
    .catch((err)=>{
        return res.status(500).send({
            message: err.message
         });
    })
}


module.exports= {
    get_loan_balance
}