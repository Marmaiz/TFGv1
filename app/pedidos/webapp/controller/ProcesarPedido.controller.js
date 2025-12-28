sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/UIComponent",
  "sap/m/MessageToast",
  "sap/m/MessageBox",
], (Controller, UIComponent, MessageToast, MessageBox) => {
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
      })
    },

    onAñadirEntrada: function (oEvent) {
      MessageToast.show("Añadiendo entrada...");
      var oView = this.getView();

      /*  // Línea actual 
       const oLineaCtx = oEvent.getSource().getBindingContext();
       const oLinea = oLineaCtx.getObject();
       this._sLineaId = oLinea.Id; */

      // Crear estructura vacía
      // cuando añado una entrada a un pedido que entidad estoy modificando ?
      // debo crear un instancia de trazabilidad con la linea y la entrada, y los kilos utilizados
      // luego al validar debo modificar la instancia de Entrada, y restarle los kilos que he gastado 
      // Id,Linea_Id,Entrada_Id,Kilos_Usados
      var newEntry = {
        Linea_Id: this._sLineaId,
        Entrada_Id: "",
        Kilos_Usados: 0
      };

      if (!this._oDialogNuevaEntrada) {
        this._oDialogNuevaEntrada = sap.ui.xmlfragment(
          "pedidos.view.NuevaEntrada",
          this
        );
        oView.addDependent(this._oDialogNuevaEntrada);
      }

      this._oDialogNuevaEntrada.open();

      /*Creo nuevo modelo para guardar los datos */
      var oModelNuevaEntrada = new sap.ui.model.json.JSONModel();
      oModelNuevaEntrada.setData(newEntry);

      /*seteo el modelo a la vista*/
      this.getView().setModel(oModelNuevaEntrada, "NuevaEntradaModel");
    },

    /**
 * Metodo para cancelar la creacion de una nueva linea
 * onCancelarDialog: function () {
 */
    onCancelarEntrada: function () {

      this._oDialogNuevaEntrada.close();
    },

    onConfirmarEntrada: function (oEvent) {

      const oItem = oEvent.getParameter("selectedItem");
      const oCtx = oItem.getBindingContext();
      const oEntrada = oCtx.getObject();

      const oNuevaEntradaModel = this.getView().getModel("NuevaEntradaModel");
      const oData = oNuevaEntradaModel.getData();

      // 🔑 ASIGNAR Entrada_Id
      oData.Entrada_Id = oEntrada.Id;

      /*     if (!oData.Kilos_Usados || oData.Kilos_Usados <= 0) {
              MessageToast.show("Introduce los kilos a utilizar");
              return;
          } */

      const oModel = this.getView().getModel();
      const that = this;
      console.log(oData);
      oModel.create("/Trazabilidad", oData, {
        success: function () {
          MessageToast.show("Entrada asignada correctamente");
          oModel.refresh(true);
        },
        error: function (oError) {
          console.error("Error al asignar la línea", oError);
          MessageBox.error("No se pudo asignar la entrada");
        }
      });
    },


    onAsignarEntrada: function (oEvent) {
      var oView = this.getView();
      // Guardamos el id de la línea seleccionada
      var oLinea = oEvent.getSource().getBindingContext().getObject();
      //Se genera la nueva entrada para el formulario
      var newEntry = {
        Linea_Id: oLinea.Id,
        Entrada_Id: "",
        Kilos_Usados: 0
      };

      if (!this._oDialogAsignarEntrada) {
        this._oDialogAsignarEntrada = sap.ui.xmlfragment(
          "pedidos.view.AsignarEntrada",
          this
        );
        oView.addDependent(this._oDialogAsignarEntrada);
      }

      this._oDialogAsignarEntrada.open();

      /*Creo nuevo modelo para guardar los datos */
      var oModelAsignarEntrada = new sap.ui.model.json.JSONModel();
      oModelAsignarEntrada.setData(newEntry);

      /*seteo el modelo a la vista*/
      this.getView().setModel(oModelAsignarEntrada, "AsignarEntradaModel");
    },

    onConfirmAsignarEntrada: function (oEvent) {      

      var oModelAsignarEntrada = this.getView().getModel("AsignarEntradaModel");
      var oDataAsignarEntrada = oModelAsignarEntrada.getData();
      console.log(oDataAsignarEntrada)
      var correcto = false;
      //comprobamos los datos obligatorios
      if (oDataAsignarEntrada && oDataAsignarEntrada.Entrada_Id && oDataAsignarEntrada.Kilos_Usados > 0) {
        correcto = true;
      }

      if (correcto) {
        //creamos
        MessageBox.confirm(this.getView().getModel("i18n").getProperty("confirm_asignarEntrada"), {
          onClose: function (oAction) {
            if (oAction === MessageBox.Action.OK) {
              this._submitAsignarEntrada(oEvent);
            }
          }.bind(this)
        });
      } else {
        MessageBox.error(this.getView().getModel("i18n").getProperty("error_requiredfields"))
      }

    },

    onCancelDialog: function (oEvent) {
      oEvent.getSource().getParent().close();
    },

    onValueHelpPress: function () {
      var oView = this.getView();

      if (!this._oDialogNuevaEntrada) {
        this._oDialogNuevaEntrada = sap.ui.xmlfragment(
          "pedidos.view.NuevaEntrada",
          this
        );
        oView.addDependent(this._oDialogNuevaEntrada);
      }
      this._oDialogNuevaEntrada.open();

    },

    onSelectEntrada: function (oEvent) {

      var oModelAsignarEntrada = this.getView().getModel("AsignarEntradaModel");
      const oEntrada = oEvent.getParameter("selectedItem").getBindingContext().getObject();

      oModelAsignarEntrada.setProperty("/Entrada_Id", oEntrada.Id);
      oModelAsignarEntrada.setProperty("/Kilos_Disponibles", oEntrada.Kilos);

    },

    _submitAsignarEntrada: function (oEvent) {
      var oModel = this.getView().getModel();
      var oModelAsignarEntrada = this.getView().getModel("AsignarEntradaModel");
      var data = oModelAsignarEntrada.getData();
      var that = this;

      this.getView().setBusy(true);
      this.getView().setBusyIndicatorDelay(0);
      this._oDialogAsignarEntrada.setBusy(true);
      this._oDialogAsignarEntrada.setBusyIndicatorDelay(0);

      var body = {
        Linea_Id: data.Linea_Id,
        Entrada_Id: data.Entrada_Id,
        Kilos_Usados: data.Kilos_Usados
      };

      oModel.create("/Trazabilidad", body, {
        success: function (oData, resp) {
          that.getView().setBusy(false);
          that._oDialogAsignarEntrada.setBusy(false);
          that._oDialogAsignarEntrada.close();
          that.getView().getModel().refresh(true, true);
        },

        error: function (error) {
          if (error && error.responseText) {
            var errorBody = JSON.parse(error.responseText);
            MessageBox.error(errorBody.error.code + " - " + errorBody.error.message.value)
          }
          that.getView().setBusy(false);
          that._oDialogAsignarEntrada.setBusy(false);
        }
      });
    }















  });
});