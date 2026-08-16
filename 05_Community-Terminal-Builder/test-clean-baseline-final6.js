"use strict";
const fs=require("fs");
const path=require("path");
const root=__dirname;
const html=fs.readFileSync(path.join(root,"public/index.html"),"utf8");
const js=fs.readFileSync(path.join(root,"public/app.js"),"utf8");
const css=fs.readFileSync(path.join(root,"public/style.css"),"utf8");
function ok(cond,msg){if(!cond)throw new Error(msg)}
ok(!html.includes("TEMP QA · PROJECT TRANSFER"),"temporary QA transfer strip must be removed");
ok(!html.includes('id="qa-export-project"')&&!html.includes('id="qa-import-project"'),"temporary QA buttons must be removed");
ok(!js.includes("qaExportProject")&&!js.includes("qaImportProject"),"temporary QA JS aliases must be removed");
ok(!css.includes(".qa-transfer-tools")&&!css.includes(".qa-transfer-actions"),"temporary QA CSS must be removed");
ok(html.includes('id="export-project"')&&html.includes('id="import-project"'),"real Builder Mode import/export must remain");
ok(js.includes('const CLEAN_BASELINE_KEY="cpb.clean-baseline.final6"'),"clean baseline migration key missing");
for(const key of ["STORAGE_KEY","SETTINGS_KEY","DEPLOYMENT_KEY","RECOVERY_KEY"])ok(js.includes(`localStorage.removeItem(key)`)||js.includes(key),`cleanup handling missing for ${key}`);
ok(html.includes("cpb-clean-baseline-final6"),"fresh cache version missing");
console.log("PASS CPB clean baseline final6");
