
const cds = require('@sap/cds');

module.exports = srv => {
    srv.before('CREATE', 'Pedido', (req) => {
        
        req.data.Estado_code = 'P';   // o Estado_ID, según tu modelo
    });


    srv.before('CREATE', 'Linea', (linea) => {
        
        linea.data ;   // o Estado_ID, según tu modelo
    });
};