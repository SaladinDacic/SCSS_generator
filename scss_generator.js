var fs = require('fs')
var json_obj = require ("./obj.json")


Object.keys(json_obj).forEach(build_obj_key=>{
    let writer = fs.createWriteStream(`${build_obj_key}.scss`, {
        flags: 'a' // 'a' means appending (old data will be preserved)
    })
    writer.write("@use 'sass:map';");
    writer.write("\n@use '../utils';\n");
    let build_obj = json_obj[build_obj_key];


    writer.write(`\n$_${build_obj_key}:(`);
    let keyNames = Object.keys(build_obj)
    keyNames.forEach(keyName=>{
        writer.write(`\n   '${keyName}': ${build_obj[keyName].value},`)
    })
    writer.write(`\n);\n`);


    writer.write(`\n$_default:(
   'base': utils.custom-property($_${build_obj_key}, '${build_obj_key}', 'default'),`)
    writer.write(`\n);\n`);


    writer.write(`\n$_all: ();`);
    writer.write(`\n$_all: map.merge($_all, $_${build_obj_key});`);
    writer.write(`\n$_all: map.merge($_all, $_default);\n`);
    

    writer.write(`\n@function ${build_obj_key}($name){
   @return utils.custom-property($_all, '${build_obj_key}', $name);`)
    writer.write(`\n}\n`);


    keyNames.forEach(keyName=>{
        writer.write(`\n$${build_obj_key}-${keyName}: ${build_obj_key}('${keyName}');`)
    })
    
    writer.write(`\n@mixin ${build_obj_key}-token {
   @include utils.define-tokens($_all, '${build_obj_key}')`)
    writer.write(`\n}`);
})

// console.log("@use 'sass:map'");
// console.log("@use '../utils");
// console.log("@use '../utils");

// Object.keys(json_obj).forEach(build_obj_key=>{
//     console.log("\n@use 'sass:map'");
//     console.log("@use '../utils");
//     let build_obj = json_obj[build_obj_key];


//     console.log(`\n$_${build_obj_key}:(`);
//     let keyNames = Object.keys(build_obj)
//     keyNames.forEach(keyName=>{
//         console.log(`   '${keyName}': ${build_obj[keyName].value},`)
//     })
//     console.log(`);`);


//     console.log(`\n$_default:(
//    'base': utils.custom-property($_${build_obj_key}, '${build_obj_key}', 'default'),`)
//     console.log(`);`);


//     console.log(`\n$_all: ()`);
//     console.log(`$_all: map.merge($_all, $_${build_obj_key});`);
//     console.log(`$_all: map.merge($_all, $_default);`);
    

//     console.log(`\n@function ${build_obj_key}($name){
//    @return utils.custom-property($_all, '${build_obj_key}', $name);`)
//     console.log(`}\n`);


//     keyNames.forEach(keyName=>{
//         console.log(`$${build_obj_key}-${keyName}: ${build_obj_key}('${keyName}');`)
//     })
    
//     console.log(`\n@mixin ${build_obj_key}-token {
//    @include utils.define-tokens($_all, '${build_obj_key}')`)
//     console.log(`}`);
// })