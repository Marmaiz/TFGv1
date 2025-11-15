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
            sap.m.MessageToast.show("Creando pedido...");

            let oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("DetallePedido",
                {},
            ); 
        },

        onEliminarPedido: function (oEvent) {
            sap.m.MessageToast.show("Eliminando pedido...");
            // Aquí tu lógica de borrado
        },

        onDetail: function (oEvent){
            MessageToast.show("Abriendo pedido...");
            var pedidoId = oEvent.getSource().getBindingContext().getObject().Id;
            let oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("DetallePedido",
                {Id: pedidoId}
            ); 
        },
        
        onPress: function (evt) {
			MessageToast.show(evt.getSource().getId() + " Pressed");
		}
    });
});