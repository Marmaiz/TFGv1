using { TFGMaria } from '../db/schema';


service MasterDataService  {
  @odata.draft.enabled 
  @fiori.draft.enabled
  entity Familias as projection on TFGMaria.Familias;

  @odata.draft.enabled 
  @fiori.draft.enabled
  entity Calibre as projection on TFGMaria.Calibre;

  @odata.draft.enabled 
  @fiori.draft.enabled
  entity Caja as projection on TFGMaria.Caja;

  @odata.draft.enabled 
  @fiori.draft.enabled
  entity Producto as projection on TFGMaria.Producto;
}

service NuevoServicio {

  @odata.draft.enabled 
  @fiori.draft.enabled
  entity Pedido as projection on TFGMaria.Pedido;

  @odata.draft.enabled 
  @fiori.draft.enabled
  entity Cliente as projection on TFGMaria.Cliente;

}