var blkStyle = '.blk-row::after{ content: ""; clear: both; display: block;} .blk-row{padding: 10px;}';
var container = {container: '#$TemplateID'};

// merge objects from gram.js
defaults = Object.assign(container, defaults);
var editor = grapesjs.init(defaults);
editor.setStyle(`.row{display:table;padding:10px;width:100%}#myForm .col:empty,.col:empty{display:table-cell;height:75px}#banner-gradient{background:#7abcff;background:-moz-linear-gradient(45deg,#7abcff 0,#60abf8 44%,#4096ee 100%);background:-webkit-linear-gradient(45deg,#7abcff 0,#60abf8 44%,#4096ee 100%);background:linear-gradient(45deg,#7abcff 0,#60abf8 44%,#4096ee 100%);filter:progid:DXImageTransform.Microsoft.gradient( startColorstr='#7abcff', endColorstr='#4096ee', GradientType=1)}.bg-none{background:0 0}#myForm .col:empty{position:relative}#myForm .col:empty:after{content:'Add form elements here';color:#888;position:absolute;left:10px;top:10px;display:block;width:400px}nav .brand-logo,nav ul a{color:#444}p{line-height:2rem}.button-collapse{color:#26a69a}.parallax-container{min-height:380px;line-height:0;height:auto;color:rgba(255,255,255,.9)}.parallax-container .section{width:100%}footer.gram-footer ul.collection>li.collection-header,footer.gram-footer ul.collection>li.collection-item{background:0 0;border:0}footer.gram-footer ul.collection{border:0}.input-field [type=checkbox]+label,.input-field [type=radio]:checked+label,.input-field [type=radio]:not(:checked)+label{pointer-events:auto}input:not([type]):focus:not([readonly]),input[type=date]:not(.browser-default):focus:not([readonly]),input[type=datetime-local]:not(.browser-default):focus:not([readonly]),input[type=datetime]:not(.browser-default):focus:not([readonly]),input[type=email]:not(.browser-default):focus:not([readonly]),input[type=number]:not(.browser-default):focus:not([readonly]),input[type=password]:not(.browser-default):focus:not([readonly]),input[type=search]:not(.browser-default):focus:not([readonly]),input[type=tel]:not(.browser-default):focus:not([readonly]),input[type=text]:not(.browser-default):focus:not([readonly]),input[type=time]:not(.browser-default):focus:not([readonly]),input[type=url]:not(.browser-default):focus:not([readonly]),textarea.materialize-textarea:focus:not([readonly]){border-bottom:1px solid orange;-webkit-box-shadow:0 1px 0 0 orange;-moz-box-shadow:0 1px 0 0 orange;box-shadow:0 1px 0 0 orange}#contact input#your-email,#contact textarea#your-message{color:#fff}@media only screen and (max-width:992px){.parallax-container .section{position:absolute;top:40%}#index-banner .section{top:10%}}@media only screen and (max-width:600px){#index-banner .section{top:0}}.icon-block{padding:0 15px}.icon-block .material-icons{font-size:inherit}footer.page-footer{margin:0}.parallax{position:static}`);


var pnm = editor.Panels;
pnm.addButton('options', [{
        id: 'undo',
        className: 'fa fa-undo icon-undo',
        command: function (editor, sender) {
            sender.set('active', 0);
            editor.UndoManager.undo(1);
        },
        attributes: {
            title: 'Undo (CTRL/CMD + Z)'
        }
        },
    {
        id: 'redo',
        className: 'fa fa-repeat icon-redo',
        command: function (editor, sender) {
            sender.set('active', 0);
            editor.UndoManager.redo(1);
        },
        attributes: {
            title: 'Redo (CTRL/CMD + SHIFT + Z)'
        }
        }, {
        id: 'clear-local',
        className: 'fa fa-close',
        command: function () {
            if (confirm('Reset to original?')) {
                localStorage.clear();
                location.reload();
            }
        },
        attributes: {
            title: 'Reset'
        }
        },
    {
        id: 'import',
        className: 'fa fa-edit',
        command: 'html-edit',
        attributes: {
            title: 'Import'
        }
    }, {
        id: 'clean-all',
        className: 'fa fa-trash icon-blank',
        command: function (editor, sender) {
            if (sender) sender.set('active', false);
            if (confirm('Are you sure to clean the canvas?')) {
                editor.DomComponents.clear();
                setTimeout(function () {
                    localStorage.clear();
                }, 0);
            }
        },
        attributes: {
            title: 'Empty canvas'
        }
        },
    {
        id: 'open-github',
        className: 'fa fa-link',
        command: function (editor, sender) {
            sender.set('active', 0);
            window.open('https://github.com/ronaldaug/gramateria', '_blank');
        },
        attributes: {
            title: 'github'
        }
        }
    ]);


// ---------------------
// Import/Edit  
// ---------------------
var gra = {
    // append in container
    _a: function (appendName) {
        return container.appendChild(appendName);
    },
    // create elements
    _c: function (tagName) {
        return document.createElement(tagName);
    },
    // check extensions
    _e: function (fname) {
        var ext = /^.+\.([^.]+)$/.exec(fname);
        return ext == null ? "" : ext[1];
    },
    // select id
    _d: function (name, tag) {
        switch (tag) {
            case 'class':
                return document.getElementsByClassName(name);
                break;
            case 'id':
                return document.getElementById(name);
                break;
            default:
                return document.getElementById(name);
        }
    }
}

var pmodel = gra._d("modelPopup", "class");
var pfx = editor.getConfig().stylePrefix;
var modal = editor.Modal;
var cmdm = editor.Commands;
var codeViewer = editor.CodeManager.getViewer('CodeMirror').clone();
var pnm = editor.Panels;
var container = gra._c("div");
var fileform = gra._c("div");
var btnEdit = gra._c("button");
var exportTxt = gra._c("button");
var loadTxt = gra._c("button");
var fileLoader = gra._c("form");
var anchor = gra._c("a");

