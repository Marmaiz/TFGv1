sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"calibre/test/integration/pages/CalibreList",
	"calibre/test/integration/pages/CalibreObjectPage"
], function (JourneyRunner, CalibreList, CalibreObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('calibre') + '/test/flp.html#app-preview',
        pages: {
			onTheCalibreList: CalibreList,
			onTheCalibreObjectPage: CalibreObjectPage
        },
        async: true
    });

    return runner;
});

