sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast"
], (Controller, UIComponent, MessageToast) => {
    "use strict";

    return Controller.extend("pedidos.controller.Pedidos", {
        onInit() {

        },

        onCrearPedido: function (oEvent) {
            MessageToast.show("Creando pedido...");

            /* let oRouter = UIComponent.getRouterFor(this);
             oRouter.navTo("DetallePedido",
                 {},
             );*/


            var oView = this.getView();

            // Crear estructura vacía
            var newEntry = {
                Cliente_Id: "",
                //Fecha_Pedido: new Date(),
                Fecha_Pedido: null,
                Estado_code: "C"
            };

            if (!this._oDialogNuevoPedido) {
                this._oDialogNuevoPedido = sap.ui.xmlfragment(
                    "pedidos.view.NuevoPedido",
                    this
                );
                oView.addDependent(this._oDialogNuevoPedido);
            }

            this._oDialogNuevoPedido.open();
            /*Creo nuevo modelo para guardr los datos */
            var oModelNuevoPedido = new sap.ui.model.json.JSONModel();
            oModelNuevoPedido.setData(newEntry);

            /*seteo el modelo a la vista*/
            this.getView().setModel(oModelNuevoPedido, "NuevoPedidoModel");

        },

        onConfirmarNuevoPedido: function () {
            /* var oView = this.getView();
            var oModelNuevoPedido = this.getView().getModel("NuevoPedidoModel");
            var oData = oModelNuevoPedido.getData();
            console.log(oData) */
            const oModel = this.getView().getModel();     // OData V2 model
            const oData = this.getView().getModel("NuevoPedidoModel").getData();
            const that = this;

            oModel.create("/Pedido", oData, {
                success: function () {
                    MessageToast.show("Pedido creado correctamente");

                    that._oDialogNuevoPedido.close();

                    // Refrescar tabla
                    oModel.refresh(true);
                },
                error: function (oError) {
                    console.error("Error al crear pedido", oError);
                    MessageBox.error("No se pudo crear el pedido");
                }
            });

            this._oDialogNuevoPedido.close();
        },


        onCancelarNuevoPedido: function () {
            this._oDialogNuevoPedido.close();
        },

        onEliminarPedido: async function () {

            const oTable = this.byId("tablaPedidos");
            const aSelectedIndices = oTable.getSelectedIndices();

            if (aSelectedIndices.length === 0) {
                MessageToast.show("Seleccione un pedido para eliminar.");
                return;
            }

            // Solo permitimos eliminar 1 pedido a la vez
            const iIndex = aSelectedIndices[0];

            // Obtener el contexto de la fila seleccionada
            const oContext = oTable.getContextByIndex(iIndex);
            const sPath = oContext.getPath();     // "/Pedido(key...)"

            const oModel = this.getView().getModel();

            // Confirmación
            const bConfirm = confirm("¿Seguro que quieres eliminar este pedido?");
            if (!bConfirm) return;

            try {
                // DELETE al backend CAP
                await oModel.remove(sPath);

                sap.m.MessageToast.show("Pedido eliminado.");

                // Actualizar la tabla
                oModel.refresh(true);

            } catch (err) {
                console.error(err);
                sap.m.MessageToast.show("Error al eliminar el pedido.");
            }
        },


        onEliminarPedido2: function () {

            const oTable = this.byId("tablaPedidos");
            const aSelectedIndices = oTable.getSelectedIndices();

            if (aSelectedIndices.length === 0) {
                MessageToast.show("Seleccione un pedido para eliminar.");
                return;
            }

            // Solo permitimos eliminar 1 pedido a la vez
            const iIndex = aSelectedIndices[0];

            // Obtener el contexto de la fila seleccionada
            const oContext = oTable.getContextByIndex(iIndex);
            const sPath = oContext.getPath();     // "/Pedido(key...)"

            const oModel = this.getView().getModel();

            // Confirmación
            const bConfirm = confirm("¿Seguro que quieres eliminar este pedido?");
            if (!bConfirm) return;

            try {
                // DELETE al backend CAP
                oModel.remove(sPath);

                sap.m.MessageToast.show("Pedido eliminado.");

                // Actualizar la tabla
                oModel.refresh(true);

            } catch (err) {
                console.error(err);
                sap.m.MessageToast.show("Error al eliminar el pedido.");
            }
        },

/**
* Metodo para abrir la vista donde estan los detalles del pedido seleccionado
*/
        onDetail: function (oEvent) {
            MessageToast.show("Abriendo pedido...");

            var pedidoId = oEvent.getSource().getBindingContext().getObject().Id;
            let oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("DetallePedido",
                { Id: pedidoId }
            );
        },

        onProcesarPedidos: function () {
            MessageToast.show("Procesando pedidos...");
            let oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("ListadoPedidosPorProcesar",
                {  }
            );
        },

        onPress: function (evt) {
            MessageToast.show(evt.getSource().getId() + " Pressed");
        }
    });
});