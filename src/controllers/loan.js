const loanService = require("../services/loan");
const commonServie = require("../services/common");

async function get_all(req,res){
    //req.user available after middleware pass-through
    loanService.get_all(req.user.id)
    .then(data=>{
        data.forEach(loan => {
            loan.outstanding_balance = await commonServie.get_loan_balance(loan.id);
        });
        return res.send(data);
    })
    .catch((err)=>{
        return res.status(500).send({
            message: err.message
         });
    })
}

async function get(req,res){
    loanService.get(req.params.loanId)
    .then(data=>{
        let balance = await commonServie.get_loan_balance(req.params.loanId)
        let loanPayload = {
            date_created: data.created_at,
            funded_amount: data.funded_amount,
            outstanding_balance: balance
        }
        return res.send(loanPayload);
    })
    .catch((err)=>{
        return res.status(500).send({
            message: err.message
         });
    })
}


module.exports= {
    get,
    get_all
}