/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojarraytabledatasource', 'ojs/ojtable', 'ojs/ojbutton', 'ojs/ojdialog', 'ojs/ojformlayout', 'ojs/ojinputtext'],
  function (oj, ko, $) {

    function DashboardViewModel() {

      var self = this;

      var ENDPOINT_USER = "http://localhost:8084/resources/user/";

      self.selectedUser = ko.observable();
      self.userId = ko.observable();
      self.username = ko.observable();
      self.password = ko.observable();

      self.showButtonSave = ko.observable(false);
      self.showButtonUpdate = ko.observable(false);

      self.modalHeader = ko.observable();
      self.dataSource = ko.observable();



      self.clickNew = function () {
        self.modalHeader("New User");
        self.showButtonSave(true);
        self.showButtonUpdate(false);
        self.openDialog();
      };

      self.clickEdit = function (event, rowData) {
        self.modalHeader("Update User");
        self.selectedUser(rowData.data);
        self.showButtonSave(false);
        self.showButtonUpdate(true);
        self.getUserById();
        self.openDialog();
      };


      self.clickDelete = function (event, rowData) {
        self.selectedUser(rowData.data);
        self.delete();
      };


      self.getAllUsers = function () {

        $.ajax({
          type: "GET",
          crossDomain: true,
          contentType: 'application/json; charset=UTF-8',
          dataType: "json",
          url: ENDPOINT_USER

        }).done(function (data) {
          self.dataSource(new oj.ArrayTableDataSource(data, { idAttribute: 'userId' }));

        }).fail(function (data) {
          alert("ERROR" + data.statusText);
        });
      }


      self.getUserById = function () {
        $.ajax({
          type: "GET",
          crossDomain: true,
          contentType: 'application/json; charset=UTF-8',
          dataType: "json",
          url: ENDPOINT_USER + self.selectedUser().userId.toString()
          
        }).done(function (data) {
          self.userId(data.userId);
          self.username(data.name);
          self.password(data.password);

        }).fail(function (data) {
          alert("ERROR" + data.statusText);
        });
      }



      self.save = function () {

        var params = {
          "userId": self.userId().toString(),
          "name": self.username().toString(),
          "password": self.password().toString()
        };

        $.ajax({
          type: "POST",
          crossDomain: true,
          contentType: 'application/json; charset=UTF-8',
          dataType: "json",
          data: JSON.stringify(params),
          url: ENDPOINT_USER

        }).done(function (data) {

          alert("User created.");
          self.closeDialog();
          self.getAllUsers();

        }).fail(function (data) {
          alert("Error:  " + data.statusText);
        });
      };


      self.update = function () {

        var params = {
          "userId": self.userId().toString(),
          "name": self.username().toString(),
          "password": self.password().toString()
        };

        $.ajax({
          type: "PUT",
          crossDomain: true,
          contentType: 'application/json; charset=UTF-8',
          dataType: "json",
          data: JSON.stringify(params),
          url: ENDPOINT_USER + self.selectedUser().userId.toString()

        }).done(function (data) {

          alert("User updated");
          self.closeDialog();
          self.getAllUsers();

        }).fail(function (data) {
          alert("Error:  " + data.statusText);
        });

      };


      self.delete = function () {
        $.ajax({
          type: "DELETE",
          crossDomain: true,
          contentType: 'application/json; charset=UTF-8',
          url: ENDPOINT_USER + self.selectedUser().userId.toString(),
          success: function (data) {
            alert("User deleted");
            self.getAllUsers();
          }
        });
      };


      self.resetView = function () {
        self.selectedUser("");
        self.userId("");
        self.username("");
        self.password("");
      };

      self.openDialog = function() {
        $('#myModal').ojDialog('open');
      };

      self.closeDialog = function() {
        self.resetView();
        $('#myModal').ojDialog('close');       
      }

      self.openDialogDelete = function () {
        $('#modal2').ojDialog('open');
      };  

      self.closeDialogDelete = function () {
        self.resetView();
        $('#modal2').ojDialog('close');
      }

      self.getAllUsers();

    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DashboardViewModel();
  }
);
