using MasterDataService as service from '../../srv/service';
annotate service.Caja with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Nombre',
                Value : Nombre,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Peso',
                Value : Peso,
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
            Label : 'Nombre',
            Value : Nombre,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Peso',
            Value : Peso,
        },
    ],
);

annotate service.Caja with {
    Calibre @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Calibre',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : Calibre_Calibre_Id,
                ValueListProperty : 'Calibre_Id',
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
    }
};

annotate service.Caja with {
    Producto @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Producto',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : Producto_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'Nombre',
            },
        ],
    }
};

