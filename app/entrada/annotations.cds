using PedidosService as service from '../../srv/service';
annotate service.Entrada with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : Socio_Id,
                Label : 'Socio_Id',
            },
            {
                $Type : 'UI.DataField',
                Label : 'Fecha_recogida',
                Value : Fecha_recogida,
            },
            {
                $Type : 'UI.DataField',
                Value : Producto_Id,
                Label : 'Producto_Id',
            },
            {
                $Type : 'UI.DataField',
                Value : Calibre_Id,
                Label : 'Calibre_Id',
            },
            {
                $Type : 'UI.DataField',
                Label : 'Kilos',
                Value : Kilos,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Estado_code',
                Value : Estado_code,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Fecha_recogida',
            Value : Fecha_recogida,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Kilos',
            Value : Kilos,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Estado_code',
            Value : Estado_code,
        },
    ],
);

annotate service.Entrada with {
    Socio @(
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Socio',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : Socio_Id,
                    ValueListProperty : 'Id',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'Nombre',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'CIF',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'Direccion',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'Telefono',
                },
            ],
        },
        Common.ValueListWithFixedValues : true,
    )
};

annotate service.Entrada with {
    Calibre @(
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Calibre',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : Calibre_Id,
                    ValueListProperty : 'Id',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'Nombre',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'Peso_Aprox_Pieza',
                },
            ],
        },
        Common.ValueListWithFixedValues : true,
    )
};

annotate service.Entrada with {
    Producto @(
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Producto',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : Producto_Id,
                    ValueListProperty : 'Id',
                },
                {
                    $Type : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'Nombre',
                },
            ],
        },
        Common.ValueListWithFixedValues : true,
    )
};

annotate service.Entrada with {
    Estado @(
        Common.ExternalID : Estado.name,
        Common.FieldControl : #ReadOnly,
    )
};

annotate service.Socio with {
    Id @(
        Common.Text : Nombre,
        Common.Text.@UI.TextArrangement : #TextOnly,
)};

annotate service.Producto with {
    Id @(
        Common.Text : Nombre,
        Common.Text.@UI.TextArrangement : #TextOnly,
)};

annotate service.Calibre with {
    Id @(
        Common.Text : Nombre,
        Common.Text.@UI.TextArrangement : #TextOnly,
)};

