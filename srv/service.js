
const cds = require('@sap/cds');
const { Entrada } = cds.entities;

module.exports = srv => {
    srv.before('CREATE', 'Pedido', (req) => {

        req.data.Estado_code = 'P';   // prueba para cambiar el estado al crear un pedido
    });


    srv.before('CREATE', 'Linea', (linea) => {

        linea.data;   // prueba para ver los datos al crear  una linea
    });

    srv.before('CREATE', 'Entrada', (req) => {

        if (req.data.Kilos == null) {
            req.error(400, 'El campo Kilos es obligatorio');
            return;
        }
        // al crear la entrada igualo los kilos a los kilos disponibles
        req.data.Kilos_disponibles = req.data.Kilos;

    });

    /**
     * codigo a ejecutar antes (BEFORE) de crear un registro en Trazabilidad
     */
    srv.before('CREATE', 'Trazabilidad', async (req) => {

        /*Extraigo de req.data que contiene los datos que el cliente está intentando crear, el ID y los kilos*/
        var Entrada_Id = req.data.Entrada_Id;
        var Kilos_Usados = req.data.Kilos_Usados;

        /*Detengo la ejecucion si no existen los datos*/
        if (!Entrada_Id || !Kilos_Usados) return;

        /*Creo una variable que almacene la transaccion ligada al request
            Todo lo que se ejecute con tx.run():
                Se confirma (commit) si todo sale bien
                Se revierte (rollback) si ocurre un error */
        const tx = cds.tx(req);

        const entrada = await tx.run(
            /* SELECT.one.from(Entrada).where({ Id: Entrada_Id }) */
            SELECT.from(Entrada, Entrada_Id)
        );

        /*Validar que la Entrada exista*/
        if (!entrada) {
            req.error(404, 'Entrada no encontrada');
            return;
        }
        /*Validar kilos disponibles*/
        if (entrada.Kilos_disponibles < Kilos_Usados) {
            req.error(400, 'No hay kilos disponibles suficientes');
            return;
        }
        
        /*Actualizar kilos disponibles en la Entrada, dentro de la misma transacción (tx)
        garantizando que si falla la creación de Trazabilidad, no se descuentan los kilos*/
        await tx.run(
            UPDATE(Entrada)
                .set({
                    Kilos_disponibles: entrada.Kilos_disponibles - Kilos_Usados
                })
                .where({ Id: Entrada_Id })
        );
    });


    /**finalizar pedido */
    srv.before('UPDATE', 'Pedido', async (req) => {

        if (!req.data.Estado_code) return;

        const tx = cds.tx(req);

        const pedido = await tx.run(
            SELECT.one.from('Pedido').where({ Id: req.data.Id })
            
        );

        if (!pedido) {
            req.error(404, 'Pedido no encontrado');
            return;
        }

        if (pedido.Estado_code === 'F') {
            req.error(400, 'El pedido ya está finalizado');
            return;
        }

        // (Opcional) Validar trazabilidad
        const trazas = await tx.run(
            SELECT.from('Trazabilidad')
                .where({ 'Linea.Pedido_Id': pedido.Id })
        );

        if (!trazas.length) {
            req.error(400, 'El pedido no tiene trazabilidad');
            return;
        }

    });





};