sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"familias/test/integration/pages/FamiliasList",
	"familias/test/integration/pages/FamiliasObjectPage"
], function (JourneyRunner, FamiliasList, FamiliasObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('familias') + '/test/flp.html#app-preview',
        pages: {
			onTheFamiliasList: FamiliasList,
			onTheFamiliasObjectPage: FamiliasObjectPage
        },
        async: true
    });

    return runner;
});

