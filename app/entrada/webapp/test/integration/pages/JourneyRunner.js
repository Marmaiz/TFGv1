sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"entrada/test/integration/pages/EntradaList",
	"entrada/test/integration/pages/EntradaObjectPage"
], function (JourneyRunner, EntradaList, EntradaObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('entrada') + '/test/flp.html#app-preview',
        pages: {
			onTheEntradaList: EntradaList,
			onTheEntradaObjectPage: EntradaObjectPage
        },
        async: true
    });

    return runner;
});

