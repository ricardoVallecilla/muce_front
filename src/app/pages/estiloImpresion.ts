export class EstilosReportes {
    estilo = `
@charset "UTF-8";
.ui-widget {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1em; }
  .ui-widget input, .ui-widget select, .ui-widget textarea, .ui-widget button {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 1em; }
  .ui-widget :active {
    outline: none; }

.ui-widget-content {
  border: 1px solid #dddddd;
  background: #ffffff;
  color: #444444; }
  .ui-widget-content a {
    color: #444444; }

.ui-widget-header {
  border: 1px solid #dddddd;
  background: #dddddd;
  color: #444444;
  font-weight: bold; }
  .ui-widget-header a {
    color: #444444; }

.ui-widget-overlay {
  background: #666666;
  opacity: .50;
  filter: Alpha(Opacity=50); }
/*
.ui-state-default {
  border: 1px solid #dddddd;
  background: #f6f6f6;
  color: #0073ea; }
  */
  .ui-state-default a {
    color: #0073ea; }

.ui-state-active {
  border-color: #dddddd;
  background: #ffffff;
  color: #ff0084; }
  .ui-state-active a {
    color: #ff0084; }

.ui-state-highlight {
  border-color: #FF0084;
  background: #FF0084;
  color: #FFFFFF; }
  .ui-state-highlight a {
    color: #FFFFFF; }

.ui-state-focus {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-state-focus a {
    color: #ffffff; }

.ui-state-error {
  border-color: #ff0084;
  background: #ffffff;
  color: #222222; }
  .ui-state-error a {
    color: #222222; }

.ui-state-disabled,
.ui-widget:disabled {
  opacity: 0.35;
  filter: Alpha(Opacity=35);
  background-image: none;
  cursor: default !important; }
  .ui-state-disabled *,
  .ui-widget:disabled * {
    cursor: default !important; }

/* Forms */
.ui-inputtext {
  background: #ffffff;
  color: #444444; }

.ui-inputtext:enabled:hover {
  border-color: #0073ea; }

.ui-inputtext.ui-state-focus,
.ui-inputtext:focus {
  outline: 0 none;
  border-color: #0073ea;
  -moz-box-shadow: 0px 0px 5px #0073ea;
  -webkit-box-shadow: 0px 0px 5px #0073ea;
  box-shadow: 0px 0px 5px #0073ea; }

.ui-inputgroup .ui-inputgroup-addon {
  border-color: #dddddd;
  background-color: #f7f7f7;
  color: #444444; }
  .ui-inputgroup .ui-inputgroup-addon:first-child {
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px; }
  .ui-inputgroup .ui-inputgroup-addon:last-child {
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px; }
.ui-inputgroup .ui-button:first-child {
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px; }
.ui-inputgroup .ui-button:last-child {
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px; }

.ui-float-label input.ng-dirty.ng-invalid ~ label {
  color: #222222; }

.ui-autocomplete .ui-autocomplete-multiple-container:not(.ui-state-disabled):hover {
  border-color: #0073ea; }
.ui-autocomplete .ui-autocomplete-multiple-container:not(.ui-state-disabled).ui-state-focus {
  border-color: #0073ea; }

.ui-chips > ul:not(.ui-state-disabled):hover {
  border-color: #0073ea; }
.ui-chips > ul:not(.ui-state-disabled).ui-state-focus {
  border-color: #0073ea; }

.ui-button:focus,
.ui-button:enabled:hover,
.ui-fileupload-choose:not(.ui-state-disabled):hover {
  outline: 0 none;
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-button:focus a,
  .ui-button:enabled:hover a,
  .ui-fileupload-choose:not(.ui-state-disabled):hover a {
    color: #ffffff; }

.ui-button:enabled:active,
.ui-fileupload-choose:not(.ui-state-disabled):active {
  border-color: #dddddd;
  background: #ffffff;
  color: #ff0084; }

.ui-chkbox-box:not(.ui-state-disabled):not(.ui-state-active):hover {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-chkbox-box:not(.ui-state-disabled):not(.ui-state-active):hover a {
    color: #ffffff; }

.ui-radiobutton-box:not(.ui-state-disabled):not(.ui-state-active):hover {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-radiobutton-box:not(.ui-state-disabled):not(.ui-state-active):hover a {
    color: #ffffff; }

.ui-dropdown:not(.ui-state-disabled):hover {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-dropdown:not(.ui-state-disabled):hover a {
    color: #ffffff; }

.ui-dropdown-panel .ui-dropdown-item:not(.ui-state-highlight):hover {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-dropdown-panel .ui-dropdown-item:not(.ui-state-highlight):hover a {
    color: #ffffff; }

.ui-listbox .ui-listbox-header .ui-listbox-filter-container .fa {
  color: #444444; }
.ui-listbox:not(.ui-state-disabled) .ui-listbox-item:not(.ui-state-highlight):hover {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-listbox:not(.ui-state-disabled) .ui-listbox-item:not(.ui-state-highlight):hover a {
    color: #ffffff; }
.ui-listbox.ui-state-disabled .ui-chkbox-box:not(.ui-state-active):hover {
  border-color: #dddddd;
  background: #f6f6f6;
  color: #0073ea; }

.ui-multiselect:not(.ui-state-disabled):hover {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-multiselect:not(.ui-state-disabled):hover a {
    color: #ffffff; }

.ui-multiselect-panel .ui-multiselect-item:not(.ui-state-highlight):hover {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-multiselect-panel .ui-multiselect-item:not(.ui-state-highlight):hover a {
    color: #ffffff; }

.ui-multiselect-panel .ui-multiselect-close {
  color: #444444; }

.ui-multiselect-panel .ui-multiselect-filter-container .fa {
  color: #444444; }

.ui-spinner:not(.ui-state-disabled) .ui-spinner-button:enabled:hover {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-spinner:not(.ui-state-disabled) .ui-spinner-button:enabled:hover a {
    color: #ffffff; }

.ui-spinner:not(.ui-state-disabled) .ui-spinner-button:enabled:active {
  border-color: #dddddd;
  background: #ffffff;
  color: #ff0084; }

.ui-selectbutton .ui-button:not(.ui-state-disabled):not(.ui-state-active):hover {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-selectbutton .ui-button:not(.ui-state-disabled):not(.ui-state-active):hover a {
    color: #ffffff; }

.ui-togglebutton:not(.ui-state-disabled):not(.ui-state-active):hover {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-togglebutton:not(.ui-state-disabled):not(.ui-state-active):hover a {
    color: #ffffff; }

.ui-paginator a:not(.ui-state-disabled):not(.ui-state-active):hover {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-paginator a:not(.ui-state-disabled):not(.ui-state-active):hover a {
    color: #ffffff; }

.ui-paginator a {
  color: #0073ea; }

.ui-datatable .ui-rowgroup-header a {
  color: #444444; }
.ui-datatable .ui-sortable-column:not(.ui-state-active):hover {
  background: #0073ea;
  color: #ffffff; }
.ui-datatable .ui-row-toggler {
  color: #444444; }
.ui-datatable tbody.ui-datatable-hoverable-rows > tr.ui-widget-content:not(.ui-state-highlight):hover {
  cursor: pointer;
  background: #0073ea;
  color: #ffffff; }

.ui-orderlist .ui-orderlist-item:not(.ui-state-highlight):hover {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-orderlist .ui-orderlist-item:not(.ui-state-highlight):hover a {
    color: #ffffff; }

.ui-picklist .ui-picklist-item:not(.ui-state-disabled):not(.ui-state-highlight):hover {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-picklist .ui-picklist-item:not(.ui-state-disabled):not(.ui-state-highlight):hover a {
    color: #ffffff; }
.ui-picklist .ui-picklist-droppoint-highlight {
  border-color: #FF0084;
  background: #FF0084;
  color: #414141; }
  .ui-picklist .ui-picklist-droppoint-highlight a {
    color: #414141; }
.ui-picklist .ui-picklist-highlight {
  border-color: #FF0084;
  color: #414141; }
  .ui-picklist .ui-picklist-highlight a {
    color: #414141; }

.ui-tree.ui-treenode-dragover {
  border-color: #FF0084; }
.ui-tree .ui-treenode-content.ui-treenode-selectable .ui-treenode-label:not(.ui-state-highlight):hover {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-tree .ui-treenode-content.ui-treenode-selectable .ui-treenode-label:not(.ui-state-highlight):hover a {
    color: #ffffff; }
.ui-tree .ui-treenode-content.ui-treenode-dragover {
  background: #ffffff;
  color: #ff0084; }
.ui-tree.ui-tree-horizontal .ui-treenode-content.ui-treenode-selectable .ui-treenode-label:not(.ui-state-highlight):hover {
  background-color: inherit;
  color: inherit; }
.ui-tree.ui-tree-horizontal .ui-treenode-content.ui-treenode-selectable:not(.ui-state-highlight):hover {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-tree.ui-tree-horizontal .ui-treenode-content.ui-treenode-selectable:not(.ui-state-highlight):hover a {
    color: #ffffff; }

.ui-treetable .ui-treetable-row.ui-treetable-row-selectable:not(.ui-state-highlight):hover {
  background: #0073ea;
  color: #ffffff; }

.ui-organizationchart .ui-organizationchart-node-content.ui-organizationchart-selectable-node:not(.ui-state-highlight):hover {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-organizationchart .ui-organizationchart-node-content.ui-organizationchart-selectable-node:not(.ui-state-highlight):hover a {
    color: #ffffff; }

.ui-accordion .ui-accordion-header:not(.ui-state-active):not(.ui-state-disabled):hover {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-accordion .ui-accordion-header:not(.ui-state-active):not(.ui-state-disabled):hover a {
    color: #ffffff; }

.ui-fieldset.ui-fieldset-toggleable .ui-fieldset-legend:hover {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-fieldset.ui-fieldset-toggleable .ui-fieldset-legend:hover a {
    color: #ffffff; }

.ui-panel .ui-panel-titlebar .ui-panel-titlebar-icon:hover {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-panel .ui-panel-titlebar .ui-panel-titlebar-icon:hover a {
    color: #ffffff; }

.ui-tabview .ui-tabview-nav li:not(.ui-state-active):not(.ui-state-disabled):hover {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-tabview .ui-tabview-nav li:not(.ui-state-active):not(.ui-state-disabled):hover a {
    color: #ffffff; }

.ui-dialog .ui-dialog-titlebar-icon {
  color: #444444; }
  .ui-dialog .ui-dialog-titlebar-icon:hover {
    border-color: #0073ea;
    background: #0073ea;
    color: #ffffff; }
    .ui-dialog .ui-dialog-titlebar-icon:hover a {
      color: #ffffff; }

.ui-sidebar .ui-sidebar-close {
  color: #444444; }
  .ui-sidebar .ui-sidebar-close:hover {
    border-color: #0073ea;
    background: #0073ea;
    color: #ffffff; }
    .ui-sidebar .ui-sidebar-close:hover a {
      color: #ffffff; }

.ui-overlaypanel .ui-overlaypanel-close:hover {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-overlaypanel .ui-overlaypanel-close:hover a {
    color: #ffffff; }

.ui-inplace .ui-inplace-display:hover {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-inplace .ui-inplace-display:hover a {
    color: #ffffff; }

.ui-breadcrumb a {
  color: #444444; }

.ui-menu .ui-menuitem .ui-menuitem-link {
  color: #444444; }
  .ui-menu .ui-menuitem .ui-menuitem-link:hover {
    border-color: #0073ea;
    background: #0073ea;
    color: #ffffff;
    border-color: transparent; }
    .ui-menu .ui-menuitem .ui-menuitem-link:hover a {
      color: #ffffff; }
.ui-menu .ui-menuitem.ui-menuitem-active > .ui-menuitem-link {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff;
  border-color: transparent; }
  .ui-menu .ui-menuitem.ui-menuitem-active > .ui-menuitem-link a {
    color: #ffffff; }

.ui-tabmenu .ui-tabmenu-nav li:not(.ui-state-active):hover {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-tabmenu .ui-tabmenu-nav li:not(.ui-state-active):hover a {
    color: #ffffff; }

.ui-steps .ui-steps-item:not(.ui-state-highlight):not(.ui-state-disabled):hover {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-steps .ui-steps-item:not(.ui-state-highlight):not(.ui-state-disabled):hover a {
    color: #ffffff; }

.ui-panelmenu .ui-panelmenu-header:not(.ui-state-active):hover {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff;
  border-color: #dddddd; }
  .ui-panelmenu .ui-panelmenu-header:not(.ui-state-active):hover a {
    color: #ffffff; }
  .ui-panelmenu .ui-panelmenu-header:not(.ui-state-active):hover a {
    color: #ffffff; }
.ui-panelmenu .ui-panelmenu-header.ui-state-active a {
  color: #ff0084; }
.ui-panelmenu .ui-panelmenu-content .ui-menuitem-link {
  color: #444444; }
  .ui-panelmenu .ui-panelmenu-content .ui-menuitem-link:hover {
    border-color: #0073ea;
    background: #0073ea;
    color: #ffffff;
    border-color: transparent; }
    .ui-panelmenu .ui-panelmenu-content .ui-menuitem-link:hover a {
      color: #ffffff; }

.ui-datepicker .ui-datepicker-header a {
  color: #444444; }
  .ui-datepicker .ui-datepicker-header a:hover {
    border-color: #0073ea;
    background: #0073ea;
    color: #ffffff; }
    .ui-datepicker .ui-datepicker-header a:hover a {
      color: #ffffff; }
.ui-datepicker .ui-datepicker-calendar td:not(.ui-state-disabled) a:hover {
  border-color: #0073ea;
  background: #0073ea;
  color: #ffffff; }
  .ui-datepicker .ui-datepicker-calendar td:not(.ui-state-disabled) a:hover a {
    color: #ffffff; }

.fc .fc-toolbar .fc-prev-button .ui-icon-circle-triangle-w {
  margin-top: .3em;
  background: none !important;
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-indent: 0px !important;
  text-align: center; }
  .fc .fc-toolbar .fc-prev-button .ui-icon-circle-triangle-w:before {
    content: ""; }
.fc .fc-toolbar .fc-next-button .ui-icon-circle-triangle-e {
  margin-top: .3em;
  background: none !important;
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-indent: 0px !important;
  text-align: center; }
  .fc .fc-toolbar .fc-next-button .ui-icon-circle-triangle-e:before {
    content: ""; }

.ui-rating a {
  color: #444444; }

.ui-organizationchart .ui-organizationchart-line-down {
  background-color: #c4c4c4; }
.ui-organizationchart .ui-organizationchart-line-left {
  border-right: 1px solid #c4c4c4; }
.ui-organizationchart .ui-organizationchart-line-top {
  border-top: 1px solid #c4c4c4; }
.ui-organizationchart .ui-organizationchart-node-content {
  border-color: #c4c4c4; }
.ui-organizationchart .ui-organizationchart-node-content .ui-node-toggler {
  color: #c4c4c4; }

/* Validation */
.ui-inputtext.ng-dirty.ng-invalid,
p-dropdown.ng-dirty.ng-invalid > .ui-dropdown,
p-autocomplete.ng-dirty.ng-invalid > .ui-autocomplete > .ui-inputtext,
p-calendar.ng-dirty.ng-invalid > .ui-calendar > .ui-inputtext,
p-chips.ng-dirty.ng-invalid > .ui-inputtext,
p-inputmask.ng-dirty.ng-invalid > .ui-inputtext,
p-checkbox.ng-dirty.ng-invalid .ui-chkbox-box,
p-radiobutton.ng-dirty.ng-invalid .ui-radiobutton-box,
p-inputswitch.ng-dirty.ng-invalid .ui-inputswitch,
p-listbox.ng-dirty.ng-invalid .ui-inputtext,
p-multiselect.ng-dirty.ng-invalid > .ui-multiselect,
p-spinner.ng-dirty.ng-invalid > .ui-inputtext,
p-selectbutton.ng-dirty.ng-invalid .ui-button,
p-togglebutton.ng-dirty.ng-invalid .ui-button {
  border-bottom-color: #ff0084; }

/* Cornering */
.ui-corner-tl {
  -moz-border-radius-topleft: 2px;
  -webkit-border-top-left-radius: 2px;
  border-top-left-radius: 2px; }

.ui-corner-tr {
  -moz-border-radius-topright: 2px;
  -webkit-border-top-right-radius: 2px;
  border-top-right-radius: 2px; }

.ui-corner-bl {
  -moz-border-radius-bottomleft: 2px;
  -webkit-border-bottom-left-radius: 2px;
  border-bottom-left-radius: 2px; }

.ui-corner-br {
  -moz-border-radius-bottomright: 2px;
  -webkit-border-bottom-right-radius: 2px;
  border-bottom-right-radius: 2px; }

.ui-corner-top {
  -moz-border-radius-topleft: 2px;
  -webkit-border-top-left-radius: 2px;
  border-top-left-radius: 2px;
  -moz-border-radius-topright: 2px;
  -webkit-border-top-right-radius: 2px;
  border-top-right-radius: 2px; }

.ui-corner-bottom {
  -moz-border-radius-bottomleft: 2px;
  -webkit-border-bottom-left-radius: 2px;
  border-bottom-left-radius: 2px;
  -moz-border-radius-bottomright: 2px;
  -webkit-border-bottom-right-radius: 2px;
  border-bottom-right-radius: 2px; }

.ui-corner-right {
  -moz-border-radius-topright: 2px;
  -webkit-border-top-right-radius: 2px;
  border-top-right-radius: 2px;
  -moz-border-radius-bottomright: 2px;
  -webkit-border-bottom-right-radius: 2px;
  border-bottom-right-radius: 2px; }

.ui-corner-left {
  -moz-border-radius-topleft: 2px;
  -webkit-border-top-left-radius: 2px;
  border-top-left-radius: 2px;
  -moz-border-radius-bottomleft: 2px;
  -webkit-border-bottom-left-radius: 2px;
  border-bottom-left-radius: 2px; }

.ui-corner-all {
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px; }


.ui-widget, .ui-widget * {
  box-sizing: border-box;
}
.ui-helper-hidden {
  display: none !important;
}
.ui-helper-hidden-accessible {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
.ui-helper-hidden-accessible input,
.ui-helper-hidden-accessible select {
  transform: scale(0);
}
.ui-helper-reset {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  line-height: 1.3;
  text-decoration: none;
  font-size: 100%;
  list-style: none;
}
.ui-helper-clearfix:before,
.ui-helper-clearfix:after {
  content: "";
  display: table;
}
.ui-helper-clearfix:after {
  clear: both;
}
.ui-helper-clearfix {
  zoom: 1;
}
.ui-helper-zfix {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  opacity: 0;
  filter: Alpha(Opacity=0);
}
.ui-state-disabled {
  cursor: default !important;
}
.ui-state-disabled a {
  cursor: default !important;
}
.ui-icon {
  display: block;
  text-indent: -99999px;
  overflow: hidden;
  background-repeat: no-repeat;
}
.ui-widget-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.ui-resizable {
  position: relative;
}
.ui-resizable-handle {
  position: absolute;
  font-size: 0.1px;
  display: block;
}
.ui-resizable-disabled .ui-resizable-handle,
.ui-resizable-autohide .ui-resizable-handle {
  display: none;
}
.ui-resizable-n {
  cursor: n-resize;
  height: 7px;
  width: 100%;
  top: -5px;
  left: 0;
}
.ui-resizable-s {
  cursor: s-resize;
  height: 7px;
  width: 100%;
  bottom: -5px;
  left: 0;
}
.ui-resizable-e {
  cursor: e-resize;
  width: 7px;
  right: -5px;
  top: 0;
  height: 100%;
}
.ui-resizable-w {
  cursor: w-resize;
  width: 7px;
  left: -5px;
  top: 0;
  height: 100%;
}
.ui-resizable-se {
  cursor: se-resize;
  width: 12px;
  height: 12px;
  right: 1px;
  bottom: 1px;
}
.ui-resizable-sw {
  cursor: sw-resize;
  width: 9px;
  height: 9px;
  left: -5px;
  bottom: -5px;
}
.ui-resizable-nw {
  cursor: nw-resize;
  width: 9px;
  height: 9px;
  left: -5px;
  top: -5px;
}
.ui-resizable-ne {
  cursor: ne-resize;
  width: 9px;
  height: 9px;
  right: -5px;
  top: -5px;
}
.ui-shadow {
  -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);
}
.ui-unselectable-text {
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.ui-scrollbar-measure {
  width: 100px;
  height: 100px;
  overflow: scroll;
  position: absolute;
  top: -9999px;
}
.ui-overflow-hidden {
  overflow: hidden;
}

::-webkit-input-placeholder { /* WebKit, Blink, Edge */
  color: #898989;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
 color: #898989;
 opacity:  1;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
 color: #898989;
 opacity:  1;
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
 color: #898989;
}
::-ms-input-placeholder { /* Microsoft Edge */
 color: #898989;
}
.ui-placeholder {
 color: #898989;
}
.ui-accordion { 
  width: 100%; 
}

.ui-accordion .ui-accordion-header { 
  cursor: pointer; 
  position: relative; 
  margin-top: 1px; 
  zoom: 1; 
}

.ui-accordion .ui-accordion-header a { 
  display: block; 
  padding: .5em .5em .5em 2em; 
}

.ui-accordion .ui-accordion-header>.fa {
  position: absolute; 
  left: .5em; 
  top: 50%; 
  margin-top: -.5em; 
}

.ui-accordion .ui-accordion-content { 
  padding: 1em;
  border-top: 0; 
  overflow: visible;
  zoom: 1; 
}

.ui-accordion .ui-accordion-header.ui-state-disabled, 
.ui-accordion .ui-accordion-header.ui-state-disabled a { 
  cursor: default; 
}

.ui-accordion-content-wrapper-overflown {
  overflow: hidden;
}

.ui-rtl .ui-accordion .ui-accordion-header a {
  padding: .5em 2em .5em .5em;
}

.ui-rtl .ui-accordion .ui-accordion-header > .fa {
  left: initial;
  right: .5em;
}

.ui-rtl .ui-accordion .ui-accordion-header > .fa-caret-right:before {
  content: '\f0d9';
}
.ui-autocomplete {
  width: auto;
  zoom: 1;
  cursor: pointer;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  position: relative;
  display: inline-block;
}

.ui-autocomplete .ui-autocomplete-dropdown {
  height: 100%;
  width: 2em;
  margin-right: 0;
  vertical-align: top;
}

.ui-autocomplete .ui-autocomplete-input {
  padding-right: 1.5em;
}

.ui-autocomplete-loader {
  position: absolute;
  right: .25em;
  top: 50%;
  margin-top: -.5em;
}

.ui-autocomplete-query {
  font-weight: bold;
}

.ui-autocomplete-panel {
  position: absolute;
  overflow: auto;
}

.ui-autocomplete-panel .ui-autocomplete-list {
  padding: 0.4em;
  border: 0 none;
}

.ui-autocomplete-panel .ui-autocomplete-list-item {
  border: 0 none;
  cursor: pointer;
  font-weight: normal;
  margin: 1px 0;
  padding: 0.186em 0.313em;
  text-align: left;
}

.ui-autocomplete .ui-button-icon-only,
.ui-autocomplete .ui-button-icon-only:enabled:hover,
.ui-autocomplete .ui-button-icon-only:enabled:focus,
.ui-autocomplete .ui-button-icon-only:enabled:active {
  border-left: 0 none;
}

/* Multiple Selection */
.ui-autocomplete-multiple-container {
  display: inline-block;
  vertical-align: middle;
}

.ui-autocomplete-multiple-container.ui-inputtext {
  clear: left;
  cursor: text;
  list-style-type: none;
  margin: 0;
  overflow: hidden;
  padding: 0 1.5em 0 .25em;
}

.ui-autocomplete-token {
  cursor: default;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  padding: .125em .5em;
  white-space: nowrap;
  position: relative;
  margin-right: .125em;
  border: 0 none;
  font-size: .9em;
}

.ui-autocomplete-token-label {
  display: block;
  margin-right: 2em;
}

.ui-autocomplete-token-icon {
  margin-top: -.5em;
  position: absolute;
  right: 0.2em;
  top: 50%;
  cursor: pointer;
}

.ui-autocomplete-input-token {
  display: inline-block;
  vertical-align: middle;
  list-style-type: none;
  margin: 0 0 0 .125em;
  padding: .25em .25em .25em 0;
}

.ui-autocomplete-input-token input {
  border: 0 none;
  width: 10em;
  outline: medium none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  box-shadow: none;
  -moz-border-radius: 0;
  -webkit-border-radius: 0;
  border-radius: 0;
}

.ui-autocomplete-dd .ui-autocomplete-loader {
  right: 2.25em;
}

.ui-autocomplete-dd input.ui-corner-all ,
.ui-autocomplete-dd .ui-autocomplete-multiple-container.ui-corner-all {
   -moz-border-radius-topright: 0px; 
   -webkit-border-top-right-radius: 0px;
   border-top-right-radius: 0px;
   -moz-border-radius-bottomright: 0px;
   -webkit-border-bottom-right-radius: 0px;
   border-bottom-right-radius: 0px;
}

.ui-autocomplete-dd .ui-autocomplete-dropdown.ui-corner-all {
   -moz-border-radius-topleft: 0px; 
   -webkit-border-top-left-radius: 0px;
   border-top-left-radius: 0px;
   -moz-border-radius-bottomleft: 0px;
   -webkit-border-bottom-left-radius: 0px;
   border-bottom-left-radius: 0px;
}

/** AutoComplete **/
.ui-fluid p-autocomplete,
.ui-fluid .ui-autocomplete,
.ui-fluid .ui-autocomplete-input {
  width: 100%;
}

.ui-fluid .ui-autocomplete.ui-autocomplete-dd .ui-autocomplete-input,
.ui-fluid .ui-autocomplete.ui-autocomplete-dd .ui-autocomplete-multiple-container {
  width: calc(100% - 2em);
}

.ui-fluid .ui-autocomplete .ui-autocomplete-dropdown.ui-button {
  width: 2em;
}

.ui-blockui {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.ui-blockui-document {
  position: fixed;
}
/** Breadcrumb **/
.ui-breadcrumb {
  margin: 0;
  padding: 0;
  padding: .3em;
}

.ui-breadcrumb ul {
  margin: 0;
  padding: 0;
}

.ui-breadcrumb ul li {
  display: inline-block;
  vertical-align: middle;
}

.ui-breadcrumb ul li .ui-menuitem-link {
  text-decoration: none;
}
/* Button */
.ui-button { 
  display: inline-block; 
  position: relative; 
  padding: 0; 
  margin-right: .1em; 
  text-decoration: none !important; 
  cursor: pointer; 
  text-align: center; 
  zoom: 1; 
  overflow: visible; /* the overflow property removes extra width in IE */
} 

.ui-button-icon-only { 
  width: 2em;
} 

/*button text element */
.ui-button .ui-button-text { 
  display: block; 
  line-height: normal;  
}

.ui-button-text-only .ui-button-text { 
  padding: .25em 1em; 
}

.ui-button-icon-only .ui-button-text { 
  padding: .25em; 
  text-indent: -9999999px; 
}

.ui-button-text-icon-left .ui-button-text { 
  padding: .25em 1em .25em 2.1em; 
}

.ui-button-text-icon-right .ui-button-text { 
  padding: .25em 2.1em .25em 1em; 
}

/*button icon element(s) */
.ui-button-icon-only .fa,
.ui-button-text-icon-left .fa,
.ui-button-text-icon-right .fa {
  position: absolute; 
  top: 50%;
  margin-top: -.5em; 
}

.ui-button-icon-only .fa {
  top: 50%;
  left: 50%;
  margin-top: -.5em;
  margin-left: -.6em;
}

.ui-button-icon-left {
  left: .5em; 
}

.ui-button-icon-right {
  right: .5em; 
}

/*button sets*/
.ui-buttonset .ui-button { 
  margin-left: 0; 
  margin-right: 0;
}

/* workarounds */
button.ui-button::-moz-focus-inner { 
  border: 0; padding: 0; /* reset extra padding in Firefox */
}

/** Fluid **/
.ui-fluid .ui-button {
  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing:border-box;
  -moz-box-sizing: border-box;
}

.ui-fluid .ui-button-text-icon-left .ui-button-text,
.ui-fluid .ui-button-text-icon-right .ui-button-text {
  padding-left: 1em;
  padding-right: 1em;
}

/** ButtonSet **/
.ui-fluid .ui-buttonset {
  width: 100%;
}

.ui-fluid .ui-buttonset.ui-buttonset-1 .ui-button {width: 100%;}
.ui-fluid .ui-buttonset.ui-buttonset-2 .ui-button {width: 50%;}
.ui-fluid .ui-buttonset.ui-buttonset-3 .ui-button {width: 33.3%;}
.ui-fluid .ui-buttonset.ui-buttonset-4 .ui-button {width: 25%;}
.ui-fluid .ui-buttonset.ui-buttonset-5 .ui-button {width: 20%;}
.ui-fluid .ui-buttonset.ui-buttonset-6 .ui-button {width: 16.6%;}

@media (max-width: 640px) {
  .ui-fluid .ui-buttonset.ui-buttonset-1 .ui-button,
  .ui-fluid .ui-buttonset.ui-buttonset-2 .ui-button,
  .ui-fluid .ui-buttonset.ui-buttonset-3 .ui-button,
  .ui-fluid .ui-buttonset.ui-buttonset-4 .ui-button,
  .ui-fluid .ui-buttonset.ui-buttonset-5 .ui-button,
  .ui-fluid .ui-buttonset.ui-buttonset-6 .ui-button {
      width: 100%;
  }
}

/* Severity Buttons */
/* Secondary */
.ui-button.ui-button-secondary.ui-state-default,
.ui-splitbutton.ui-button-secondary .ui-button.ui-state-default {
  background-color: #ffffff;
  border-color: #cccccc;
  color: #373a3c;
}

.ui-button.ui-button-secondary:enabled:hover,
.ui-button.ui-button-secondary:focus,
.ui-splitbutton.ui-button-secondary .ui-button:enabled:hover,
.ui-splitbutton.ui-button-secondary .ui-button:focus {
  background-color: #f2f2f2;
  border-color: #cccccc;
  color: #373a3c;
}

.ui-button.ui-button-secondary:enabled:active,
.ui-splitbutton.ui-button-secondary .ui-button:enabled:active  {
  background-color: #e6e6e6;
  border-color: #cccccc;
  color: #373a3c;
}

/* Success */
.ui-button.ui-button-success.ui-state-default,
.ui-splitbutton.ui-button-success .ui-button.ui-state-default {
  background-color: #5cb85c;
  border-color: #5cb85c;
  color: #ffffff;
}

.ui-button.ui-button-success:enabled:hover,
.ui-button.ui-button-success:focus,
.ui-splitbutton.ui-button-success .ui-button:enabled:hover,
.ui-splitbutton.ui-button-success .ui-button:focus {
  background-color: #4cae4c;
  border-color: #5cb85c;
}

.ui-button.ui-button-success:enabled:active,
.ui-splitbutton.ui-button-success .ui-button:enabled:active {
  background-color: #449d44;
  border-color: #5cb85c;
}

/* Info */
.ui-button.ui-button-info.ui-state-default,
.ui-splitbutton.ui-button-info .ui-button.ui-state-default {
  background-color: #5bc0de;
  border-color: #5bc0de;
  color: #ffffff;
}

.ui-button.ui-button-info:enabled:hover,
.ui-button.ui-button-info:focus,
.ui-splitbutton.ui-button-info .ui-button:enabled:hover,
.ui-splitbutton.ui-button-info .ui-button:focus {
  background-color: #46b8da;
  border-color: #5bc0de;
}

.ui-button.ui-button-info:enabled:active,
.ui-splitbutton.ui-button-info .ui-button:enabled:active {
  background-color: #31b0d5;
  border-color: #5bc0de;
}

/* Warning */
.ui-button.ui-button-warning.ui-state-default,
.ui-splitbutton.ui-button-warning .ui-button.ui-state-default {
  background-color: #f0ad4e;
  border-color: #f0ad4e;
  color: #ffffff;
}

.ui-button.ui-button-warning:enabled:hover,
.ui-button.ui-button-warning:focus,
.ui-splitbutton.ui-button-warning .ui-button:enabled:hover,
.ui-splitbutton.ui-button-warning .ui-button:focus {
  background-color: #eea236;
  border-color: #f0ad4e;
}

.ui-button.ui-button-warning:enabled:active,
.ui-splitbutton.ui-button-warning .ui-button:enabled:active {
  background-color: #ec971f;
  border-color: #f0ad4e;
}

/* Danger */
.ui-button.ui-button-danger.ui-state-default,
.ui-splitbutton.ui-button-danger .ui-button.ui-state-default {
  background-color: #d9534f;
  border-color: #d9534f;
  color: #ffffff;
}

.ui-button.ui-button-danger:enabled:hover,
.ui-button.ui-button-danger:focus,
.ui-splitbutton.ui-button-danger .ui-button:enabled:hover,
.ui-splitbutton.ui-button-danger .ui-button:focus {
  background-color: #d43f3a;
  border-color: #d9534f;
}

.ui-button.ui-button-danger:enabled:active,
.ui-splitbutton.ui-button-danger .ui-button:enabled:active {
  background-color: #c9302c;
  border-color: #d9534f;
}
.ui-calendar {
  position: relative;
  display: inline-block;
}

.ui-calendar .ui-calendar-button {
  position: absolute;
  height: 100%;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  width: 2em;
  border-left: 0 none;
}

.ui-calendar .ui-calendar-button:enabled:hover,
.ui-calendar .ui-calendar-button:focus {
  border-left: 0 none;
} 

/* Fluid */
.ui-fluid .ui-calendar {
  width: 100%;
}

.ui-fluid .ui-calendar-button {
  width: 2em;
}

.ui-fluid .ui-datepicker-buttonbar button {
  width: auto;
}

.ui-fluid .ui-calendar.ui-calendar-w-btn .ui-inputtext {
  width: calc(100% - 2em);
}

/* Datepicker */
.ui-datepicker {
width: 17em;
padding: .2em;
display: none;
  position: absolute;
}
.ui-datepicker.ui-datepicker-inline {
  display: inline-block;
  position: static;
}
.ui-datepicker .ui-datepicker-header {
position: relative;
padding: .2em 0;
}
.ui-datepicker .ui-datepicker-prev,
.ui-datepicker .ui-datepicker-next {
position: absolute;
top: .125em;
width: 1.8em;
height: 1.8em;
}

.ui-datepicker .ui-datepicker-prev {
left: .125em;
}
.ui-datepicker .ui-datepicker-next {
right: .125em;
}
.ui-datepicker .ui-datepicker-prev span,
.ui-datepicker .ui-datepicker-next span {
display: block;
position: absolute;
left: 50%;
top: 50%;
margin-top: -.5em;
}
.ui-datepicker .ui-datepicker-prev span {
margin-left: -.25em;
}
.ui-datepicker .ui-datepicker-next span {
margin-left: -.125em;
}
.ui-datepicker .ui-datepicker-title {
margin: 0 2.3em;
line-height: 1.8em;
text-align: center;
}
.ui-datepicker .ui-datepicker-title select {
font-size: 1em;
margin: .125em 0;
  vertical-align: middle;
}
.ui-datepicker select.ui-datepicker-month {
  width: 55%;
}
.ui-datepicker select.ui-datepicker-year {
width: 35%;
}
.ui-datepicker select.ui-datepicker-month {
  margin-right: .25em;
}
.ui-datepicker table {
width: 100%;
font-size: .9em;
border-collapse: collapse;
margin: 0 0 .4em;
}
.ui-datepicker th {
padding: .7em .3em;
text-align: center;
font-weight: bold;
border: 0;
}
.ui-datepicker td {
border: 0;
padding: .125em;
}
.ui-datepicker td span,
.ui-datepicker td a {
display: block;
padding: .2em;
text-align: right;
text-decoration: none;
}
.ui-datepicker .ui-datepicker-buttonpane {
background-image: none;
margin: .7em 0 0 0;
padding: 0 .2em;
border-left: 0;
border-right: 0;
border-bottom: 0;
}
.ui-datepicker .ui-datepicker-buttonpane button {
float: right;
margin: .5em .2em .4em;
cursor: pointer;
padding: .2em .6em .3em .6em;
width: auto;
overflow: visible;
}
.ui-datepicker .ui-datepicker-buttonpane button.ui-datepicker-current {
float: left;
}

/* with multiple calendars */
.ui-datepicker.ui-datepicker-multi {
width: auto;
}
.ui-datepicker-multi .ui-datepicker-group {
float: left;
}
.ui-datepicker-multi .ui-datepicker-group table {
width: 95%;
margin: 0 auto .4em;
}
.ui-datepicker-multi-2 .ui-datepicker-group {
width: 50%;
}
.ui-datepicker-multi-3 .ui-datepicker-group {
width: 33.3%;
}
.ui-datepicker-multi-4 .ui-datepicker-group {
width: 25%;
}
.ui-datepicker-multi .ui-datepicker-group-last .ui-datepicker-header,
.ui-datepicker-multi .ui-datepicker-group-middle .ui-datepicker-header {
border-left-width: 0;
}
.ui-datepicker-multi .ui-datepicker-buttonpane {
clear: left;
}
.ui-datepicker-row-break {
clear: both;
width: 100%;
font-size: 0;
}

.ui-datepicker .ui-datepicker-buttonbar {
  border-left: 0 none;
  border-right: 0 none;
  border-bottom: 0 none;
padding: .2em;
}

.ui-datepicker .ui-datepicker-buttonbar > .ui-g > div:last-child {
  text-align: right;
}

.ui-datepicker .ui-datepicker-buttonbar > .ui-g > div {
  padding: 0;
}

.ui-calendar.ui-calendar-w-btn input {
  -moz-border-radius-topright: 0px; 
  -webkit-border-top-right-radius: 0px; 
  -khtml-border-top-right-radius: 0px; 
  border-top-right-radius: 0px;
  -moz-border-radius-bottomright: 0px; 
  -webkit-border-bottom-right-radius: 0px; 
  -khtml-border-bottom-right-radius: 0px; 
  border-bottom-right-radius: 0px;
}

.ui-timepicker {
  text-align: center;
  padding: .5em 0;
}

.ui-timepicker > div {
  display: inline-block;
  margin-left: .5em;
  min-width: 1.5em;
}

.ui-timepicker > .ui-minute-picker,
.ui-timepicker > .ui-second-picker {
  margin-left: 0;
}

.ui-timepicker > .ui-separator {
  margin-left: 0px;
  min-width: .75em;
}

.ui-timepicker > .ui-separator a {
  visibility: hidden;
}

.ui-timepicker > div a {
  display: block;
  opacity: 0.7;
  filter:Alpha(Opacity=70);
}

.ui-timepicker > div a:hover {
  display: block;
  opacity: 1;
  filter:Alpha(Opacity=100);
}
.ui-carousel {
  position: relative;
  padding: .063em;
}

.ui-carousel .ui-carousel-viewport .ui-carousel-items {
  list-style: none outside none;
  margin: 0;
  padding:0;
  position: relative;
  width: 32000px;
  left: 0;
}

.ui-carousel .ui-carousel-viewport .ui-carousel-items .ui-carousel-item {
  margin: 1px;
  padding: 0;
  float: left;
  box-sizing: border-box;
}

.ui-carousel .ui-carousel-viewport {
  overflow: hidden;
  position: relative;
  border: 0;
}

.ui-carousel .ui-carousel-footer {
  margin: 1px 1px 0px 1px;
  padding: .5em;
  overflow: hidden;
}

.ui-carousel .ui-carousel-header {
  margin: 0 1px;
  overflow: hidden;
  padding: .625em;
}

.ui-carousel .ui-carousel-header .ui-carousel-header-title {
  display: inline-block;
  overflow: hidden;
}

.ui-carousel .ui-carousel-dropdown,
.ui-carousel .ui-carousel-mobiledropdown {
  float: right;
  margin: 0px .625em;
  background-image: none;
}

.ui-carousel .ui-carousel-dropdown option,
.ui-carousel .ui-carousel-mobiledropdown option{
  background-image: none;
  border: 0 none;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
}

.ui-carousel .ui-carousel-button {
  float: right;
  margin: .125em;
}

.ui-carousel .ui-carousel-page-link {
  float: left;
  margin: 0 .125em;
  text-decoration: none;
}

.ui-carousel .ui-carousel-page-link, 
.ui-carousel .ui-carousel-button {
  cursor: pointer;
}

.ui-carousel .ui-carousel-page-links {
  margin: 0px .5em;
  margin-top: .125em;
  float: right;
}

.ui-carousel .ui-carousel-mobiledropdown {
  display: none;
}
.ui-chkbox {
  display: inline-block;
  cursor: pointer;
  vertical-align: middle;
  margin-right: .25em;
}

.ui-chkbox .ui-chkbox-box {
  width: 1.125em;
  height: 1.125em;
  line-height: 1.125em;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  text-align: center;
}

.ui-chkbox .ui-chkbox-icon {
  display: block;
}

.ui-chkbox-label {
  vertical-align: middle;  
}


.ui-chips > ul.ui-inputtext {
  clear: left;
  cursor: text;
  list-style-type: none;
  margin: 0;
  overflow: hidden;
  padding: 0 .25em;
}

.ui-chips-token {
  cursor: default;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  padding: .125em .5em;
  white-space: nowrap;
  position: relative;
  margin-right: .125em;
  border: 0 none;
  font-size: .9em;
}

.ui-chips-token .ui-chips-token-label {
  display: block;
  margin-right: 2em;
}

.ui-chips > .ui-state-disabled .ui-chips-token-label {
  margin-right: 0;
}

.ui-chips-token .ui-chips-token-icon {
  margin-top: -.5em;
  position: absolute;
  right: 0.2em;
  top: 50%;
  cursor: pointer;
}

.ui-chips-input-token {
  display: inline-block;
  vertical-align: middle;
  list-style-type: none;
  margin: 0 0 0 .125em;
  padding: .25em .25em .25em 0;
}

.ui-chips-input-token input {
  border: 0 none;
  width: 10em;
  outline: medium none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  box-shadow: none;
  -moz-border-radius: 0;
  -webkit-border-radius: 0;
  border-radius: 0;
}
.ui-colorpicker {
  display: inline-block;
} 

.ui-colorpicker-dragging {
  cursor: pointer;
} 

.ui-colorpicker-overlay {
  position: relative;
} 

.ui-colorpicker-panel {
  position: relative;
  width: 193px;
  height: 166px;
  background-color: #323232;
  border-color: #191919;
}

.ui-colorpicker-overlay-panel {
  display: none;
  position: absolute;
} 

.ui-colorpicker-preview {
  width: 2em;
  cursor: pointer;
}

.ui-colorpicker-panel .ui-colorpicker-content {
  position: relative;
}

.ui-colorpicker-panel .ui-colorpicker-color-selector {
  width: 150px;
  height: 150px;
  top: 8px;
  left: 8px;
  position: absolute;
}

.ui-colorpicker-panel .ui-colorpicker-color {
   width: 150px;
   height: 150px;
   background: transparent url("./images/color.png") no-repeat left top; 
}

.ui-colorpicker-panel .ui-colorpicker-color-handle {
   position: absolute;
   top: 0px;
   left: 150px;
   border-radius: 100%;
   width: 10px;
   height: 10px;
   border: 1px solid #ffffff;
   margin: -5px 0 0 -5px;
   cursor: pointer;
}

.ui-colorpicker-panel .ui-colorpicker-hue {
  background: transparent url("./images/hue.png") no-repeat left top; 
  width: 17px;
  height: 150px;
  top: 8px;
  left: 167px;
  position: absolute;
  opacity: .85;
}

.ui-colorpicker-panel .ui-colorpicker-hue-handle {
   position: absolute;
   top: 150px;
   left: 0px;
   width: 21px;
   margin-left: -2px;
   margin-top: -5px;
   height: 10px;
   border: 2px solid #ffffff;
   opacity: .85;
   cursor: pointer;
}

.ui-colorpicker-panel.ui-state-disabled .ui-colorpicker-hue-handle,
.ui-colorpicker-panel.ui-state-disabled .ui-colorpicker-color-handle  {
    opacity: .5;
}
.ui-datagrid .ui-paginator {
text-align: center;
  border-top: 0 none;
}

.ui-datagrid-column {
padding: .25em;
}

.ui-datagrid-content-empty {
  padding: .25em .625em;
}

.ui-datagrid .ui-datagrid-header,
.ui-datagrid .ui-datagrid-footer {
  text-align:center;
padding: .5em .75em;
}

.ui-datagrid .ui-datagrid-header {
  border-bottom: 0 none;
}

.ui-datagrid .ui-datagrid-footer {
  border-top: 0 none;
}

.ui-datagrid .ui-paginator-top {
  border-bottom: 0 none;
}

.ui-datagrid .ui-paginator-bottom {
  border-top: 0 none;
}


.ui-datalist .ui-datalist-header,
.ui-datalist .ui-datalist-footer {
  text-align:center;
padding: .5em .75em;
}

.ui-datalist .ui-datalist-header {
  border-bottom: 0 none;
}

.ui-datalist .ui-datalist-footer {
  border-top: 0 none;
}

.ui-datalist .ui-paginator {
  border-top: 0 none;
}

.ui-datalist .ui-datalist-data {
  margin: 0;
  padding: 0;
}

.ui-datalist .ui-datalist-data > li {
  list-style-type: none;
  
}

.ui-datalist .ui-datalist-emptymessage {
  padding: .5em .75em;
}

.ui-datalist.ui-datalist-scrollable .ui-datalist-content {
  overflow: auto;
}
.ui-datascroller {
}

.ui-datascroller .ui-datascroller-header {
  text-align: center;
padding: .5em .75em;
  border-bottom: 0 none;
}

.ui-datascroller .ui-datascroller-footer {
  text-align: center;
  padding: .25em .625em;
  border-top: 0px none;
}

.ui-datascroller .ui-datascroller-content {
  padding: .25em .625em;
}

.ui-datascroller-inline .ui-datascroller-content {
  overflow: auto;
}

.ui-datascroller .ui-datascroller-list {
  list-style-type: none; 
  margin: 0;
  padding: 0;
}
.ui-datatable {
  position: relative;
}

.ui-datatable table {
border-collapse:collapse;
  width: 100%;
  table-layout: fixed;
}

.ui-datatable .ui-datatable-header,
.ui-datatable .ui-datatable-caption,
.ui-datatable .ui-datatable-footer {
  text-align: center;
padding: .5em .75em;
  box-sizing: border-box;
}

.ui-datatable .ui-datatable-caption,
.ui-datatable .ui-datatable-header {
  border-bottom: 0 none;
}

.ui-datatable .ui-datatable-footer {
  border-top: 0 none;
}

.ui-datatable thead th, .ui-datatable tfoot td {
  text-align: center;
}

.ui-datatable thead tr {
  border-width: 0;
}

.ui-datatable .ui-datatable-thead > tr > th,
.ui-datatable .ui-datatable-tfoot > tr > td,
.ui-datatable .ui-datatable-data > tr > td {
  border-color: inherit;
  box-sizing: border-box;
  padding: .25em .5em;
  border-width: 1px;
  border-style: solid;
}


.ui-datatable.ui-datatable-resizable .ui-datatable-thead > tr > th,
.ui-datatable.ui-datatable-resizable .ui-datatable-tfoot > tr > td,
.ui-datatable.ui-datatable-resizable .ui-datatable-data > tr > td {
  overflow: hidden;
}

.ui-datatable .ui-datatable-thead > tr > th,
.ui-datatable .ui-datatable-tfoot > tr > td {
  font-weight: normal;
}

.ui-datatable tbody {
  outline: 0;
}

.ui-datatable .ui-sortable-column {
  cursor: pointer;
}

.ui-datatable .ui-sortable-column-icon {
  display: inline-block;
  margin-left: .125em;
}

.ui-datatable tr.ui-state-highlight {
  cursor: pointer;
}

/* Scrollable */
.ui-datatable-scrollable-body {
  overflow: auto;
  overflow-anchor: none
}
.ui-datatable-scrollable-header {
  overflow: hidden;
}

.ui-datatable-scrollable .ui-datatable-scrollable-header,
.ui-datatable-scrollable .ui-datatable-scrollable-footer {
  position: relative;
  border: 0 none;
}

.ui-datatable-scrollable .ui-datatable-scrollable-header td {
  font-weight: normal;
}

.ui-datatable .ui-datatable-scrollable-body  {
  min-height: 0%;
}

.ui-datatable .ui-datatable-data tr.ui-state-hover,
.ui-datatable .ui-datatable-data tr.ui-state-highlight {
  border-color: inherit;
  font-weight: inherit;
  cursor: pointer;
}

.ui-datatable .ui-datatable-data tr.ui-rowgroup-header td a,
.ui-datatable .ui-datatable-data tr.ui-rowgroup-header td span.ui-rowgroup-header-name {
  display: inline-block;
  vertical-align: middle;
}

.ui-datatable-scrollable-theadclone {
  height: 0;
}

.ui-datatable-scrollable-theadclone tr {
  height: 0;
}

.ui-datatable-scrollable-theadclone th.ui-state-default {
  height: 0;
  border-bottom-width: 0;
  border-top-width: 0;
  padding-top: 0;
  padding-bottom: 0;
  outline: 0 none;
}

.ui-datatable-scrollable-theadclone th span.ui-column-title {
display: block;
height: 0;
}

.ui-datatable .ui-paginator {
  padding: .125em;
}

.ui-datatable .ui-paginator-top {
  border-bottom-width: 0;
}

.ui-datatable .ui-paginator-bottom {
  border-top-width: 0;
}

.ui-datatable-rtl {
  direction: rtl;
}

.ui-datatable-rtl.ui-datatable thead th,
.ui-datatable-rtl.ui-datatable tfoot td {
  text-align: right;
}

/* Row Toggler */
.ui-row-toggler {
  cursor: pointer;
}

/* Resizable */
.ui-datatable .ui-column-resizer {
  display: block;
  position: absolute !important;
  top: 0;
  right: 0;
  margin: 0;
  width: .5em;
  height: 100%;
  padding: 0px;
  cursor:col-resize;
  border: 1px solid transparent;
}

.ui-datatable .ui-column-resizer-helper {
  width: 1px;
  position: absolute;
  z-index: 10;
  display: none;
}

.ui-datatable-resizable {
  padding-bottom: 1px;     /*fix for webkit overlow*/
  overflow:auto;
}

.ui-datatable-resizable thead th,
.ui-datatable-resizable tbody td,
.ui-datatable-resizable tfoot td {
  white-space: nowrap;
}

.ui-datatable-resizable th.ui-resizable-column {
  background-clip: padding-box;
  position: relative;
}

/** Reflow **/
.ui-datatable-reflow .ui-datatable-data td .ui-column-title {
  display: none;
}

/* Filter */
.ui-datatable .ui-column-filter {
  display: block;
  width: 100%;
  box-sizing: border-box;
  margin-top: .25em;
}

/* Editing */
.ui-datatable .ui-editable-column input {
  width: 100%;
  outline: 0;
}

.ui-datatable .ui-datatable-data > tr > td.ui-editable-column {
  padding: .5em;
}

.ui-datatable .ui-editable-column > .ui-cell-editor {
  display: none;
}

.ui-datatable .ui-datatable-data > tr > td.ui-editable-column.ui-cell-editing {
  padding: 1px;
}

.ui-datatable .ui-editable-column.ui-cell-editing > .ui-cell-editor {
  display: block;
}

.ui-datatable .ui-editable-column.ui-cell-editing > .ui-cell-data {
  display: none;
}

.ui-datatable-stacked thead th,
.ui-datatable-stacked tfoot td {
  display: none !important;
}

.ui-datatable.ui-datatable-stacked .ui-datatable-data > tr > td {
  text-align: left;
  display: block;
  border: 0 none;
  width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  float: left;
  clear: left;
}

.ui-datatable.ui-datatable-stacked .ui-datatable-data.ui-widget-content {
  border: 0 none;
}

.ui-datatable-stacked .ui-datatable-data tr.ui-widget-content {
  border-left: 0 none;
  border-right: 0 none;
}

.ui-datatable-stacked .ui-datatable-data td .ui-column-title {
  padding: .4em;
  min-width: 30%;
  display: inline-block;
  margin: -.4em 1em -.4em -.4em;
  font-weight: bold;
}

.ui-datatable .ui-selection-column .ui-chkbox,
.ui-datatable .ui-selection-column .ui-radiobutton {
   margin: 0;
   display: block;
}

.ui-datatable .ui-selection-column .ui-chkbox-box,
.ui-datatable .ui-selection-column .ui-radiobutton-box {
  display: block;
  box-sizing: border-box;
  margin: 0;
}

.ui-datatable-scrollable-wrapper {
  position: relative;
}

.ui-datatable-scrollable-view {
  
}

.ui-datatable-frozen-view .ui-datatable-scrollable-body {
  overflow: hidden;
}

.ui-datatable-unfrozen-view {
  position: absolute;
  top: 0px;
}

.ui-datatable .ui-datatable-load-status {
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}

.ui-datatable .ui-datatable-virtual-table {
  position: absolute;
  top: 0px;
  left: 0px;
}

.ui-datatable .ui-datatable-loading {
  position: absolute;
  width: 100%;
  height: 100%;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=10)";
  opacity: 0.1;
  z-index: 1;
}

.ui-datatable .ui-datatable-loading-content {
  position: absolute;
  left: 50%;
  top: 25%;
  z-index: 2;
}

@media ( max-width: 35em ) {
  .ui-datatable-reflow thead th,
  .ui-datatable-reflow tfoot td {
      display: none !important;
  }

  .ui-datatable-reflow .ui-datatable-data > tr > td {
      text-align: left;
      display: block;
      border: 0 none;
      width: 100% !important;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  float: left;
  clear: left;
  }

  .ui-datatable-reflow .ui-datatable-data.ui-widget-content {
      border: 0 none;
  }

  .ui-datatable-reflow .ui-datatable-data tr.ui-widget-content {
      border-left: 0 none;
      border-right: 0 none;
  }

  .ui-datatable-reflow .ui-datatable-data td .ui-column-title {
      padding: .4em;
      min-width: 30%;
      display: inline-block;
      margin: -.4em 1em -.4em -.4em;
      font-weight: bold;
  }
  
  .ui-datatable-reflow.ui-datatable-scrollable .ui-datatable-scrollable-body colgroup {
      display: block;
  }
}
.ui-dialog {
  position: fixed;
  padding: 0;
}
.ui-dialog .ui-dialog-titlebar {
padding: .5em .75em;
  position: relative;
  border: 0;
}
.ui-dialog .ui-dialog-content {
  position: relative;
  border: 0;
  padding: .5em .75em;
  background: none;
  overflow: auto;
  zoom: 1;
}
.ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset {
  float: right;
}

.ui-dialog .ui-dialog-buttonpane button {
  margin: .5em .4em .5em 0;
  cursor: pointer;
  float: right;
}
.ui-dialog .ui-resizable-se {
  width: 14px;
  height: 14px;
  right: 3px;
  bottom: 3px;
}
.ui-draggable .ui-dialog-titlebar {
  cursor: move;
}
.ui-dialog .ui-dialog-titlebar-icon {
  text-decoration: none
}
.ui-dialog .ui-dialog-titlebar-close {
  float: right;
  padding: .125em;
  cursor: pointer;
  border: 1px solid transparent;
}
.ui-dialog .ui-dialog-titlebar-close span {
  display: block;
  margin: 0;
}

.ui-dialog-footer {
  padding: 1em;
  border-width: 1px 0 0 0;
  text-align: right;
}

.ui-dialog-mask {
  position: fixed;
  width: 100%;
  height: 100%;
}

/* ConfirmDialog */
.ui-confirmdialog {
  width: 30em;
}

.ui-confirmdialog.ui-dialog .ui-dialog-content {
  padding: 1em 2em;
}
.ui-confirmdialog .ui-dialog-content .fa {
  font-size: 1.5em;
  vertical-align: middle;
  margin-right: .5em;
}
.ui-confirmdialog .ui-dialog-content .ui-confirmdialog-message {
  vertical-align: middle;
}

/* Fluid */
.ui-fluid .ui-dialog-footer .ui-button {
  width: auto;
}

/* RTL */
.ui-rtl .ui-dialog .ui-dialog-titlebar-close  {
  float: left;
}

.ui-rtl .ui-dialog .ui-dialog-buttonpane button {
  text-align: right;
}

@media screen and (max-width: 40em) {
  .ui-confirmdialog {
      width: 90%;
  }
}
.ui-dropdown {
  display: inline-block;
  position: relative;
  cursor: pointer;
  vertical-align: middle;
}

.ui-dropdown .ui-dropdown-trigger {
  border-right: none;
  border-top: none;
  border-bottom: none;
  cursor: pointer;
  width: 1.5em;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  padding: 0 .25em;
}

.ui-dropdown .ui-dropdown-trigger .fa {
  margin-top: .3em;
  margin-left: -.125em;
}

.ui-dropdown .ui-dropdown-label  {
  display: block;
  border: none;
  white-space: nowrap;
  overflow: hidden;
  font-weight: normal;
  width: 100%;
  padding-right: 1.5em;
}

.ui-dropdown-item-empty,
.ui-dropdown-label-empty {
  text-indent: -9999px;   
}

.ui-dropdown.ui-state-disabled .ui-dropdown-trigger,
.ui-dropdown.ui-state-disabled .ui-dropdown-label {
  cursor: default;
}

.ui-dropdown label.ui-dropdown-label  {
  cursor: pointer;
}

.ui-dropdown input.ui-dropdown-label  {
  cursor: default;
}

.ui-dropdown .ui-dropdown-panel {
  min-width: 100%;
}

.ui-dropdown-panel {
  position: absolute;
  height: auto;
  display: none;
}

.ui-dropdown-panel .ui-dropdown-items-wrapper {
  overflow: auto;
}

.ui-dropdown-panel .ui-dropdown-item {
  font-weight: normal;
  border: 0 none;
  cursor: pointer;
  margin: 1px 0;
  padding: .125em .25em;
  text-align: left;
}

.ui-dropdown-panel .ui-dropdown-item-group {
  font-weight: bold;
}

.ui-dropdown-panel .ui-dropdown-list {
  padding: 0.4em;
  border: 0 none;
}

.ui-dropdown-panel .ui-dropdown-filter {
  width: 100%;
  box-sizing: border-box;
  padding-right: 1.5em;
}

.ui-dropdown-panel .ui-dropdown-filter-container {
  position: relative;
  margin: 0;
  padding: 0.4em;
  display: inline-block;
  width: 100%;
}

.ui-dropdown-panel .ui-dropdown-filter-container .fa {
  position: absolute;
  top: .8em;
  right: 1em;
}

/** Dropdown **/
.ui-fluid .ui-dropdown {
  width: 100%;
}

.ui-fieldset, .ui-fieldset .ui-fieldset-legend {
  padding: 0.6em 1em;
}

.ui-fieldset-toggleable .ui-fieldset-legend {
  padding: 0.5em 1em 0.5em 0.5em;
  cursor:pointer;
  white-space: nowrap;
}

.ui-fieldset .ui-fieldset-toggler {
  margin-right: .1em;
  display: inline-block;
  vertical-align: middle;
}

.ui-fieldset .ui-fieldset-content-wrapper-overflown {
  overflow: hidden;
} 
/*
* FileUpload
*/
.ui-fileupload-buttonbar .ui-fileupload-choose.ui-state-disabled input {
  cursor: default;
}

.ui-fileupload-buttonbar {
  padding: .5em;
  border-bottom: 0 none;
}

.ui-fileupload-buttonbar .ui-button {
  vertical-align: middle;
  margin-right: .25em;
}

.ui-fileupload-content {
  padding: 1em;
  position: relative;
  transition: border-color .3s;
}

.ui-fileupload-content.ui-fileupload-highlight {
  border-color: #156090;
}

.ui-fileupload-files img {
  border: none;
}

.ui-fileupload-files {
  display: table;
}

.ui-fileupload-row {
  display: table-row;
}

.ui-fileupload-row > div {
  display: table-cell;
  padding: .5em 1em;
  vertical-align: middle;
}

.ui-fileupload-content .ui-progressbar {
  width: 100%;
  position: absolute;
  top: 1px;
  left: 0;
  height: .25em;
  border: 0 none;
}

.ui-fileupload-content .ui-progressbar-value {
  -moz-border-radius: 0;
  -webkit-border-radius: 0;
  border-radius: 0;
  border: 0 none;
}

/* Simple */
.ui-fileupload-choose {
  position: relative;
  overflow: hidden;
}

.ui-fileupload-choose input[type=file] {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  opacity: 0;
  min-height: 100%;
  font-size: 100px;
  text-align: right;
  filter: alpha(opacity=0);
  direction: ltr;
  cursor: pointer;
}

.ui-fileupload-choose.ui-fileupload-choose-selected input[type=file] {
  display: none;
}

/* ui-fluid */
.ui-fluid .ui-fileupload .ui-button {
  width: auto;
}

.ui-fluid .ui-fileupload-content .ui-button-icon-only {
  width: 2em;
}




.ui-galleria { 
  overflow: hidden; 
  visibility: hidden; 
  position: relative;
}

.ui-galleria-panel-wrapper {
  position: relative;
  padding: 0;
  margin: 0;
}

.ui-galleria-panel {
  filter: inherit;
  position: absolute;
  top: 0;
  left: 0;
  list-style-type: none;
}

.ui-galleria-filmstrip-wrapper {
  overflow: hidden;
  margin: .25em auto;
  position: relative;
}

.ui-galleria-filmstrip { 
  list-style: none outside none;
  margin: 0;
  padding: 0;
  width: 2340px;
  z-index: 900;
  position: absolute;
  top: 0;
  left: 0;
}

.ui-galleria-frame {
  float:left;
  margin-right: 5px;
  opacity: 0.3;
  cursor: pointer;
}

.ui-galleria-frame-active {
  opacity: 1;
}

.ui-galleria-frame-content {
  overflow: hidden;
}

.ui-galleria-nav-next, .ui-galleria-nav-prev {
cursor: pointer;
  position: absolute;
}

.ui-galleria-nav-prev {	
  left: 5px;
}

.ui-galleria-nav-next {
  right: 5px;
}

.ui-galleria-caption {
  position: absolute;
  left:1px;
  background-color: rgba(0,0,0,0.5);
  display: none;
  color: #ededed;
  padding: 0.2em 1em;
}

.ui-galleria-caption h4 {
  color: #ededed;
}

.ui-galleria-panel-content {
  padding: 1em 1.4em;
}
/* Deprecated Grid CSS */
.ui-grid {
  clear: both;
  padding: 0;
  margin: 0;
}

.ui-grid:before,
.ui-grid:after {
  content:"";
  display:table;
}

.ui-grid:after {
  clear:both;
}

.ui-grid .ui-grid-row {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  clear:both;
  border: 1px solid;
  margin-top: -1;
}

.ui-grid-row:after {
  clear: both;
  content: "";
  display: table;
}

.ui-grid-col-1,
.ui-grid-col-2,
.ui-grid-col-3,
.ui-grid-col-4,
.ui-grid-col-5,
.ui-grid-col-6,
.ui-grid-col-7,
.ui-grid-col-8,
.ui-grid-col-9,
.ui-grid-col-10,
.ui-grid-col-11,
.ui-grid-col-12 {
  float: left;
  box-sizing: border-box;
}

.ui-grid-col-1 {
  width: 8.33333%;
}

.ui-grid-col-2 {
  width: 16.66666%;
}

.ui-grid-col-3 {
  width: 25%;
}

.ui-grid-col-4 {
  width: 33.33333%;
}

.ui-grid-col-5 {
  width: 41.66666%;
}

.ui-grid-col-6 {
  width: 50%;
}

.ui-grid-col-7 {
  width: 58.33333%;
}

.ui-grid-col-8 {
  width: 66.66666%;
}

.ui-grid-col-9 {
  width: 75%;
}

.ui-grid-col-10 {
  width: 83.33333%;
}

.ui-grid-col-11 {
  width: 91.66666%;
}

.ui-grid-col-12 {
  width: 100%;
}

@media (min-width: 480px) {
  .ui-grid-fixed {
      width: 480px;
  }
}

@media (min-width: 768px) {
  .ui-grid-fixed {
      width: 768px;
  }
}

@media (min-width: 960px) {
  .ui-grid-fixed {
      width: 960px;
  }
}

@media (min-width: 1024px) {
  .ui-grid-fixed {
      width: 1024px;
  }
}

/* Responsive */
@media (max-width: 640px) {
  .ui-grid-responsive .ui-grid-row {
      display: block;
  }
  
  .ui-grid-responsive .ui-grid-col-1,
  .ui-grid-responsive .ui-grid-col-2,
  .ui-grid-responsive .ui-grid-col-3,
  .ui-grid-responsive .ui-grid-col-4,
  .ui-grid-responsive .ui-grid-col-5,
  .ui-grid-responsive .ui-grid-col-6,
  .ui-grid-responsive .ui-grid-col-7,
  .ui-grid-responsive .ui-grid-col-8,
  .ui-grid-responsive .ui-grid-col-9,
  .ui-grid-responsive .ui-grid-col-10,
  .ui-grid-responsive .ui-grid-col-11,
  .ui-grid-responsive .ui-grid-col-12 {
      width: 100%;
      float: none;
  }
}

.ui-grid.ui-grid-pad > .ui-grid-row > div {
  padding: .25em .5em;
}

/* Responsive */
@media (max-width: 640px) {
  .ui-grid-responsive .ui-grid-row {
      display: block;
  }
  
  .ui-grid-responsive .ui-grid-col-1,
  .ui-grid-responsive .ui-grid-col-2,
  .ui-grid-responsive .ui-grid-col-3,
  .ui-grid-responsive .ui-grid-col-4,
  .ui-grid-responsive .ui-grid-col-5,
  .ui-grid-responsive .ui-grid-col-6,
  .ui-grid-responsive .ui-grid-col-7,
  .ui-grid-responsive .ui-grid-col-8,
  .ui-grid-responsive .ui-grid-col-9,
  .ui-grid-responsive .ui-grid-col-10,
  .ui-grid-responsive .ui-grid-col-11,
  .ui-grid-responsive .ui-grid-col-12 {
      width: 100%;
      float: none;
  }
}

/* New Grid CSS */
.ui-g {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
}
          
.ui-g:after {
  clear: both;
  content: "";
  display: table;
}
          
.ui-g-1,
.ui-g-2,
.ui-g-3,
.ui-g-4,
.ui-g-5,
.ui-g-6,
.ui-g-7,
.ui-g-8,
.ui-g-9,
.ui-g-10,
.ui-g-11,
.ui-g-12 {
  float: left;
  box-sizing: border-box;
  padding: 0.5em;
}

.ui-g-1 {
  width: 8.3333%;
}

.ui-g-2 {
  width: 16.6667%;
}

.ui-g-3 {
  width: 25%;
}

.ui-g-4 {
  width: 33.3333%;
}

.ui-g-5 {
  width: 41.6667%;
}

.ui-g-6 {
  width: 50%;
}

.ui-g-7 {
  width: 58.3333%;
}

.ui-g-8 {
  width: 66.6667%;
}

.ui-g-9 {
  width: 75%;
}

.ui-g-10 {
  width: 83.3333%;
}

.ui-g-11 {
  width: 91.6667%;
}

.ui-g-12 {
  width: 100%;
}

.ui-g-offset-12 {
margin-left: 100%;
}

.ui-g-offset-11 {
margin-left: 91.66666667%;
}

.ui-g-offset-10 {
margin-left: 83.33333333%;
}

.ui-g-offset-9 {
margin-left: 75%;
}

.ui-g-offset-8 {
margin-left: 66.66666667%;
}

.ui-g-offset-7 {
margin-left: 58.33333333%;
}

.ui-g-offset-6 {
margin-left: 50%;
}

.ui-g-offset-5 {
margin-left: 41.66666667%;
}

.ui-g-offset-4 {
margin-left: 33.33333333%;
}

.ui-g-offset-3 {
margin-left: 25%;
}

.ui-g-offset-2 {
margin-left: 16.66666667%;
}

.ui-g-offset-1 {
margin-left: 8.33333333%;
}

.ui-g-offset-0 {
margin-left: 0%;
}

@media screen and (max-width: 40em) {
  .ui-sm-1,
  .ui-sm-2,
  .ui-sm-3,
  .ui-sm-4,
  .ui-sm-5,
  .ui-sm-6,
  .ui-sm-7,
  .ui-sm-8,
  .ui-sm-9,
  .ui-sm-10,
  .ui-sm-11,
  .ui-sm-12 {
      padding: 0.5em;
  }

  .ui-sm-1 {
      width: 8.3333%;
  }

  .ui-sm-2 {
      width: 16.6667%;
  }

  .ui-sm-3 {
      width: 25%;
  }

  .ui-sm-4 {
      width: 33.3333%;
  }

  .ui-sm-5 {
      width: 41.6667%;
  }

  .ui-sm-6 {
      width: 50%;
  }

  .ui-sm-7 {
      width: 58.3333%;
  }

  .ui-sm-8 {
      width: 66.6667%;
  }

  .ui-sm-9 {
      width: 75%;
  }

  .ui-sm-10 {
      width: 83.3333%;
  }

  .ui-sm-11 {
      width: 91.6667%;
  }

  .ui-sm-12 {
      width: 100%;
  }
  
  .ui-sm-offset-12 {
    margin-left: 100%;
  }

  .ui-sm-offset-11 {
    margin-left: 91.66666667%;
  }

  .ui-sm-offset-10 {
    margin-left: 83.33333333%;
  }

  .ui-sm-offset-9 {
    margin-left: 75%;
  }

  .ui-sm-offset-8 {
    margin-left: 66.66666667%;
  }

  .ui-sm-offset-7 {
    margin-left: 58.33333333%;
  }

  .ui-sm-offset-6 {
    margin-left: 50%;
  }

  .ui-sm-offset-5 {
    margin-left: 41.66666667%;
  }

  .ui-sm-offset-4 {
    margin-left: 33.33333333%;
  }

  .ui-sm-offset-3 {
    margin-left: 25%;
  }

  .ui-sm-offset-2 {
    margin-left: 16.66666667%;
  }

  .ui-sm-offset-1 {
    margin-left: 8.33333333%;
  }

  .ui-sm-offset-0 {
    margin-left: 0%;
  }
}

@media screen and (min-width: 40.063em) {
  .ui-md-1,
  .ui-md-2,
  .ui-md-3,
  .ui-md-4,
  .ui-md-5,
  .ui-md-6,
  .ui-md-7,
  .ui-md-8,
  .ui-md-9,
  .ui-md-10,
  .ui-md-11,
  .ui-md-12 {
      padding: 0.5em;
  }

  .ui-md-1 {
      width: 8.3333%;
  }

  .ui-md-2 {
      width: 16.6667%;
  }

  .ui-md-3 {
      width: 25%;
  }

  .ui-md-4 {
      width: 33.3333%;
  }

  .ui-md-5 {
      width: 41.6667%;
  }

  .ui-md-6 {
      width: 50%;
  }

  .ui-md-7 {
      width: 58.3333%;
  }

  .ui-md-8 {
      width: 66.6667%;
  }

  .ui-md-9 {
      width: 75%;
  }

  .ui-md-10 {
      width: 83.3333%;
  }

  .ui-md-11 {
      width: 91.6667%;
  }

  .ui-md-12 {
      width: 100%;
  }
  
  .ui-md-offset-12 {
    margin-left: 100%;
  }

  .ui-md-offset-11 {
    margin-left: 91.66666667%;
  }

  .ui-md-offset-10 {
    margin-left: 83.33333333%;
  }

  .ui-md-offset-9 {
    margin-left: 75%;
  }

  .ui-md-offset-8 {
    margin-left: 66.66666667%;
  }

  .ui-md-offset-7 {
    margin-left: 58.33333333%;
  }

  .ui-md-offset-6 {
    margin-left: 50%;
  }

  .ui-md-offset-5 {
    margin-left: 41.66666667%;
  }

  .ui-md-offset-4 {
    margin-left: 33.33333333%;
  }

  .ui-md-offset-3 {
    margin-left: 25%;
  }

  .ui-md-offset-2 {
    margin-left: 16.66666667%;
  }

  .ui-md-offset-1 {
    margin-left: 8.33333333%;
  }

  .ui-md-offset-0 {
    margin-left: 0%;
  }
}

@media screen and (min-width: 64.063em) {
  .ui-lg-1,
  .ui-lg-2,
  .ui-lg-3,
  .ui-lg-4,
  .ui-lg-5,
  .ui-lg-6,
  .ui-lg-7,
  .ui-lg-8,
  .ui-lg-9,
  .ui-lg-10,
  .ui-lg-11,
  .ui-lg-12 {
      padding: 0.5em;
  }

  .ui-lg-1 {
      width: 8.3333%;
  }

  .ui-lg-2 {
      width: 16.6667%;
  }

  .ui-lg-3 {
      width: 25%;
  }

  .ui-lg-4 {
      width: 33.3333%;
  }

  .ui-lg-5 {
      width: 41.6667%;
  }

  .ui-lg-6 {
      width: 50%;
  }

  .ui-lg-7 {
      width: 58.3333%;
  }

  .ui-lg-8 {
      width: 66.6667%;
  }

  .ui-lg-9 {
      width: 75%;
  }

  .ui-lg-10 {
      width: 83.3333%;
  }

  .ui-lg-11 {
      width: 91.6667%;
  }

  .ui-lg-12 {
      width: 100%;
  }
  
  .ui-lg-offset-12 {
    margin-left: 100%;
  }

  .ui-lg-offset-11 {
    margin-left: 91.66666667%;
  }

  .ui-lg-offset-10 {
    margin-left: 83.33333333%;
  }

  .ui-lg-offset-9 {
    margin-left: 75%;
  }

  .ui-lg-offset-8 {
    margin-left: 66.66666667%;
  }

  .ui-lg-offset-7 {
    margin-left: 58.33333333%;
  }

  .ui-lg-offset-6 {
    margin-left: 50%;
  }

  .ui-lg-offset-5 {
    margin-left: 41.66666667%;
  }

  .ui-lg-offset-4 {
    margin-left: 33.33333333%;
  }

  .ui-lg-offset-3 {
    margin-left: 25%;
  }

  .ui-lg-offset-2 {
    margin-left: 16.66666667%;
  }

  .ui-lg-offset-1 {
    margin-left: 8.33333333%;
  }

  .ui-lg-offset-0 {
    margin-left: 0%;
  }
}

@media screen and (min-width: 90.063em) {
  .ui-xl-1,
  .ui-xl-2,
  .ui-xl-3,
  .ui-xl-4,
  .ui-xl-5,
  .ui-xl-6,
  .ui-xl-7,
  .ui-xl-8,
  .ui-xl-9,
  .ui-xl-10,
  .ui-xl-11,
  .ui-xl-12 {
      padding: 0.5em;
  }

  .ui-xl-1 {
      width: 8.3333%;
  }

  .ui-xl-2 {
      width: 16.6667%;
  }

  .ui-xl-3 {
      width: 25%;
  }

  .ui-xl-4 {
      width: 33.3333%;
  }

  .ui-xl-5 {
      width: 41.6667%;
  }

  .ui-xl-6 {
      width: 50%;
  }

  .ui-xl-7 {
      width: 58.3333%;
  }

  .ui-xl-8 {
      width: 66.6667%;
  }

  .ui-xl-9 {
      width: 75%;
  }

  .ui-xl-10 {
      width: 83.3333%;
  }

  .ui-xl-11 {
      width: 91.6667%;
  }

  .ui-xl-12 {
      width: 100%;
  }
  
  .ui-xl-offset-12 {
    margin-left: 100%;
  }

  .ui-xl-offset-11 {
    margin-left: 91.66666667%;
  }

  .ui-xl-offset-10 {
    margin-left: 83.33333333%;
  }

  .ui-xl-offset-9 {
    margin-left: 75%;
  }

  .ui-xl-offset-8 {
    margin-left: 66.66666667%;
  }

  .ui-xl-offset-7 {
    margin-left: 58.33333333%;
  }

  .ui-xl-offset-6 {
    margin-left: 50%;
  }

  .ui-xl-offset-5 {
    margin-left: 41.66666667%;
  }

  .ui-xl-offset-4 {
    margin-left: 33.33333333%;
  }

  .ui-xl-offset-3 {
    margin-left: 25%;
  }

  .ui-xl-offset-2 {
    margin-left: 16.66666667%;
  }

  .ui-xl-offset-1 {
    margin-left: 8.33333333%;
  }

  .ui-xl-offset-0 {
    margin-left: 0%;
  }
}

.ui-g-nopad {
  padding: 0;
}

.ui-growl {
position:fixed;
top: 20px;
right: 20px;
width: 20em;
}

.ui-growl-item-container {
position:relative;
margin:0 0 10px 0;
opacity:0.95;
filter:alpha(opacity=95);
}

.ui-growl-item {
  position: relative;
display: block;
padding: .5em 1em;
}

.ui-growl-item p {
padding: 0;
margin: 0;
}

.ui-growl-icon-close {
position: absolute;
top: 4px;
right: 4px;
cursor: pointer;
}

.ui-growl-title {
font-weight: bold;
padding: 0 0 .5em 0;
display: block;
}

.ui-growl-image {
  position: absolute;
  display: inline-block;
  left: .5em;
  top: .25em;
  padding: 0;
}

.ui-growl-message {
padding: 0 0 .25em 0;
  margin-left: 2.5em;
}

.ui-growl-message p {
font-weight: normal;
}
.ui-inplace .ui-inplace-display {
  display: inline;
  cursor: pointer;
  border: 0 none;
  padding: .25em;
  font-weight: normal;
}

.ui-inplace .ui-inplace-content {
  display: inline;
}
.ui-inputswitch {
display: inline-block;
padding: 0;
position: relative;
overflow: hidden;
cursor: pointer;
user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  height: 1.5em;
}

.ui-inputswitch .ui-inputswitch-on,
.ui-inputswitch .ui-inputswitch-off {
white-space: nowrap;
  display: inline-block;
  position: absolute;
top: 0;
  width: auto;
  overflow: hidden;
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
font-weight: bold;
height: 100%;
  line-height: 1.5em;
}

.ui-inputswitch .ui-inputswitch-on {
left: 0;
  border: 0 none;
}

.ui-inputswitch .ui-inputswitch-off {
right: 0;
  text-align: right;
}

.ui-inputswitch .ui-inputswitch-on span,
.ui-inputswitch .ui-inputswitch-off span {
display: inline-block;
text-align: center;
height: 100%;
  line-height: inherit;
}

.ui-inputswitch .ui-inputswitch-handle {
display: block;
width: 0;
position: absolute;
top: 0;
left: 0;
  height: 100%;
  border-top: 0 none;
  border-bottom: 0 none;
}
.ui-inputtext {
  margin: 0;
  outline: medium none;
  padding: .25em;
  font-weight: normal;
}

.ui-widget-header .ui-inputtext,
.ui-widget-content .ui-inputtext {
  font-weight: normal;
}

.ui-fluid .ui-inputtext {
  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing:border-box;
  -moz-box-sizing: border-box;
}

.ui-inputgroup {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}

.ui-inputgroup .ui-inputgroup-addon {
  display: inline-block;
  text-align: center;
  min-width: 1.5em;
  padding: .25em;
  border-width: 1px;
  border-style: solid;
}

.ui-inputgroup .ui-inputgroup-addon + .ui-inputgroup-addon {
  border-left: 0 none;
}

.ui-inputgroup .ui-inputtext {
  padding-left: .5em;
}

.ui-inputgroup .ui-inputtext:not(:first-child) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: 0 none;
}

.ui-inputgroup .ui-inputtext:not(:last-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 0 none;
}

.ui-inputgroup .ui-button {
  margin-right: 0;
  border-radius: 0;
}

.ui-fluid .ui-inputgroup .ui-button {
  width: auto;
}

.ui-fluid .ui-inputgroup .ui-inputtext {
  -webkit-box-flex: 1;
  -webkit-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
}

.ui-inputgroup .ui-chkbox, 
.ui-inputgroup .ui-radiobutton {
  margin-right: 0;
  vertical-align: bottom;
}

/* Floating Label */
.ui-float-label {
  display: block;
  position:relative; 
}

.ui-float-label label {
font-weight:normal;
position:absolute;
pointer-events:none;
left: .25em;
top: 50%;
margin-top: -.5em;
transition: 0.3s ease all; 
-moz-transition: 0.3s ease all; 
-webkit-transition: 0.3s ease all;
color: #898989;
line-height: 1;
}
  
.ui-float-label input:focus ~ label,
.ui-float-label input.ui-state-filled ~ label,
.ui-float-label .ui-inputwrapper-focus ~ label,
.ui-float-label .ui-inputwrapper-filled ~ label {
top:-.75em;
font-size:12px;
}

.ui-float-label .input:-webkit-autofill ~ label {
top:-20px;
font-size:12px;
}
.ui-inputtextarea-resizable {
  overflow: hidden;
  resize:none;
}

.ui-fluid .ui-inputtextarea {
  width: 100%;
}

.ui-float-label textarea:focus ~ label,
.ui-float-label textarea.ui-state-filled ~ label,
.ui-float-label textarea:-webkit-autofill ~ label {
top:-.75em;
font-size:12px;
}
.ui-lightbox {
  position: fixed;
  display: none;
}

.ui-lightbox-content-wrapper {
  position: relative;
}

.ui-lightbox-content {
  position: relative;
  margin: 0;
  padding: 0;
  background-color: #000000;
}

.ui-lightbox-nav-right, .ui-lightbox-nav-left {
 position: absolute;
 top: 50%;
 cursor: pointer;
}

.ui-lightbox-nav-left {
 left: 0;
}

.ui-lightbox-nav-right {
 right: 0;
}

.ui-lightbox-loading .ui-lightbox-content {
  background: url("./images/loading.gif") #000000 center center no-repeat;
}

.ui-lightbox-caption {
  padding: 0.2em 0.4em;
  display: none;
}

.ui-lightbox-caption-text {
  margin: 0.3em 0 0.1em 0;
  float:left;
}

.ui-lightbox-close {
  float:right;
  margin: 0;
  padding: .125em;
}

.ui-lightbox-close.ui-state-hover {
  padding: 0;
}

.ui-lightbox-nav-left, .ui-lightbox-nav-right {
  opacity: .5;
}

.ui-lightbox-nav-left:hover, .ui-lightbox-nav-right:hover{
  opacity: 1;
}
.ui-listbox {
  padding: .25em;
  width: 10em;
}

.ui-listbox .ui-listbox-list-wrapper {
  overflow:auto;
}

.ui-listbox .ui-listbox-list {
  list-style-type: none; 
  margin: 0;
  padding: 0;
}

.ui-listbox .ui-listbox-item {
  padding: .25em;
  border: 0 none;
  cursor: pointer;
  font-weight: normal;
  margin-bottom: 1px;
}

.ui-listbox .ui-listbox-item > span {
  vertical-align: middle;
}

.ui-listbox .ui-listbox-item:last-child {
  margin-bottom: 0;
}

.ui-listbox.ui-state-disabled .ui-listbox-item {
  cursor: default;
}

.ui-listbox-header {
  margin-bottom: 0.3em;
  padding: .125em .2em;
  position: relative;
}

.ui-listbox-header .ui-chkbox {
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}

.ui-listbox-header .ui-listbox-filter-container {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: 100%;
}

.ui-listbox-header.ui-listbox-header-w-checkbox .ui-listbox-filter-container {
  width: calc(100% - 2em);
}

.ui-listbox-header .ui-listbox-filter-container .fa {
  position: absolute;
  top: .25em;
  left: .25em;
}

.ui-listbox-header .ui-inputtext {
  padding: .125em .125em .125em 1.25em;
  width: 100%;
}

.ui-listbox-footer {
  padding: .125em .2em;
}
.ui-menu {
  width: 12.5em;
  padding: .25em;
  position:relative;
}

.ui-menu-separator {
  border-width: 1px 0 0 0;
}

.ui-menu.ui-menu-dynamic {
  position: absolute;
  display: none;
  z-index: 100000;
}

.ui-menu-list {
  position: static;
}

.ui-menu .ui-menu-list .ui-menuitem {
  border: none;
}

.ui-menu .ui-menu-list .ui-widget-header {
  clear:both;
  float:left;
  width: 100%;
  margin: .125em 0;
  padding: .25em .5em;
}

.ui-menu .ui-menuitem-parent,
.ui-menu .ui-menuitem {
  width: 100%;
  clear: both;
  margin: .125em 0;
  padding: 0;
}

.ui-menu .ui-menuitem-link {
  display: block;
  width: 100%;
  text-decoration: none;
  font-weight: normal;
  border: 1px solid transparent;
  line-height: 1em;
  padding: .25em;
  cursor: pointer;
}

.ui-menu .ui-menuitem-link .ui-menuitem-icon {
  display: inline-block;
  vertical-align: middle;
}

.ui-menu .ui-menuitem-text {
  vertical-align: middle;
}

.ui-menu .ui-widget-header h1,
.ui-menu .ui-widget-header h2,
.ui-menu .ui-widget-header h3,
.ui-menu .ui-widget-header h4,
.ui-menu .ui-widget-header h5,
.ui-menu .ui-widget-header h6 {
  font-size: 1em;
  margin: 0 auto;
}

/* Tiered Menu */
.ui-menu .ui-menu-parent .ui-menu-child {
  display: none;
  width: 12.5em;
  padding: .25em;
  position:absolute;
  margin: 0; 
  text-decoration:none;
  list-style:none;
}

.ui-menu .ui-menu-parent {
  position: relative;
}

.ui-menu .ui-menu-parent .ui-submenu-icon {
  float: right;
  margin-right: -.25em;
}

/** MenuButton **/
.ui-menubutton {
  padding: 0;
}

.ui-menubutton .ui-button {
  margin: 0;
}

/** Menubar **/
.ui-menu.ui-menubar .ui-menubar-root-list > li > a > .ui-submenu-icon {
  float: none;
}

.ui-menubar {
  width:auto;
}

.ui-menubar .ui-menubar-root-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ui-menubar .ui-menubar-root-list > .ui-menuitem {
  display: inline-block;
  width: auto;
}

.ui-menubar:not(.ui-megamenu-vertical) .ui-menubar-root-list > .ui-menu-separator {
  display: inline-block;
  border-width: 0 0 0 1px;
  width: 1px;
  text-indent: -9999999px;
}

.ui-menubar:not(.ui-megamenu-vertical) .ui-menubar-root-list > .ui-menu-separator:before {
  content: 'ui-menu-separator';
}

.ui-menubar .ui-menu-child .ui-menuitem {
  width: 100%;
}

.ui-menubar .ui-menuitem.ui-menuitem-custom {
  float: right;
  margin-top: 0.25em;
}

.ui-menubar .ui-menubar-options {
  float: right;
}
         
/** SlideMenu **/
.ui-slidemenu .ui-slidemenu-wrapper {
  position: relative;
}

.ui-slidemenu .ui-slidemenu-content {
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
}

.ui-slidemenu .ui-menu-list {
  position: absolute;
  top: 0;
}

.ui-slidemenu .ui-menu-parent {
  position: static;
}

.ui-slidemenu .ui-menu-child {
  box-shadow : none;
  border: 0 none;
  background: none repeat scroll 0 0 transparent;
}

.ui-slidemenu-backward {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0.2em;
  cursor: pointer;
  display: none;
}

.ui-slidemenu-backward .fa {
  vertical-align: middle;
}

.ui-slidemenu-backward span {
  vertical-align: middle;
}

.ui-slidemenu .ui-slidemenuitem-active > .ui-submenu > ul {
  display: block !important;
}

/** MegaMenu **/
.ui-megamenu .ui-g {
  flex-wrap: nowrap;
}

.ui-megamenu .ui-megamenu-panel.ui-menu-child {
  width: auto;
}

.ui-megamenu .ui-megamenu-panel .ui-menu-list {
  width: 12.5em;
}

.ui-megamenu-vertical {
  width: 12.5em;
}

.ui-megamenu-vertical .ui-menuitem-link,
.ui-megamenu-vertical .ui-menu-list .ui-menuitem {
  width: 100%;
  box-sizing: border-box;
}

.ui-megamenu-vertical > .ui-menubar-root-list > .ui-menuitem > .ui-menuitem-link > .ui-submenu-icon {
  float: right;
}

/** PanelMenu **/
.ui-panelmenu {
  width: auto;
}

.ui-panelmenu .ui-panelmenu-panel {
  padding: 0;
  margin: 0;
}

.ui-panelmenu .ui-panelmenu-header {
  cursor: pointer;
  position: relative;
  margin: -1px 0 0 0;
  zoom: 1;
}

.ui-panelmenu .ui-panelmenu-header a {
  display: block;
  padding: .25em .5em;
  text-decoration: none;
}

.ui-panelmenu span {
  vertical-align: middle;
}

.ui-panelmenu .fa {
  width: 1em;
  text-align: center;
  vertical-align: middle;
  margin-right: .25em;
}

.ui-panelmenu .ui-menuitem-text {
  margin-left: .125em;
}

.ui-panelmenu span {
  vertical-align: middle;
}

.ui-panelmenu .ui-panelmenu-content {
  padding: 0.2em 0;
  border-top: 0;
  overflow: auto;
  zoom: 1;
  outline: none;
  margin-bottom: 1px;
}

.ui-panelmenu .ui-panelmenu-content .ui-menu-parent {
  overflow: hidden;
}

.ui-panelmenu .ui-panelmenu-content-wrapper {
  box-sizing: border-box;
}

.ui-panelmenu .ui-panelmenu-content-wrapper-overflown {
  overflow: hidden;
}

.ui-panelmenu .ui-panelmenu-header.ui-state-disabled,
.ui-panelmenu .ui-panelmenu-header.ui-state-disabled a {
  cursor: default;
}

.ui-panelmenu .ui-menu-list {
  position: static;
}

.ui-panelmenu .ui-menuitem {
  margin: 1px 0;
  padding: 0;
}

.ui-panelmenu .ui-menu-separator {
  width: 95%;
  margin: 0 auto;
}

.ui-panelmenu .ui-menuitem-link {
  display: block;
  text-decoration: none;
  font-weight: normal;
  border: 1px solid  transparent;
  line-height: 1em;
  cursor: pointer;
  position: relative;
  padding: .25em .5em;
}

.ui-panelmenu .ui-menu-parent .ui-menu-list {
  margin-left: 1.5em;
}

/** MegaMenu and TieredMenus **/
.ui-menuitem-active > .ui-submenu > ul,
.ui-menuitem-active > .ui-megamenu-panel {
  display: block !important;
}

.ui-menuitem-outline {
  outline: 1px dotted;
  z-index: 1;
}

/** Fluid **/
.ui-fluid .ui-menu:not(.ui-menu-dynamic) {
  width: 100%;
}
.ui-message {
  border: 1px solid;
  margin: 0px .25em;
  padding: .25em .5em;
  display: inline-block;
}

.ui-fluid .ui-message {
  display: block;
}
.ui-messages {
  border: 1px solid;
  margin: .5em 0;
  padding: 1em 1em 1em .5em;
  display: none;
  position: relative;
}

.ui-messages-icon {
  display:inline-block;
  padding: 0;
  vertical-align: middle;
}

.ui-messages-summary {
  font-weight: bold;
  margin-left: .25em;
}

.ui-messages-detail {
  margin-left: .25em;
}

.ui-messages-success {
  color: #2C832f;
  background-color: #B4F0B6;
  border-color: #B4F0B6;
}

.ui-messages-success .ui-messages-close {
  color: #2C832f;
}

.ui-messages-info {
  color: #1765A3;
  background-color: #BFE0FA;
  border-color: #BFE0FA;
}

.ui-messages-info .ui-messages-close {
  color: #1765A3;
}

.ui-messages-warn {
  color: #8A6714;
  background-color: #FFE9B5;
  border-color: #FFE9B5;
}

.ui-messages-warn .ui-messages-close {
  color: #8A6714;
}

.ui-messages-error {
  color: #AB1A0F;
  background-color: #FFCBC8;
  border-color: #FFCBC8;
}

.ui-messages-error .ui-messages-close {
  color: #AB1A0F;
}

.ui-messages ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: inline-block;
  vertical-align: middle;
}

.ui-messages.ui-messages-noicon ul {
  margin: 0 1.5em 0 0;
}

.ui-messages .ui-messages-close {
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
}
.ui-multiselect {
  display: inline-block;
  position: relative;
  width: auto;
  cursor: pointer;
}

.ui-multiselect .ui-multiselect-trigger {
  border-right: none;
  border-top: none;
  border-bottom: none;
  cursor: pointer;
  width: 1.5em;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  padding: 0 .25em;
}

.ui-multiselect .ui-multiselect-trigger  .fa {
  margin-top: .4em;
  margin-left: -.125em;
}

.ui-multiselect .ui-multiselect-label-container  {
  overflow: hidden;
}

.ui-multiselect .ui-multiselect-label  {
  display: block;
  padding: .25em 2em .25em .25em;
  width: auto;
  border: none;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
}

.ui-multiselect.ui-state-disabled .ui-multiselect-trigger,
.ui-multiselect.ui-state-disabled .ui-multiselect-label {
  cursor: auto
}

.ui-multiselect-panel {
  padding: 0.2em;
  position: absolute;
  min-width: 12em;
}

.ui-multiselect .ui-multiselect-panel {
  min-width: 100%;
  display: none;
}

.ui-multiselect-panel .ui-multiselect-items-wrapper {
  overflow: auto;
  position: relative;
  padding: 0.2em 0;
}

.ui-multiselect-panel .ui-multiselect-list {
  border: 0 none;
}

.ui-multiselect-panel .ui-multiselect-item {
  border: 0 none;
  cursor: pointer;
  font-weight: normal;
  margin: 1px 0;
  padding: .125em .25em;
  text-align: left;
  white-space: nowrap;
  display: block;
  position: relative;
}

.ui-multiselect-panel .ui-multiselect-item .ui-chkbox {
  display: inline-block;
  vertical-align: middle;
}

.ui-multiselect-panel .ui-multiselect-item label {
  display: inline-block;
  vertical-align: middle;
}

.ui-multiselect-header {
  margin-bottom: 0.3em;
  padding: .25em;
  position: relative;
  text-align: left;
}

.ui-multiselect-header .ui-chkbox {
  display: inline-block;
  vertical-align: middle;
  cursor:pointer;
}

.ui-multiselect-header .ui-multiselect-filter-container {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 65%;
}

.ui-multiselect-header.ui-multiselect-header-no-toggleall .ui-multiselect-filter-container {
  width: 85%;
}

.ui-multiselect-header .ui-multiselect-filter-container .fa {
  position: absolute;
  top: .25em;
  left: .125em;
}
          
.ui-multiselect-header .ui-inputtext {
  padding: .125em .125em .125em 1.25em;
  width: 100%;
}

.ui-multiselect-header .ui-multiselect-close {
  position: absolute;
  right: .375em;
  top: .375em;
  display: block;
  font-size: 1em;
  border: 0 none;
}

.ui-multiselect-header a.ui-multiselect-all,
.ui-multiselect-header a.ui-multiselect-none {
  float:left;
  margin-right: 10px;
  display: block;
}

.ui-multiselect-header .ui-multiselect-close.ui-state-hover {
  padding:0px;
}

.ui-fluid .ui-multiselect {
  width: 100%;
  box-sizing: border-box;
}

.ui-orderlist {
  display: table;
}

.ui-orderlist .ui-orderlist-controls {
  height: 12.5em;
  padding: 0 .25em;
  vertical-align: middle;
  display: table-cell;
}

.ui-orderlist .ui-orderlist-controls .ui-button {
  display: block;
  margin-bottom: 0.25em;
}

.ui-orderlist .ui-orderlist-container {
  display: table-cell;
  vertical-align: top;
}

.ui-orderlist .ui-orderlist-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow:auto;
  height: 12.5em;
  width: 12.5em;
}

.ui-orderlist .ui-orderlist-caption {
  text-align: center;
padding: .5em .75em;
  border-bottom: 0 none;
}

.ui-orderlist .ui-orderlist-list .ui-orderlist-item {
  margin: 1px;
  padding: .125em;
  cursor: pointer;
  border: 0 none;
  font-weight: inherit;
}

.ui-orderlist .ui-orderlist-filter-container {
  position: relative;
  width: 100%;
  padding: .5em .6em;
  border-bottom: 0 none;
}

.ui-orderlist .ui-orderlist-filter-container .ui-inputtext {
  text-indent: 1.1em;
  width: 100%;
}

.ui-orderlist .ui-orderlist-filter-container .fa {
  position: absolute;
  top: 50%;
  left: 1em;
  margin-top: -.6em;
}

.ui-orderlist.ui-state-disabled .ui-orderlist-item,
.ui-orderlist.ui-state-disabled .ui-button {
  cursor: default;
}

.ui-orderlist.ui-state-disabled .ui-orderlist-list {
  overflow:hidden;
}

/* Responsive */
.ui-orderlist.ui-orderlist-responsive {
  width: 100%;
}

.ui-orderlist.ui-orderlist-responsive .ui-orderlist-controls {
  width: 16.66666%;
  padding-right: .5em;
}

.ui-orderlist.ui-orderlist-responsive .ui-orderlist-list-container {
  width: 83.33333%;
}

.ui-orderlist.ui-orderlist-responsive .ui-orderlist-list,
.ui-orderlist.ui-orderlist-responsive .ui-orderlist-caption {
  width: 100%;
}  

.ui-orderlist.ui-orderlist-responsive .ui-orderlist-controls > .ui-button {
  width: 100%;
}

.ui-orderlist .ui-orderlist-droppoint {
  height: 6px;
  list-style-type: none;
}

@media (max-width: 40em) {
  .ui-orderlist.ui-orderlist-responsive .ui-orderlist-controls {
      text-align: center;
      width: 100%;
      display: inline-block;
      height: auto;
  }
  
  .ui-orderlist.ui-orderlist-responsive .ui-orderlist-controls .ui-button {
      display: inline;
      width: 20%;
      display: inline-block;
  }
  
  .ui-orderlist.ui-orderlist-responsive .ui-orderlist-list-container {
      width: 100%;
  }
}
.ui-organizationchart .ui-organizationchart-table {
  border-spacing: 0;
  border-collapse: separate;
}

.ui-organizationchart .ui-organizationchart-table > tr > td {
  text-align: center;
  vertical-align: top;
  padding: 0;
  padding: 0 .75em;
}

.ui-organizationchart .ui-organizationchart-node-content {
  padding: .5em .75em;
  display: inline-block;
  position: relative;
}

.ui-organizationchart .ui-organizationchart-node-content .ui-node-toggler {
  position: absolute;
  bottom: -9px;
  margin-left: -8px;
  z-index: 2;
  left: 50%;
}

.ui-organizationchart .ui-organizationchart-line-down {
  margin: 0 auto;
  height: 20px;
  width: 1px;
  float: none;
}

.ui-organizationchart .ui-organizationchart-line-right {
  float: none;
  border-radius: 0px;
}

.ui-organizationchart .ui-organizationchart-line-left {
  float: none;
  border-radius: 0;
}

.ui-organizationchart .ui-organizationchart-node-content.ui-organizationchart-selectable-node {
  cursor: pointer;
}

.ui-overlaypanel {
  padding: 0;
  margin: 0;
  position: absolute;
}

.ui-overlaypanel-content {
  padding: 0.5em 1em;
}

.ui-overlaypanel-close {
  position: absolute;
  top: -.5em;
  right: -.5em;
  -moz-border-radius: 100%;
  -webkit-border-radius: 100%;
  border-radius: 100%;
}
.ui-paginator {
  margin: 0;
  text-align: center;
  padding: .125em;
}

.ui-paginator .ui-paginator-top {
  border-bottom: 0 none;
}

.ui-paginator .ui-paginator-bottom {
  border-top:0 none;
}

.ui-paginator .ui-paginator-page,
.ui-paginator .ui-paginator-pages,
.ui-paginator .ui-paginator-next,
.ui-paginator .ui-paginator-last,
.ui-paginator .ui-paginator-first,
.ui-paginator .ui-paginator-prev,
.ui-paginator .ui-paginator-current {
display: inline-block;
padding: .125em .375em;
zoom: 1;
margin-left: .063em;
margin-right: .063em;
text-decoration: none;
  vertical-align: middle;
}

.ui-paginator .ui-paginator-page,
.ui-paginator .ui-paginator-next,
.ui-paginator .ui-paginator-last,
.ui-paginator .ui-paginator-first,
.ui-paginator .ui-paginator-prev{
  cursor: pointer;
}

.ui-paginator .ui-paginator-current,
.ui-paginator .ui-paginator-rpp-options {
margin-left: 1em;
margin-right: 1em;
  background-image: none;
}

.ui-paginator .ui-paginator-jtp-select option,
.ui-paginator .ui-paginator-rpp-options option {
  background-image: none;
  border: 0 none;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
}

.ui-paginator a.ui-state-disabled {
  outline: 0 none;
}

.ui-paginator .ui-dropdown {
  min-width: 4em;
  margin-left: .375em;
}
.ui-panel {
padding: 0.2em;
}

.ui-panel .ui-panel-titlebar {
padding: .5em .75em;
}

.ui-panel .ui-panel-titlebar-icon {
float: right;
  cursor: pointer;
}

.ui-panel .ui-panel-titlebar-icon {
margin-left: 0.2em;
  margin-top: -0.1em;
}

.ui-panel .ui-panel-content {
border: 0;
  background: none;
  padding: .5em .75em;
}

.ui-panel .ui-panel-footer {
border-width: 1px 0 0;
padding: .25em .5em;
text-align:left;
}

.ui-panel-content-wrapper-overflown {
  overflow: hidden;
}     
.ui-password-panel {
  padding: .25em .5em;
  width: 10em;
  margin-top: 2px;
}

.ui-password-panel .ui-password-meter { 
  height: 10px; 
  background:transparent url("./images/password-meter.png") no-repeat left top; 
  padding: 0;
  margin: 0;
}

.ui-password-info { 
  margin-top: .25em;
}

.ui-password-panel-overlay { 
  position: absolute; 
}
.ui-picklist > div {
  float: left;
}

.ui-picklist .ui-picklist-buttons {
  height: 12.5em;
  padding: 0 .25em;
}

.ui-picklist .ui-picklist-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow:auto;
  height: 12.5em;
  width: 12.5em;
}

.ui-picklist .ui-picklist-list li {
  margin: 1px;
  padding: .125em;
}

.ui-picklist .ui-button {
  display:block;
  margin-bottom: 0.25em;
}

.ui-picklist .ui-button-text-icon-left {
  width: 100%;
}

.ui-picklist .ui-picklist-item {
  cursor: pointer;
  border: 0 none;
  font-weight: inherit;
}

.ui-picklist .ui-picklist-caption {
  text-align: center;
padding: .5em .75em;
  border-bottom:0 none;
}

.ui-picklist table {
  width: 100%;
  border-collapse:collapse;
}

.ui-picklist .ui-picklist-filter-container {
  position: relative;
  width: 100%;
  padding: .5em .6em;
  border-bottom: 0 none;
}

.ui-picklist .ui-picklist-filter-container .ui-picklist-filter {
  text-indent: 1.1em;
  width: 100%;
}

.ui-picklist .ui-picklist-filter-container .fa {
  position: absolute;
  top: 50%;
  left: 1em;
  margin-top: -.6em;
}

.ui-picklist {
  display: table;
}

.ui-picklist > div {
  float: none;
  display: table-cell;
  vertical-align: top;
}

.ui-picklist .ui-picklist-buttons {
  vertical-align: middle;
}

/* Vertical */
.ui-picklist.ui-picklist-vertical {
  display: table;
}

.ui-picklist.ui-picklist-vertical > div {
  float: none;
  display: table-row;
  vertical-align: top;
}

.ui-picklist.ui-picklist-vertical .ui-picklist-buttons {
  text-align:center;
  height: auto;
}

.ui-picklist.ui-picklist-vertical .ui-picklist-buttons .ui-button {
  display: inline-block;
}

.ui-picklist.ui-picklist-vertical .ui-button {
  margin-top: 0.25em;
}

.ui-picklist-outline {
  outline: 1px dotted black;
  z-index: 1;
}

.ui-picklist .ui-picklist-droppoint {
  height: 6px;
  list-style-type: none;
}

.ui-picklist .ui-picklist-list .ui-picklist-droppoint-empty {
  height: 100%;
  list-style-type: none;
}

.ui-picklist-list.ui-picklist-source,
.ui-picklist-list.ui-picklist-target {
  outline: none;
}

/* Responsive */
.ui-picklist.ui-picklist-responsive * {
  box-sizing: border-box;
}

.ui-picklist.ui-picklist-responsive {
  width: 100%;
}

.ui-picklist.ui-picklist-responsive .ui-picklist-listwrapper {
  width: 35%;
}

.ui-picklist.ui-picklist-responsive .ui-picklist-listwrapper.ui-picklist-listwrapper-nocontrols {
  width: 45%;
}

.ui-picklist.ui-picklist-responsive .ui-picklist-buttons {
  width: 10%;
}

.ui-picklist.ui-picklist-responsive .ui-picklist-buttons button {
  width: 100%;
}

.ui-picklist.ui-picklist-responsive .ui-picklist-list {
  width: auto;
}
      
/* Responsive */
@media (max-width: 40em) {
  .ui-picklist.ui-picklist-responsive {
      display: block;
  }
  
  .ui-picklist.ui-picklist-responsive > div {
      display: block;
      width: 100% !important;
  }
  
  .ui-picklist.ui-picklist-responsive .ui-picklist-buttons {
      text-align: center;
      height: auto;
      padding: .4em 0;
  }
  
  .ui-picklist.ui-picklist-responsive .ui-picklist-buttons button {
      display: inline;
      width: 20%;
      margin-bottom: 0;
  }
  
  .ui-picklist.ui-picklist-responsive .ui-picklist-source-controls.ui-picklist-buttons {
      padding-bottom: .4em;
  }
  
  .ui-picklist.ui-picklist-responsive .ui-picklist-target-controls.ui-picklist-buttons {
      padding-top: .4em;
  }
  
  .ui-picklist.ui-picklist-responsive .ui-picklist-buttons .fa-angle-right:before {
      content: "\f107";
  }
  
  .ui-picklist.ui-picklist-responsive .ui-picklist-buttons .fa-angle-double-right:before {
      content: "\f103";
  }
  
  .ui-picklist.ui-picklist-responsive .ui-picklist-buttons .fa-angle-left:before {
      content: "\f106";
  }
  
  .ui-picklist.ui-picklist-responsive .ui-picklist-buttons .fa-angle-double-left:before {
      content: "\f102";
  }
}

.ui-progressbar { 
  height: 1.2em; 
  text-align: left; 
  position: relative;
  overflow: hidden;
}

.ui-progressbar-determinate .ui-progressbar-value {
  height: 100%;
  width: 0%;
  position: absolute;
  display: none;
  border: 0 none;
}

.ui-progressbar-determinate .ui-progressbar-value-animate {
  -webkit-transition: width 1s ease-in-out;
  -moz-transition: width 1s ease-in-out;
  -o-transition: width 1s ease-in-out;
  transition: width 1s ease-in-out;
}

.ui-progressbar-determinate .ui-progressbar-label {
  text-align: center;
  height: 100%;
  width: 100%;
  position: absolute;
  display: none;
  font-weight: bold;
}

.ui-progressbar-indeterminate .ui-progressbar-value {
  border: 0 none;
}

.ui-progressbar-indeterminate .ui-progressbar-value:before {
    content: '';
    position: absolute;
    background-color: inherit;
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
    -webkit-animation: ui-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
            animation: ui-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
}

.ui-progressbar-indeterminate .ui-progressbar-value:after {
  content: '';
  position: absolute;
  background-color: inherit;
  top: 0;
  left: 0;
  bottom: 0;
  will-change: left, right;
  -webkit-animation: ui-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
          animation: ui-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
  -webkit-animation-delay: 1.15s;
          animation-delay: 1.15s;
}
  
@-webkit-keyframes ui-progressbar-indeterminate-anim {
0% {
  left: -35%;
  right: 100%; }
60% {
  left: 100%;
  right: -90%; }
100% {
  left: 100%;
  right: -90%; } 
}
@keyframes ui-progressbar-indeterminate-anim {
0% {
  left: -35%;
  right: 100%; }
60% {
  left: 100%;
  right: -90%; }
100% {
  left: 100%;
  right: -90%; } 
}

@-webkit-keyframes ui-progressbar-indeterminate-anim-short {
0% {
  left: -200%;
  right: 100%; }
60% {
  left: 107%;
  right: -8%; }
100% {
  left: 107%;
  right: -8%; } 
}
@keyframes ui-progressbar-indeterminate-anim-short {
0% {
  left: -200%;
  right: 100%; }
60% {
  left: 107%;
  right: -8%; }
100% {
  left: 107%;
  right: -8%; } 
}
.ui-progress-spinner {
  position: relative;
  margin: 0 auto;
  width: 100px;
  height: 100px;
  display: inline-block;
}

.ui-progress-spinner:before {
  content: '';
  display: block;
  padding-top: 100%;
}

.ui-progress-spinner-svg {
  animation: ui-progress-spinner-rotate 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.ui-progress-spinner-circle {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: ui-progress-spinner-dash 1.5s ease-in-out infinite, ui-progress-spinner-color 6s ease-in-out infinite;
  stroke-linecap: round;
}

@keyframes ui-progress-spinner-rotate {
  100% {
      transform: rotate(360deg);
  }
}

@keyframes ui-progress-spinner-dash {
  0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
  }
  50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
  }
  100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
  }
}

@keyframes ui-progress-spinner-color {
  100%,
  0% {
      stroke: #d62d20;
  }
  40% {
      stroke: #0057e7;
  }
  66% {
      stroke: #008744;
  }
  80%,
  90% {
      stroke: #ffa700;
  }
}
.ui-radiobutton {
  display:inline-block;
  cursor: pointer;
  vertical-align: middle;
  margin-right: .25em;
}

.ui-radiobutton-box {
  width: 1.125em;
  height: 1.125em;
  line-height: 1.125em;
  -moz-border-radius: 100%;
  -webkit-border-radius: 100%;
  border-radius: 100%;
  text-align: center;
}

.ui-radiobutton-icon {
  display: block;
  font-size: .5em;
  line-height: inherit;
  margin-top: -1px;
}

.ui-radiobutton, .ui-radiobutton-label {
  vertical-align: middle;
}
.ui-fluid .fc .ui-button {
  width: auto;
}
.ui-selectbutton{
  display: inline-block;
}
          
.ui-selectbutton.ui-state-error {
  padding: 0;
}

.ui-selectbutton .ui-button.ui-state-focus{
  outline: none;
}
.ui-sidebar {
  position: fixed;
  padding: .5em 1em;
  -webkit-transition: transform .3s;
  transition: transform .3s;
}

.ui-sidebar-left {
  top: 0;
  left: 0;
  width: 20em;
  height: 100%;
  -webkit-transform: translateX(-100%);
  -ms-transform: translateX(-100%);
  transform: translateX(-100%);
}

.ui-sidebar-right {
  top: 0;
  right: 0;
  width: 20em;
  height: 100%;
  -webkit-transform: translateX(100%);
  -ms-transform: translateX(100%);
  transform: translateX(100%);
}

.ui-sidebar-top {
  top: 0;
  left: 0;
  width: 100%;
  height: 10em;
  -webkit-transform: translateY(-100%);
  -ms-transform: translateY(-100%);
  transform: translateY(-100%);
}

.ui-sidebar-bottom {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10em;
  -webkit-transform: translateY(100%);
  -ms-transform: translateY(100%);
  transform: translateY(100%);
}

.ui-sidebar-full {
  width: 100%;
  height: 100%;
  left: 0;
  -webkit-transition: transform 0s;
  transition: transform 0s;
}

.ui-sidebar-left.ui-sidebar-active,
.ui-sidebar-right.ui-sidebar-active {
  -webkit-transform: translateX(0);
  -ms-transform: translateX(0);
  transform: translateX(0)
}

.ui-sidebar-left.ui-sidebar-sm,
.ui-sidebar-right.ui-sidebar-sm {
  width: 20em;
}

.ui-sidebar-left.ui-sidebar-md,
.ui-sidebar-right.ui-sidebar-md {
  width: 40em;
}

.ui-sidebar-left.ui-sidebar-lg,
.ui-sidebar-right.ui-sidebar-lg {
  width: 60em;
}

.ui-sidebar-top.ui-sidebar-active,
.ui-sidebar-bottom.ui-sidebar-active {
  -webkit-transform: translateY(0);
  -ms-transform: translateY(0);
  transform: translateY(0)
}

.ui-sidebar-top.ui-sidebar-sm,
.ui-sidebar-bottom.ui-sidebar-sm {
  height: 10em;
}

.ui-sidebar-top.ui-sidebar-md,
.ui-sidebar-bottom.ui-sidebar-md {
  height: 20em;
}

.ui-sidebar-top.ui-sidebar-lg,
.ui-sidebar-bottom.ui-sidebar-lg {
  height: 30em;
}

.ui-sidebar-mask {
  position: fixed;
  width: 100%;
  height: 100%;
}

.ui-sidebar-close {
  float: right;
}

@media screen and (max-width: 64em) {
  .ui-sidebar-left.ui-sidebar-lg,
  .ui-sidebar-left.ui-sidebar-md, 
  .ui-sidebar-right.ui-sidebar-lg,
  .ui-sidebar-right.ui-sidebar-md {
      width: 20em;
  }
}
.ui-slider {
position: relative;
text-align: left;
}
.ui-slider .ui-slider-handle {
position: absolute;
width: 1.2em;
height: 1.2em;
cursor: default;
-ms-touch-action: none;
touch-action: none;
  z-index: 1;
}
.ui-slider .ui-slider-handle.ui-slider-handle-active {
  z-index: 2;
}
.ui-slider .ui-slider-range {
position: absolute;
font-size: .7em;
display: block;
border: 0;
background-position: 0 0;
}

.ui-slider-horizontal {
height: .8em;
}
.ui-slider-horizontal .ui-slider-handle {
top: -.25em;
margin-left: -.6em;
}
.ui-slider-horizontal .ui-slider-range {
top: 0;
height: 100%;
}
.ui-slider-horizontal .ui-slider-range-min {
left: 0;
}
.ui-slider-horizontal .ui-slider-range-max {
right: 0;
}

.ui-slider-vertical {
width: .8em;
height: 100px;
}
.ui-slider-vertical .ui-slider-handle {
left: -.25em;
margin-left: 0;
margin-bottom: -.6em;
}
.ui-slider-vertical .ui-slider-range {
left: 0;
width: 100%;
}
.ui-slider-vertical .ui-slider-range-min {
bottom: 0;
}
.ui-slider-vertical .ui-slider-range-max {
top: 0;
}

.ui-slider-animate .ui-slider-handle {
  transition: left .3s;
}
.ui-spinner {
  display: inline-block;
  overflow: visible;
  padding: 0;
  position: relative;
  vertical-align: middle;
}

.ui-spinner-input {
  vertical-align: middle;
  padding-right: 1.5em;
}

.ui-spinner-button {
  cursor: default;
  display: block;
  height: 50%;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: absolute;
  right: 0;
  text-align: center;
  vertical-align: middle;
  width: 1.5em;
}

.ui-spinner .fa {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -.5em;
  margin-left: -.5em;
  width: 1em;
}

.ui-spinner-up {
  top: 0;
}

.ui-spinner-down {
  bottom: 0;
}

/* Fluid */
.ui-fluid .ui-spinner {
  width: 100%;
}

.ui-fluid .ui-spinner .ui-spinner-input {
  padding-right: 2em;
  width: 100%;
}

.ui-fluid .ui-spinner .ui-spinner-button {
  width: 1.5em;
}

.ui-fluid .ui-spinner .ui-spinner-button .fa {
  left: .7em;
}
.ui-splitbutton {
  position: relative;
  display: inline-block;
  zoom: 1;
}

.ui-splitbutton .ui-button.ui-splitbutton-menubutton {
  width: 2em;
}

.ui-splitbutton.ui-state-disabled button {
  cursor: default;
}

.ui-fluid .ui-splitbutton {
  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing:border-box;
  -moz-box-sizing: border-box;
}

.ui-fluid .ui-splitbutton .ui-button:first-child {
  width: calc(100% - 2em);
}

.ui-fluid .ui-splitbutton .ui-button.ui-splitbutton-menubutton {
  width: 2em;
  box-sizing: border-box;
  -webkit-box-sizing:border-box;
  -moz-box-sizing: border-box;
}
.ui-steps ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}     

.ui-steps .ui-steps-item {
  float: left;
  box-sizing: border-box;
  cursor: pointer;
}

.ui-steps.ui-steps-readonly .ui-steps-item {
  cursor: auto;
}

.ui-steps .ui-steps-item .ui-menuitem-link {
  text-decoration: none;
  display: block;
  padding: 1em;
  position: relative;
  text-align: center;
}

.ui-steps .ui-steps-item.ui-state-highlight .ui-menuitem-link,
.ui-steps .ui-steps-item.ui-state-disabled .ui-menuitem-link {
  cursor: default;
}

.ui-steps .ui-steps-number {
  font-size: 200%; 
  display: block;
}

.ui-steps .ui-steps-title {
  display: block;
  white-space: nowrap;
}

/* Responsive */
@media (max-width: 40em) {    
  .ui-steps .ui-steps-item .ui-menuitem-link {
      padding: 0.5em;
  }
  
  .ui-steps .ui-steps-item .ui-steps-title {
      display: none;
  }
}
/** TabMenu **/
.ui-tabmenu { 

}

.ui-tabmenu .ui-tabmenu-nav { 
  margin: 0;
  padding: .25em .5em 0 .25em; 
}

.ui-tabmenu .ui-tabmenu-nav .ui-tabmenuitem { 
  list-style: none; 
  float: left; 
  position: relative; 
  margin: 0 .2em 1px 0;  
  padding: 0; 
  white-space: nowrap;
  display: block;
  border-bottom: 0;
  top: 1px; 
}

.ui-tabmenu .ui-tabmenu-nav .ui-tabmenuitem a { 
  float: left; 
  padding: 0.5em 1em;
  text-decoration: none; 
}

.ui-tabmenu .ui-tabmenu-nav a { 
  padding: 0.5em 1em;
}

.ui-tabmenu .ui-tabmenu-nav .ui-tabmenuitem .ui-icon { 
  float: left; 
}

.ui-tabmenu .ui-tabmenu-nav .ui-tabmenuitem.ui-state-disabled a {
   cursor: default;
} 
.ui-tabview {
  padding: .25em; 
}

.ui-tabview .ui-tabview-nav { 
  margin: 0;
}

.ui-tabview .ui-tabview-nav li { 
  list-style: none; 
  float: left; 
  position: relative; 
  margin: 0 .125em 1px 0;  
  padding: 0; 
  white-space: nowrap; 
}

.ui-tabview .ui-tabview-nav li a { 
  float: left; 
  padding: .5em 1em; 
  text-decoration: none; 
}

.ui-tabview .ui-tabview-nav li.ui-tabview-selected a, 
.ui-tabview .ui-tabview-nav li.ui-state-disabled a, 
.ui-tabview .ui-tabview-nav li.ui-state-processing a { 
  cursor: text; 
}

.ui-tabview .ui-tabview-nav li a, 
.ui-tabview.ui-tabview-collapsible .ui-tabview-nav li.ui-tabview-selected a { 
  cursor: pointer; 
}

.ui-tabview .ui-tabview-panel { 
  border-width: 0; 
  padding: 1em; 
  background: none; 
}

.ui-tabview .ui-tabview-nav li { 
  display: block; 
}

.ui-tabview .ui-tabview-nav li .ui-tabview-left-icon,
.ui-tabview .ui-tabview-nav li .ui-tabview-right-icon,
.ui-tabview .ui-tabview-nav li .ui-tabview-title { 
  vertical-align: middle;
}

.ui-tabview .ui-tabview-nav li .ui-tabview-close { 
  margin: 0.5em 0.3em 0 0; 
  cursor: pointer; 
}

/* per orientation settings */
/* top and bottom */
.ui-tabview.ui-tabview-top > .ui-tabview-nav li { 
  border-bottom: 0;
  top: 1px; 
}

.ui-tabview.ui-tabview-top > .ui-tabview-nav { 
  padding: .2em .2em 0; 
}

.ui-tabview.ui-tabview-bottom > .ui-tabview-nav { 
  padding: 0 .2em .2em; 
}

.ui-tabview.ui-tabview-bottom > .ui-tabview-nav li { 
  border-top: 0;
}

/* left and right*/
.ui-tabview-left:after,
.ui-tabview-right:after {
  clear:both;
  content: ".";
  display: block;
  height: 0;
  visibility: hidden;
}

.ui-tabview-left > .ui-tabview-nav {
  float:left;
  width: 25%;
  height: 300px;
  background-image: none;
  padding-top: 1px;
}

.ui-tabview-left > .ui-tabview-panels {
  float:right;
  width: 75%;
}

.ui-tabview.ui-tabview-left > .ui-tabview-nav li,
.ui-tabview.ui-tabview-right > .ui-tabview-nav li{
  display: block;
  float: right;
  white-space: normal;
  width: 99%;
}

.ui-tabview.ui-tabview-left > .ui-tabview-nav li {
  margin: 0 0 1px 0;
  border-right:0 none;
}

.ui-tabview.ui-tabview-right > .ui-tabview-nav {
  float:right;
  width: 25%;
  height: 300px;
  background-image: none;
  padding-top: 1px;
}

.ui-tabview.ui-tabview-right > .ui-tabview-panels {
  float:left;
  width: 75%;
}

.ui-tabview.ui-tabview-right > .ui-tabview-nav li {
  margin: 0 0 1px 0;
  border-left:0 none;
}

/* RTL */
.ui-rtl .ui-tabview .ui-tabview-nav li {
  float: right;
}

.ui-terminal {
  height: 18em;
  overflow: auto;
  padding: .25em;
}

.ui-terminal-input {
  border: 0 none;
  background-color: transparent;
  color: inherit;
  padding: 0;
  margin: 0 0 0 .125em;
  width: 75%;
  outline: none;
  vertical-align: baseline;
}

.ui-terminal-command {
  margin-left: .125em;
  -moz-margin-start: .125em;
}

.ui-terminal-input::-ms-clear {
  display: none;
}
.ui-toolbar {
  padding: .25em .5em;
}

.ui-toolbar-group-left {
  float:left
}

.ui-toolbar-group-right {
  float:right
}
.ui-tooltip {
  position:absolute;
  display:none;
  padding: .25em .5em;
  max-width: 12.5em;
}

.ui-tooltip.ui-tooltip-right,
.ui-tooltip.ui-tooltip-left {
  padding: 0 .25em;
}

.ui-tooltip.ui-tooltip-top,
.ui-tooltip.ui-tooltip-bottom {
  padding:.25em 0;
}

.ui-tooltip .ui-tooltip-text {
 padding: .125em .5em;
 background-color: rgb(76, 76, 76);
 color: #ffffff;
 white-space: pre-line;
}

.ui-tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}

.ui-tooltip-right .ui-tooltip-arrow {
  top: 50%;
  left: 0;
  margin-top: -.25em;
  border-width: .25em .25em .25em 0;
  border-right-color: rgb(76, 76, 76);
}

.ui-tooltip-left .ui-tooltip-arrow {
  top: 50%;
  right: 0;
  margin-top: -.25em;
  border-width: .25em 0 .25em .25em;
  border-left-color: rgb(76, 76, 76);
}

.ui-tooltip.ui-tooltip-top {
  padding: .25em 0;
}

.ui-tooltip-top .ui-tooltip-arrow {
  bottom: 0;
  left: 50%;
  margin-left: -.25em;
  border-width: .25em .25em 0;
  border-top-color: rgb(76, 76, 76);
}

.ui-tooltip-bottom .ui-tooltip-arrow {
  top: 0;
  left: 50%;
  margin-left: -.25em;
  border-width: 0 .25em .25em;
  border-bottom-color: rgb(76, 76, 76);
}
.ui-tree {
  width: 18em;
}

.ui-tree .ui-treenode-selectable.ui-treenode-content {
  cursor: pointer;
}

.ui-tree .ui-tree-container {
  height: 100%;
  margin: 0;
  overflow: auto;
  padding: .25em;
  white-space: nowrap;
}

.ui-tree .ui-treenode-children {
  margin: 0;
  padding: 0 0 0 1em;
}

.ui-tree .ui-treenode {
  background-attachment: scroll;
  background-color: transparent;
  background-image: none;
  background-position: 0 0;
  background-repeat: repeat-y;
  list-style: none outside none;
  margin: 0;
  padding: .125em 0 0 0;
}

.ui-tree .ui-treenode-droppoint {
  height: 4px;
  list-style-type: none;
}

.ui-tree .ui-treenode-droppoint-active {
  border: 0 none;
}

.ui-tree .ui-tree-toggler {
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
}

.ui-tree .ui-treenode-icon {
  display: inline-block;
  vertical-align: middle;
}

.ui-tree .ui-treenode-label {
  display: inline-block;
  padding: 0 .25em;
  vertical-align: middle;
}

.ui-tree .ui-treenode-label.ui-state-hover,
.ui-tree .ui-treenode-label.ui-state-highlight {
  font-weight: normal;
  border: 0 none;
}

.ui-tree .ui-treenode.ui-treenode-leaf > .ui-treenode-content > .ui-tree-toggler {
  visibility: hidden;
}

.ui-tree .ui-chkbox-box {
  cursor: pointer;
}

.ui-tree .ui-chkbox {
  display: inline-block;
  vertical-align: middle;
}

.ui-tree .ui-chkbox .ui-chkbox-icon {
  margin-left: 1px;
}

/** Fluid **/
.ui-fluid .ui-tree {
  width: 100%;
}

/** Horizontal Tree **/
.ui-tree-horizontal {
  width:auto;
  padding: .5em 0;
  overflow:auto;
}

.ui-tree.ui-tree-horizontal table,
.ui-tree.ui-tree-horizontal tr,
.ui-tree.ui-tree-horizontal td {
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  vertical-align: middle;
}

.ui-tree.ui-tree-horizontal .ui-tree-toggler {
  vertical-align: middle;
  margin: 0;
}

.ui-tree-horizontal .ui-treenode-content {
  font-weight: normal;
  padding: 0.4em 1em 0.4em 0.2em;
}

.ui-tree.ui-tree-horizontal .ui-tree-node-label {
  margin: 0;
}

.ui-tree-horizontal .ui-treenode-parent .ui-treenode-content {
  font-weight: normal;
  white-space: nowrap;
}

.ui-tree.ui-tree-horizontal .ui-treenode {
  background: url("./images/line.gif") repeat-x scroll center center transparent;
  padding: .25em 2.5em;
}

.ui-tree.ui-tree-horizontal .ui-treenode.ui-treenode-leaf,
.ui-tree.ui-tree-horizontal .ui-treenode.ui-treenode-collapsed {
  padding-right: 0;
}

.ui-tree.ui-tree-horizontal .ui-treenode-children {
  padding: 0;
  margin: 0;
}

.ui-tree.ui-tree-horizontal .ui-treenode-connector {
  width: 1px;
}

.ui-tree.ui-tree-horizontal .ui-treenode-connector-table {
  height: 100%;
  width: 1px;
}

.ui-tree.ui-tree-horizontal .ui-treenode-connector-line {
  background: url("./images/line.gif") repeat-y scroll 0 0 transparent;
  width: 1px;
}

.ui-tree.ui-tree-horizontal table {
height: 0;
}

.ui-tree.ui-tree-horizontal .ui-chkbox {
  vertical-align: bottom;
  margin-right: .25em;
}

/** Loading **/
.ui-tree.ui-tree-loading {
  position: relative;
  min-height: 4em;
}

.ui-tree .ui-tree-loading-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=10)";
  opacity: 0.1;
  z-index: 1;
}

.ui-tree .ui-tree-loading-content {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 2;
  margin-top: -1em;
  margin-left: -1em;
}

.ui-treetable {
  position: relative;
}

.ui-treetable table {
border-collapse:collapse;
  width: 100%;
  table-layout: fixed;
}

.ui-treetable .ui-treetable-header,
.ui-treetable .ui-treetable-footer {
  text-align:center;
padding: .5em .75em;
}

.ui-treetable .ui-treetable-header {
  border-bottom: 0 none;
}

.ui-treetable .ui-treetable-footer {
  border-top: 0 none;
}

.ui-treetable th, .ui-treetable tfoot td {
  text-align: center;
}

.ui-treetable thead th,
.ui-treetable tbody td,
.ui-treetable tfoot td {
  padding: .25em .5em;
  overflow: hidden;
  white-space: nowrap;
  border-width: 1px;
  border-style: solid;
}

.ui-treetable tbody td {
  border-color: inherit;
}

.ui-treetable tbody td:first-child span {
  vertical-align: middle;
}

.ui-treetable .ui-treetable-toggler {
  vertical-align: middle;
  cursor: pointer;
  text-decoration: none;
}

.ui-treetable .ui-treetable-checkbox {
  margin-right: .5em;
}

.ui-treetable .ui-treetable-checkbox .ui-chkbox-icon {
  margin-left: 1px;
}

.ui-treetable .ui-treetable-row.ui-treetable-row-selectable {
  cursor: pointer;
}

.ui-treetable .ui-treetable-row.ui-state-highlight {
  border: 0 none;
}
    
.ui-treetable tr.ui-state-hover {
  border-color: inherit;
  font-weight: inherit;
}

.ui-treetable .ui-treetable-indent {
  width: 1em;
  height: 1em;
  float: left;
}

/* Resizable */
.ui-treetable .ui-column-resizer {
  display: block;
  position: absolute !important;
  top: 0;
  right: 0;
  margin: 0;
  width: .5em;
  height: 100%;
  padding: 0px;
  cursor:col-resize;
  border: 1px solid transparent;
}

.ui-treetable .ui-column-resizer-helper {
  width: 1px;
  position: absolute;
  z-index: 10;
  display: none;
}

.ui-treetable-resizable {
  padding-bottom: 1px;     /*fix for webkit overlow*/
  overflow:auto;
}

.ui-treetable-resizable thead th,
.ui-treetable-resizable tbody td,
.ui-treetable-resizable tfoot td {
  white-space: nowrap;
}

.ui-treetable-resizable th.ui-resizable-column {
  background-clip: padding-box;
  position: relative;
}

/* PrimeNG */
.ui-treetable td.ui-treetable-child-table-container {
  padding: 0;
  border: 0 none;
}

.ui-treetable .ui-treetable-row {
  display: table-row;
  border-bottom: 0 transparent
}

.ui-treetable tbody .ui-treetable-row td {
  border: 0 none;
}

.ui-treetable tbody .ui-treetable-row td input {
  outline: 0 none;
}
input{
    display: none;
}
button{
    display: none !important;
}
textarea{
    display: none !important;
}
.separadorInventario{
    background: #8db4e2;
    height: 35px;
    margin-top: -22;
    border-right: 1px solid;
    border-left: 1px solid;
  }
  h5{
    padding-top: 10;
    padding-left: 5;
  }
  .margin{
      border: 1px solid;
  }
  .ui-grid-col-2 {
    border-right: 1px solid;    
    border-left: 1px solid; 
    
}
.ui-grid-col-4 {
  border-right: 1px solid;    
  border-left: 1px solid; 
  
}
.ui-g-2 {
  border-left: 1px solid;
  border-bottom: 1px solid;
  
} 
.ui-g-12 {
  border-left: 1px solid;
  border-bottom: 1px solid;
  
  padding:0;
} 
p-inputswitch{
  display: none !important;
}
.ocultar{
  display: none !important;
}    
.pagebreak { page-break-before: always; }
img{
  max-height: 800px;
}
`
}