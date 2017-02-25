var browser = new xBrowser();
var viewer = null;
var attrentity;

$(document).ready(function () {
    //declare viewer and browser at the beginning so that it can be used as a variable before it is initialized.


    function initControls() {

    }
    function reinitControls() {

    }
    initControls();
    $(window).resize(function () {
        reinitControls();
    });

    var keepTarget = false;




    browser.on("entityClick", function (args) {
        var span = $(args.element).children("span.xbim-entity");
        if (document._lastSelection)
            document._lastSelection.removeClass("ui-selected");
        span.addClass("ui-selected")
        document._lastSelection = span;
    });

    browser.on("entityActive", function (args) {
        global_linkfilelist = [];
        var isRightPanelClick = false;
        attrentity = args.entity;
        if (args.element)
            if ($(args.element).parents("#semantic-descriptive-info").length != 0)
                isRightPanelClick = true;

       // global_elementid = attrentity.properties[5].value;    //AltExternalEntityId

       // fileCategory = attrentity.properties[3].value;   //eg. IfcRoof

        browser.renderPropertiesAttributes(args.entity, "attrprop");
        clearDom();
        getFileLists();

        if (isRightPanelClick)
            $("#attrprop-header").click();

    });
    

    browser.on("entityDblclick", function (args) {
        var entity = args.entity;
        var allowedTypes = ["space", "assettype", "asset"];
        if (allowedTypes.indexOf(entity.type) === -1) return;

        var id = parseInt(entity.id);
        if (id && viewer) {
            viewer.resetStates();
            viewer.renderingMode = "x-ray";
            if (entity.type === "assettype") {
                var ids = [];
                for (var i = 0; i < entity.children.length; i++) {
                    id = parseInt(entity.children[i].id);
                    ids.push(id);
                }
                viewer.setState(xState.HIGHLIGHTED, ids);
            }
            else {
                viewer.setState(xState.HIGHLIGHTED, [id]);
            }
            viewer.zoomTo(id);
            keepTarget = true;
        }
    });


    //viewer set up
    var check = xViewer.check();
    if (check.noErrors) {
        //alert('WebGL support is OK');

        viewer = new xViewer("viewer-canvas");
        viewer.background = [249, 249, 249, 255];

        viewer.on("mouseDown", function (args) {
            if (!keepTarget) viewer.setCameraTarget(args.id);
        });
        viewer.on("pick", function (args) {
            browser.activateEntity(args.id);
            viewer.renderingMode = "normal";
            viewer.resetStates();
            keepTarget = false;
        });
        viewer.on("dblclick", function (args) {
            viewer.resetStates();
            viewer.renderingMode = "x-ray";
            var id = args.id;
            viewer.setState(xState.HIGHLIGHTED, [id]);
            viewer.zoomTo(id);
            keepTarget = true;
        });
        /*
        loadJSON(function (response) {
            // Parse JSON string into object            
            jsonData = JSON.parse(response);
            console.log(jsonData);
        });*/


    }
    else {
        alert("WebGL support is unsufficient");
        var msg = document.getElementById("msg");
        msg.innerHTML = "";
        for (var i in check.errors) {
            if (check.errors.hasOwnProperty(i)) {
                var error = check.errors[i];
                msg.innerHTML += "<div style='color: red;'>" + error + "</div>";
            }
        }
    }




function showModelinfo(argsname, attributename) {
    browser.renderPropertiesAttributes(argsname, attributename);
}


})