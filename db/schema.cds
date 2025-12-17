namespace TFGMaria;

using {
    cuid,
    managed,
    sap.common.CodeList
} from '@sap/cds/common';


/***** Entidades de datos maestros ********/

entity Familias {
    key Id          : UUID;
        Family_Name : String(100);
}

entity Calibre {
    key Id               : UUID;
        Nombre           : String(50);
        Peso_Aprox_Pieza : String(20);
}

entity Caja {
    key Id       : UUID;
        Nombre   : String(50);
        Peso     : Integer;
        Calibre  : Association to Calibre;
        Producto : Association to Producto;
};

entity Producto {
    key Id      : UUID;
        Nombre  : String(100);
        Familia : Association to Familias;
        Calibre : Association to many Calibre
                      on Calibre.Id
}

entity Pedido : managed {
    key Id           : UUID;
        Cliente      : Association to Cliente;
        Fecha_Pedido : Date;
        Estado       : Association to Estado default 'C';
        Lineas       : Composition of many Linea
                           on Lineas.Pedido = $self;   
}

entity Linea : managed {
    key Id         : UUID;
        Producto   : Association to Producto;
        Calibre    : Association to Calibre;
        Caja       : Association to Caja;
        Pedido     : Association to Pedido;
        Kilos      : Integer;
        Precio     : Integer;
        toEntradas : Association to many EntradaParcial
                         on toEntradas.Linea = $self;
/*                                Entrada  : Association to many Entrada
                                              on Entrada.Id; */
/* Entrada : Association to many Entrada; */
}

entity Entrada : managed {
    key Id             : UUID;
        Socio          : Association to Socio;
        Fecha_recogida : Date;
        Kilos          : Integer;
        Kilos_restantes          : Integer;/*para probar*/ 
        Calibre        : Association to Calibre;
        Producto       : Association to Producto;
        Estado         : Association to Estado default 'D';
        toLineas       : Association to many EntradaParcial
                             on toLineas.Entrada = $self;
}

entity EntradaParcial {
    key Id           : UUID;

        Linea        : Association to Linea; // no se si es asi
        Entrada      : Association to Entrada;

        Kilos_Usados : Integer; // <-- Kilos usados de esa entrada
}

entity Estado : CodeList {
    key code : String enum {
            /* Esto para los pedidos*/
    Creado = 'C';
    En_proceso = 'P';
    Finalizado = 'F';

        /* Para las entradas*/
    Vendido = 'V';
    Disponible = 'D';
    };
}

entity Cliente {
    key Id        : UUID;
        Nombre    : String(50);
        CIF       : String(10);
        Direccion : String(100);
        Telefono  : String(10);
}

entity Socio {
    key Id        : UUID;
        Nombre    : String(50);
        CIF       : String(10);
        Direccion : String(100);
        Telefono  : String(10);
}
