using {TFGMaria} from '../db/schema';


service MasterDataService {
  @odata.draft.enabled
  @fiori.draft.enabled
  entity Familias as projection on TFGMaria.Familias;

  @fiori.draft.enabled
  entity Calibre  as projection on TFGMaria.Calibre;

  @odata.draft.enabled
  @fiori.draft.enabled
  entity Caja     as projection on TFGMaria.Caja;

  @odata.draft.enabled
  @fiori.draft.enabled
  entity Producto as projection on TFGMaria.Producto;

  @odata.draft.enabled
  @fiori.draft.enabled
  entity Socio    as projection on TFGMaria.Socio;

  @odata.draft.enabled
  @fiori.draft.enabled
  entity Cliente  as projection on TFGMaria.Cliente;
}


service PedidosService {

  entity Pedido   as projection on TFGMaria.Pedido;

  @odata.draft.enabled
  @fiori.draft.enabled
  entity Entrada  as projection on TFGMaria.Entrada;

  @odata.draft.enabled
  @fiori.draft.enabled
  entity Cliente  as projection on TFGMaria.Cliente;

  @odata.draft.enabled
  @fiori.draft.enabled
  entity Socio    as projection on TFGMaria.Socio;

  @fiori.draft.enabled
  entity Calibre  as projection on TFGMaria.Calibre;

  @odata.draft.enabled
  @fiori.draft.enabled
  entity Caja     as projection on TFGMaria.Caja;

  @odata.draft.enabled
  @fiori.draft.enabled
  entity Producto as projection on TFGMaria.Producto;

}
