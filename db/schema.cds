namespace TFGMaria;

using {
    cuid,
    managed,
    sap.common.CodeList
} from '@sap/cds/common';


/***** Entidades de datos maestros ********/

entity Familias : managed {
    key Family_Id   : UUID;
        Family_Name : String(100);
}

entity Calibre {
    key Calibre_Id       : UUID;
        Nombre           : String(50);
        Peso_Aprox_Pieza : String(20);
}

entity Caja {
    key Caja_Id  : UUID;
        Nombre   : String(50);
        Peso     : Integer;
        Calibre  : Association to one Calibre;
        Producto : Association to one Producto;
};

entity Producto : managed {
    key ID      : UUID;
        Nombre  : String(100);
        Familia : Association to one Familias;
        Calibre : Association to many Calibre
                      on Calibre.Calibre_Id
}

entity Pedido : managed {
    key Pedido_Id    : UUID;
        Cliente      : Association to one Cliente;
        Fecha_Pedido : Date;
        Estado       : Association to one Estado default 'C';
        Linea        : Composition of many {
                           key ID       : UUID;
                               Producto : Association to one Producto;
                               Calibre  : Association to one Calibre;
                               Caja     : Association to one Caja;
                               Kilos    : Integer;
                               Precio   : Integer;
                       }
}


entity Estado : CodeList {
    key code : String enum {
            Creado = 'C';
            En_proceso = 'P';
            Finalizado = 'F';

        };
}

entity Cliente : managed {
    key Cliente_Id : UUID;
        Nombre     : String(50);
        CIF        : String(10);
        Direccion  : String(100);
        Telefono   : String(10);
}