codeViewer.set({
    codeName: 'htmlmixed',
    readOnly: 0,
    theme: 'hopscotch',
    autoBeautify: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    lineWrapping: true,
    styleActiveLine: true,
    smartIndent: true,
    indentWithTabs: true
});

btnEdit.innerHTML = '<i class="fa fa-upload"></i> Import';
exportTxt.innerHTML = '<i class="fa fa-download"></i> Save as file';
loadTxt.innerHTML = '<i class="fa fa-upload"></i> Load file';
fileLoader.innerHTML = '<br><hr color="#ddd"><br><input type="file" id="fileToLoad"><br><br>';
fileform.innerHTML = '<input id="file_name" value="" type="text" placeholder="Enter file Name" name="filename"><button class="exportgram" onclick="exportgramfile()">Save</button>';

fileform.className = 'modelPopup';
fileLoader.className = pfx + 'import-file';
btnEdit.className = pfx + 'btn-prim ' + pfx + 'btn-import';
exportTxt.className = pfx + 'btn-prim ' + pfx + 'btn-export';
loadTxt.className = pfx + 'btn-prim ' + pfx + 'btn-load';


// import button inside import editor
btnEdit.onclick = function () {
    var code = codeViewer.editor.getValue();
    editor.DomComponents.getWrapper().set('content', '');
    editor.setComponents(code.trim());
    modal.close();
};

// onclick load file button inside import editor
loadTxt.onclick = function (e) {
    e.preventDefault();
    var fileToLoad = document.getElementById("fileToLoad").files[0];
    var fType = gra._e(fileToLoad['name']);
    if (fileToLoad === undefined) {
        alert('Please select a file');
        return;
    }
    if (fType === 'gram' || fType === 'txt') {
        var reader = new FileReader();
        reader.onload = function (e) {
            var fileData = e.target.result;
            var viewer = codeViewer.editor;
            modal.setTitle('Import/Edit');
            if (!viewer) {
                var txtarea = document.createElement('textarea');
                gra._a(txtarea);
                gra._a(btnEdit);
                gra._a(fileform);
                gra._a(fileLoader);
                gra._a(loadTxt);
                gra._a(exportTxt);
                codeViewer.init(txtarea);
                viewer = codeViewer.editor;
            }
            modal.setContent('');
            modal.setContent(container);
            codeViewer.setContent(fileData);
        }
        reader.readAsText(fileToLoad);
    } else {
        alert('You can only import .gram or .txt extension');
    }
}


// onclick save as button inside import editor
exportTxt.onclick = function () {
    pmodel[0].className += " " + 'showup';
}

// export file as .gram extension 
function exportgramfile() {
    var fileName = gra._d("file_name", "id").value;
    if (fileName !== undefined && fileName !== '') {
        var InnerHtml = editor.getHtml();
        var Css = editor.getCss();
        var text = InnerHtml + "<style>" + Css + '</style>';
        var blob = new Blob([text], {
            type: "text/plain"
        });
        anchor.download = fileName + ".gram";
        anchor.href = window.URL.createObjectURL(blob);
        anchor.target = "_blank";
        anchor.style.display = "none"; // just to be safe!
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        pmodel[0].className = "modelPopup";
    } else {
        alert('Please type a file name');
        return;
    }
}

// import nav button click event 
cmdm.add('html-edit', {
    run: function importArea(editor, sender) {
        sender && sender.set('active', 0);
        var viewer = codeViewer.editor;
        modal.setTitle('Import/Edit');
        if (!viewer) {
            var txtarea = gra._c('textarea');
            gra._a(txtarea);
            gra._a(btnEdit);
            gra._a(fileform);
            gra._a(fileLoader);
            gra._a(loadTxt);
            gra._a(exportTxt);
            codeViewer.init(txtarea);
            viewer = codeViewer.editor;
        }
        var InnerHtml = editor.getHtml();
        var Css = editor.getCss();
        modal.setContent('');
        modal.setContent(container);
        codeViewer.setContent(InnerHtml + "<style>" + Css + '</style>');
        modal.open();
        viewer.refresh();
    }
});

editor.BlockManager.getCategories().each(ctg => ctg.set('open', false))
var bm = editor.BlockManager;
//        bm.add('link-block', {
//          label: 'Link Block',
//          attributes: {class:'fa fa-link'},
//          category: 'Basic',
//          content: {
//            type:'link',
//            editable: false,
//            droppable: true,
//            style:{
//              display: 'inline-block',
//              padding: '5px',
//              'min-height': '50px',
//              'min-width': '50px'
//            }
//          },
//        });

var domc = editor.DomComponents;
var defaultType = domc.getType('default');
var defaultModel = defaultType.model;
var defaultView = defaultType.view;

//          model: defaultModel.extend({
//            defaults: Object.assign({}, defaultModel.prototype.defaults, {
//              traits: [{
//                name: 'title',
//                label: 'Título',
//                placeholder: 'Insira um texto aqui'
//              }]
//            }),
//          }),
//        });


editor.on('storage:load', function (e) {
    console.log('LOAD ', e);
})
editor.on('storage:store', function (e) {
    console.log('STORE ', e);
})



editor.on('styleManager:change:text-shadow', function (view) {
    var model = view.model;
    let targetValue = view.getTargetValue({
        ignoreDefault: 1
    });
    let computedValue = view.getComputedValue();
    let defaultValue = view.model.getDefaultValue();
    //console.log('Style of ', model.get('property'), 'Target: ', targetValue, 'Computed:', computedValue, 'Default:', defaultValue);
});

editor.render();
