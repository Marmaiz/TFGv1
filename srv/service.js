
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

    srv.before('CREATE', 'Trazabilidad', async (req) => {

        var Entrada_Id = req.data.Entrada_Id;
        var Kilos_Usados = req.data.Kilos_Usados;

        if ( !Entrada_Id || !Kilos_Usados) return;

        const tx = cds.tx(req);

        const entrada = await tx.run(
            SELECT.one.from(Entrada).where({
                Id: Entrada_Id })
        );

        if (!entrada) {
            req.error(404, 'Entrada no encontrada');
            return;
        }

        if (entrada.Kilos_disponibles < Kilos_Usados) {
            req.error(400, 'No hay kilos disponibles suficientes');
            return;
        }

        await tx.run(
            UPDATE(Entrada)
                .set({
                    Kilos_disponibles: entrada.Kilos_disponibles - Kilos_Usados
                })
                .where({ Id: Entrada_Id })
        );
    });


};