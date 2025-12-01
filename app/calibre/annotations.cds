using MasterDataService as service from '../../srv/service';
annotate service.Calibre with @(
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
                Label : 'Peso_Aprox_Pieza',
                Value : Peso_Aprox_Pieza,
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
            Label : 'Peso_Aprox_Pieza',
            Value : Peso_Aprox_Pieza,
        },
    ],
    UI.SelectionFields : [
        Peso_Aprox_Pieza,
    ],
);

annotate service.Calibre with {
    Peso_Aprox_Pieza @Common.Label : 'Peso_Aprox_Pieza'
};

