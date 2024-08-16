import { JetView, plugins } from "webix-jet";

// webix.editors.jsoneditor = webix.extend({
//   render: function () {
//     return webix.html.create(
//       "div",
//       {
//         class: "webix_dt_editor",
//       },
//       "<div id='jsoneditor'></div>"
//     );
//   },
//   setValue: function (value) {
//     this.jsoneditor = new JSONEditor(document.getElementById("jsoneditor"), {
//       theme: "webix",
//       schema: {},
//     });
//     this.jsoneditor.set(value);
//   },
//   getValue: function () {
//     return this.jsoneditor.get();
//   },
// });

// webix.protoUI(
//   {
//     name: "jsoneditor",
//     $init: function (config) {
//       console.log("config", config);
// 	  return webix.html.create("div", {
// 			"class": "webix_dt_editor"
// 		}, "<div id='jsoneditor'></div>");
//     },
//   },
//   webix.ui.view
// );

export default class TopView extends JetView {
  config() {
    const navbar = {
      view: "toolbar",
      cols: [
        { view: "button", value: "JSON Formatter", width: 150 },
        {
          view: "segmented",
          value: "panel_single",
          inputWidth: 200,
          multiview: true,
          options: [
            { id: "panel_single", value: "Single" },
            { id: "panel_split", value: "Split" },
          ],
          on: {
            onChange: (value) => {
              // if (value == "grid_view") {
              //   if ($$("data_grid").count() > 0) {
              //     $$("export_xls_btn").show();
              //   }
              // } else {
              //   $$("export_xls_btn").hide();
              // }
            },
          },
        },

        {},
      ],
    };

    var header = {
      type: "header",
      template: this.app.config.name,
      css: "webix_header app_header",
    };

    var uiSingle = {
      paddingX: 5,
      css: "app_layout",
      cols: [{ view: "json-editor", id: "je0" }],
    };

    var uiSplit = {
      //   type: "clean",
      paddingX: 5,
      css: "app_layout",
      cols: [
        { view: "json-editor", id: "je1" },
        {
          padding: 10,
          rows: [
            {},
            {
              view: "button",
              label: "Format",
              tooltip: "Beutify",
              align: "center",
              autowidth: true,
              click: function () {
                $$("je2").setValue($$("je1").getValue());
                $$("je2").format();
              },
            },
            {
              view: "button",
              align: "center",
              label: "Compact",
              tooltip: "Minify",
              autowidth: true,
              click: function () {
                $$("je2").setValue($$("je1").getValue());
                $$("je2").compact();
              },
            },
            {},
          ],
        },
        { view: "json-editor", id: "je2" },
      ],
    };

    return {
      rows: [
        navbar,
        {
          id: "multiviewcell",
          // animate:false,
          cells: [
            {
              // animate: { type: "slide", direction: "top" },
              id: "panel_single",
              rows: [
                uiSingle
              ]

            },
            {
              id: "panel_split",
              rows: [
                uiSplit
              ]
            },
          ],
        },
      ],
    };
  }
  init() {}
}
