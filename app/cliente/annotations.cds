using MasterDataService as service from '../../srv/service';
annotate service.Cliente with @(
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
                Label : 'CIF',
                Value : CIF,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Direccion',
                Value : Direccion,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Telefono',
                Value : Telefono,
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
            Label : 'CIF',
            Value : CIF,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Direccion',
            Value : Direccion,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Telefono',
            Value : Telefono,
        },
    ],
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : Nombre,
        },
        TypeName : '',
        TypeNamePlural : '',
    },
);

