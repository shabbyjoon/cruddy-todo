
// Todo Model //////////////////////////////////////////////////////////////////

window.Todo = {

  url: '/todo',

  // Create (Crud) -- collection
  create: function (text, callback) {
    return $.ajax({
      url: this.url,
      type: 'POST',
      dataType: 'json',
      data: { todoText: text },
      success: callback
    });
  },

  // Read all (cRud) -- collection
  readAll: function (callback) {
    // fs.readdir(data.dataDir, (err, files) => {
    //   debugger;
    //   if (err) {
    //     console.log('err');
    //   } else {
    //     let todos = files.map(id => ({ id: id, text: id }));
    //     callback(todos);
    //   }
    // });
    return $.ajax({
      url: this.url,
      type: 'GET',
      dataType: 'json',
      success: callback
    });
  },

  // Read one (cRud) -- member
  readOne: function (id, callback) {
    return $.ajax({
      url: `${this.url}/${id}`,
      type: 'GET',
      dataType: 'json',
      success: callback
    });
  },

  // Update (crUd) -- member
  update: function (id, text, callback) {
    return $.ajax({
      url: `${this.url}/${id}`,
      type: 'PUT',
      dataType: 'json',
      data: { todoText: text },
      success: callback
    });
  },

  // Delete (cruD) -- member
  delete: function (id, callback) {
    return $.ajax({
      url: `${this.url}/${id}`,
      type: 'DELETE',
      dataType: 'json',
      success: callback
    });
  }
};
