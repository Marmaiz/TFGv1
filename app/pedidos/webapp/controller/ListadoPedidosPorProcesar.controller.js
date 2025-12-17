sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast"
], (Controller, UIComponent, MessageToast) => {
  "use strict";

  return Controller.extend("pedidos.controller.ListadoPedidosPorProcesar", {
      onInit() {
      }, 

      onGestionar: function (oEvent) {
            MessageToast.show("Abriendo pedido...");

            var pedidoId = oEvent.getSource().getBindingContext().getObject().Id;
            console.log(pedidoId);
            let oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("ProcesarPedido",
                { Id: pedidoId }
            );
        },
  });
});