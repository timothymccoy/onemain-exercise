const cors = require('cors');
const authMiddleware = require("./middlewares/auth");


const loanController = require('./controllers/loan');
const paymentController = require('./controllers/payment');


module.exports.set = app => {
    app.use(cors({origin: process.env.SPA_URL}));
    app.get('/api/loans/index', loanController.get_all);
    app.get('/api/loans/show/:loanId', loanController.get);
    app.get('/api/loans/:loanId/payments', paymentController.get_all);
    app.get('/api/loans/:loanId/payments/:paymentId', paymentController.get);
    app.post('/api/loans/:loanId/payments', paymentController.create);
}