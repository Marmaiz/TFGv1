sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/UIComponent",
  "sap/m/MessageToast",
  "sap/m/MessageBox"
], function (Controller, UIComponent, MessageToast, MessageBox) {
  "use strict";

  return Controller.extend("DetallePedido.controller.App", {
    onInit: function () {
      let oRouter = UIComponent.getRouterFor(this);
      oRouter.getRoute("DetallePedido").attachMatched(this._onRouteMatched, this);

    },
    _onRouteMatched: function (oEvent) {
      let oArgs, oView;
      oArgs = oEvent.getParameter("arguments");
      oView = this.getView();

      oView.bindElement({
        //path: `/Pedido(Id=guid'${oArgs.Id}',IsActiveEntity=true)`,
        path: `/Pedido(Id=guid'${oArgs.Id}')`,
        parameters: {
          expand: "Linea"
        }
      })
    },

/**
 * Metodo para el agregado de una línea a la Tabla
 */
    onAgregarLinea: function () {
      console.log("Agregar línea presionado")
      //var sValor = this.getView().byId("idInputNombre").getValue();

      var oView = this.getView();
      var oModel = this.getView().getModel();
      var elementView = this.getView().getElementBinding().getBoundContext().getObject();

      /*       if (!this._oDialogNuevaLinea) {
              this._oDialogNuevaLinea = sap.ui.xmlfragment(oView.getId(), "pedidos.view.NuevaLinea", this);
              oView.addDependent(this._oDialogNuevaLinea);
            } */

      // Crear estructura vacía
      var newEntry = {        
        Producto_Id: "",
        Calibre_Id: "",
        Caja_Id: "",
        Kilos: 0,
        Precio: 0
      };

      if (!this._oDialogNuevaLinea) {
        this._oDialogNuevaLinea = sap.ui.xmlfragment(
          "pedidos.view.NuevaLinea",
          this
        );
        oView.addDependent(this._oDialogNuevaLinea);
      }

      this._oDialogNuevaLinea.open();
      /*Creo nuevo modelo para guardr los datos */
      var oModelNuevaLinea = new sap.ui.model.json.JSONModel();
      oModelNuevaLinea.setData(newEntry);

      /*seteo el modelo a la vista*/
      this.getView().setModel(oModelNuevaLinea, "NuevaLineaModel");
    },

/**
 * Metodo para realizar la consulta a la BD y crear la linea
 */
    onConfirmarNuevaLinea: function () {
      /*       var oView = this.getView();
            var oNuevaLineaModel = this.getView().getModel("NuevaLineaModel");
            var oData = oNuevaLineaModel.getData();
            console.log(oData)
            this._oDialogNuevaLinea.close(); */

      /* solucion de chaty*/
      const oModel = this.getView().getModel();     // OData V2 model
      const oData = this.getView().getModel("NuevaLineaModel").getData();
      const oView = this.getView();

      console.log(oData);

      // Obtenemos el path del Pedido actual
      const binding = oView.getElementBinding();
      const pedidoPath = binding.getPath();  // "/Pedido(Id=guid'...')"

      // Path para crear la línea (sub-collection)
      const lineaPath = pedidoPath + "/Linea";      
      const that = this;     

      oModel.create(lineaPath, oData, {
        success: function () {
          MessageToast.show("Línea creada correctamente");

          that._oDialogNuevaLinea.close();

          // Refrescar los datos del Pedido entero
          binding.refresh(true);
        },
        error: function (oError) {
          console.error("Error al crear línea", oError);
          MessageBox.error("No se pudo crear la línea");
        }
      });
    },

/**
 * Metodo para cancelar la creacion de una nueva linea
 */
    onCancelarNuevaLinea: function () {
      this._oDialogNuevaLinea.close();
    },

/**
 * Metodo para poder editar el pedido
 */
    onHacerEditable: function () {
      const oView = this.getView();

      // afectamos todos los controles que necesiten editarse
      oView.byId("inputClientePedido").setEditable(true);
      oView.byId("inputFechaPedido").setEditable(true);
      oView.byId("btnAgregarLinea").setEnabled(true);
      oView.byId("btnEliminarLinea").setEnabled(true);
    }

  });
});