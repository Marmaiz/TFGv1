
const cds = require('@sap/cds');
const { Entrada } = cds.entities;

module.exports = srv => {
    /*     srv.before('CREATE', 'Pedido', (req) => {
    
            req.data.Estado_code = 'P';   // prueba para cambiar el estado al crear un pedido
        }); */


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
        var Linea_Id = req.data.Linea_Id;

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

        const linea = await tx.run(
            SELECT.one.from('Linea').where({ Id: Linea_Id })
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

        /*Validar que la linea exista*/
        if (!linea) {
            req.error(404, 'Línea no encontrada');
            return;
        }

        /* Calcular kilos ya usados en la línea */
        const result = await tx.run(
            SELECT.one
                .from('Trazabilidad')
                .columns`sum(Kilos_Usados) as total`
                .where({ Linea_Id })
        );

        const kilosUsadosLinea = result?.total || 0;

        /* Validar que no se superen los kilos de la línea */
        if (kilosUsadosLinea + Kilos_Usados > linea.Kilos) {
            req.error(
                400,
                `Se superan los kilos de la línea. Kilos faltantes: ${linea.Kilos - kilosUsadosLinea}`
            );
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

        // Verifico que exista el campo Estado del pedido
        const nuevoEstado = req.data.Estado_code;
        if (!nuevoEstado) return; 

        // Declaro una variable para almacenar la transaccion
        const tx = cds.tx(req);

        // Selecciono el pedido de la consulta 
        const pedido = await tx.run(
            SELECT.one.from('Pedido').where({ Id: req.data.Id })
        );

        // Selecciono las líneas del pedido
        const lineas = await tx.run(
            SELECT.from('Linea').where({ Pedido_Id: pedido.Id })
        );

        // Hago las comprobaciones
        if (!pedido) {
            req.error(404, 'Pedido no encontrado');
            return;
        }

        if (!lineas.length) {
            req.error(400, 'El pedido no tiene líneas');
            return;
        }

        // Valido que las lineas tengan los campos obligatorios, y kilos con un valor positivo
        for (const linea of lineas) {
            if (
                !linea.Producto_Id ||
                !linea.Variedad_Id ||
                !linea.Caja_Id ||
                !linea.Calibre_Id ||
                !linea.Kilos ||
                linea.Kilos <= 0
            ) {
                req.error(400, 'Existen líneas con campos obligatorios vacíos');
                return;
            }
        }

        // Compruebo que el pedido no este finalizado ya
        if (pedido.Estado_code === 'F') {
            req.error(400, 'El pedido ya está finalizado');
            return;
        }

        if (nuevoEstado === 'F') {
            // Valido que al pedido se le hayan asignado entradas antes de cambiar su estado de Creado a Procesando
            let trazabilidad = await tx.run(
                SELECT.from('Trazabilidad')
                    .where({ 'Linea.Pedido_Id': pedido.Id })
            );

            if (!trazabilidad.length) {
                req.error(400, 'El pedido no tiene asignada entradas');
                return;
            }

            const lineas = await tx.run(
                SELECT.from('Linea').where({ Pedido_Id: pedido.Id })
            );

            for (const linea of lineas) {
                const result = await tx.run(
                    SELECT.one
                        .from('Trazabilidad')
                        .columns`sum(Kilos_Usados) as total`
                        .where({ Linea_Id: linea.Id })
                );

                // Devuelve los kilos asignados, si no existen asumo que son 0 kilos
                const kilosAsignados = result?.total || 0;

                if (kilosAsignados !== linea.Kilos) {
                    req.error(
                        400,
                        'No se puede finalizar la línea, faltan kilos.'
                    );
                    return;
                }
            }
        }

    });







};