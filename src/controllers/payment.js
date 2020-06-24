const paymentService = require("../services/payment");
const commonService = require("../services/common");

function get_all(req,res){
    //req.user available after middleware pass-through
    paymentService.get_loan_payments(req.params.loanId)
    .then(data=>res.send(data))
    .catch((err)=>{
        return res.status(500).send({
            message: err.message
         });
    })
}

function get(req,res){
    paymentService.get_loan_payment(req.params.paymentId)
    .then(data=>res.send(data))
    .catch((err)=>{
        return res.status(500).send({
            message: err.message
         });
    })
}

function create(req,res){
    let loanId = req.params.loanId;
    let paymentAmount = req.body.paymentAmount;
    //Here, we could replace search and calculation with a cache, but simple for now
    const outstandingBalance = commonService.get_loan_balance(loanId)
    .then(value=>{
        let balance = value.data.balance;
        try{
            if(balance<=paymentAmount){
                const paymentPayload = {
                    loan_id: loanId,
                    payment_amount: paymentAmount,
                    status_id: 0 //some way to track pending, accepted, failed payments
                };
                paymentService.create(paymentPayload).then(data=>res.status(200).send(data));
            }else{
                return res.status(400).send({ success: false, message: 'Cannot accept payment greater than outstanding balance' });
            }
        }catch(error){
            console.log(error);
            return res.status(400).send(error);
        }
    })
}


module.exports= {
    get, 
    get_all, 
    create
}