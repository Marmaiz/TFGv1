using MasterDataService as service from '../../srv/service';
annotate service.Producto with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Nombre',
                Value : Nombre,
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
        Text : 'Productos',
    },
);

annotate service.Variedad with @(
    UI.LineItem #tableView : [
        {
            $Type : 'UI.DataField',
            Value : Nombre,
            Label : 'Nombre',
        },
        {
            $Type : 'UI.DataField',
            Value : Producto.Nombre,
            Label : 'Producto',
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
        Text : 'Variedad',
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Variedad',
            ID : 'Variedad',
            Target : '@UI.FieldGroup#Variedad',
        },
    ],
    UI.FieldGroup #Variedad : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : Nombre,
                Label : 'Nombre',
            },
            {
                $Type : 'UI.DataField',
                Value : Producto_Id,
                Label : 'Producto',
            },
        ],
    },
);

annotate service.Variedad with {
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
            ],
        },
        Common.ValueListWithFixedValues : true,
        Common.Text : Producto.Nombre,
        Common.Text.@UI.TextArrangement : #TextOnly,
)};

annotate service.Producto with {
    Id @(
        Common.Text : Nombre,
        Common.Text.@UI.TextArrangement : #TextOnly,
)};

