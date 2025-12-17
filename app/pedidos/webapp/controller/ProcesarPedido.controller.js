sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast"
], (Controller, UIComponent, MessageToast) => {
  "use strict";

  return Controller.extend("pedidos.controller.ProcesarPedido", {
    onInit: function () {
      let oRouter = UIComponent.getRouterFor(this);
      oRouter.getRoute("ProcesarPedido").attachMatched(this._onRouteMatched, this);

    },
    _onRouteMatched: function (oEvent) {
      let oArgs, oView;
      oArgs = oEvent.getParameter("arguments");
      oView = this.getView();

      oView.bindElement({
        path: `/Pedido(Id=guid'${oArgs.Id}')`,

  parameters: {
    expand: "Cliente"
  }
        
        /*  parameters: {
          expand: "Lineas"
        } */ 
      })
    },
  });
});