using {TFGMaria} from '../db/schema';


service MasterDataService {
  @odata.draft.enabled
  @fiori.draft.enabled
  entity Variedad as projection on TFGMaria.Variedad;

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

@impl:'./service.js'
service PedidosService {

  entity Pedido   as projection on TFGMaria.Pedido;
  @odata.draft.enabled
  @fiori.draft.enabled
  entity Entrada  as projection on TFGMaria.Entrada;

  entity Linea  as projection on TFGMaria.Linea;
 
  entity Trazabilidad  as projection on TFGMaria.Trazabilidad;

  entity Cliente  as projection on TFGMaria.Cliente;

  entity Socio    as projection on TFGMaria.Socio;

  entity Calibre  as projection on TFGMaria.Calibre;

  entity Caja     as projection on TFGMaria.Caja;

  entity Producto as projection on TFGMaria.Producto;

  entity Variedad as projection on TFGMaria.Variedad;

}
