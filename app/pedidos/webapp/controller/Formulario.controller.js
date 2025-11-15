sap.ui.define([
 "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast"
], function(Controller, UIComponent, MessageToast) {
    "use strict";

  return Controller.extend("Formulario.controller.App", {
      onInit: function () {
        let oRouter = UIComponent.getRouterFor(this);
        oRouter.getRoute("DetallePedido").attachMatched(this._onRouteMatched,this);

        },
      _onRouteMatched: function(oEvent){
        let oArgs, oView;
        oArgs = oEvent.getParameter("arguments");
        oView = this.getView();
        
        oView.bindElement({
           path: `/Pedido(Id=guid'${oArgs.Id}',IsActiveEntity=true)`,
    parameters: {
        expand: "Linea"
    }
        })
        console.log(oArgs);
      }    
  });
});