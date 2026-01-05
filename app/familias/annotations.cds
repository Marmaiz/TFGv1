using MasterDataService as service from '../../srv/service';
annotate service.Familias with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Family_Name',
                Value : Family_Name,
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
            Label : '{i18n>Familyname}',
            Value : Family_Name,
        },
    ],
    UI.SelectionFields : [
        Family_Name,
    ],
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Familia',
    },
);

annotate service.Familias with {
    Family_Name @Common.Label : '{i18n>Nombre}'
};

annotate service.Producto with @(
    UI.LineItem #tableView : [
        {
            $Type : 'UI.DataField',
            Value : Nombre,
            Label : 'Producto',
        },
        {
            $Type : 'UI.DataField',
            Value : Familia.Family_Name,
            Label : 'Familia',
        },
    ],
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Producto',
    },
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : Nombre,
        },
        TypeName : 'Producto',
        TypeNamePlural : 'Productos',
        Description : {
            $Type : 'UI.DataField',
            Value : Familia.Family_Name,
        },
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Información General',
            ID : 'InformacinGeneral',
            Target : '@UI.FieldGroup#InformacinGeneral',
        },
    ],
    UI.FieldGroup #InformacinGeneral : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : Nombre,
                Label : 'Nombre',
            },
            {
                $Type : 'UI.DataField',
                Value : Familia_Id,
                Label : 'Familia',
            },
            {
                $Type : 'UI.DataField',
                Value : Calibre.Id,
                Label : 'Calibre',
            },
        ],
    },
);

annotate service.Familias with {
    Id };

annotate service.Calibre with {
    Id };

annotate service.Producto with {
    Familia @(
        Common.Text : Familia.Family_Name,
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Familias',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : Familia_Id,
                    ValueListProperty : 'Id',
                },
            ],
        },
        Common.ValueListWithFixedValues : true,
        Common.Text.@UI.TextArrangement : #TextOnly,
    )
};

annotate service.Familias with {
    Id @(
        Common.Text : Family_Name,
        Common.Text.@UI.TextArrangement : #TextOnly,
)};

annotate service.Calibre with {
    Id @(
        Common.Text : Nombre,
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Calibre',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : Id,
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
        Common.ValueListWithFixedValues : false,
        Common.Text.@UI.TextArrangement : #TextOnly,
    )
};

