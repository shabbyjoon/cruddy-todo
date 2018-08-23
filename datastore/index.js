const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, addTodoCallback) => {
  // var id = counter.getNextUniqueId();
  // items[id] = text;
  // debugger;
  
  //creatCallback that takes err, id --> within this, invoke callback below 
  let createCallback = (err, id) => {
    fs.writeFile(`${exports.dataDir}/${id}.txt`, `${text}`, (err) => {
      if (err) {
        console.log('error');
      } else {
        addTodoCallback(null, {id: id, text: text});
      }
    });
  };
  counter.getNextUniqueId(createCallback);
  //call fs.writefile which uses id as filename and text as file content, accepts a callback
  //error handling if writefile fails
  //       else callback invokes addTodo callback 
  //  invoke getNextUniqueId with creatCallback 
  
  
};

exports.readOne = (id, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, {id: id, text: item});
  }
};

exports.readAll = (callback) => {
  var data = [];
  _.each(items, (item, idx) => {
    data.push({ id: idx, text: items[idx] });
  });
  callback(null, data);
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, {id: id, text: text});
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
