/*
Template Name: Steex - Admin & Dashboard Template
Author: Themesbrand
Version: 1.1.0
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Layout Js File
*/

(function () {

    'use strict';

    if (sessionStorage.getItem('defaultAttribute')) {

        var attributesValue = document.documentElement.attributes;
        var CurrentLayoutAttributes = {};
        for (var i = 0; i < attributesValue.length; i++) {
            var attribute = attributesValue[i];
            if (attribute.nodeName && attribute.nodeName != "undefined") {
                var nodeKey = attribute.nodeName;
                CurrentLayoutAttributes[nodeKey] = attribute.nodeValue;
            }
        }
        if (JSON.stringify(CurrentLayoutAttributes) !== sessionStorage.getItem('defaultAttribute')) {
            sessionStorage.clear();
            location.reload();
        } else {
            var isLayoutAttributes = {
                'data-theme': sessionStorage.getItem('data-theme'),
                'data-layout': sessionStorage.getItem('data-layout'),
                'data-sidebar-size': sessionStorage.getItem('data-sidebar-size'),
                'data-bs-theme': sessionStorage.getItem('data-bs-theme'),
                'data-layout-width': sessionStorage.getItem('data-layout-width'),
                'data-sidebar': sessionStorage.getItem('data-sidebar'),
                'data-sidebar-image': sessionStorage.getItem('data-sidebar-image'),
                'data-layout-direction': sessionStorage.getItem('data-layout-direction'),
                'data-layout-position': sessionStorage.getItem('data-layout-position'),
                'data-layout-style': sessionStorage.getItem('data-layout-style'),
                'data-topbar': sessionStorage.getItem('data-topbar'),
                'data-preloader': sessionStorage.getItem('data-preloader')
            };

            for (var x in isLayoutAttributes) {
                if (isLayoutAttributes[x] && isLayoutAttributes[x]) {
                    document.documentElement.setAttribute(x, isLayoutAttributes[x]);
                }
            }
        }
    }

})();