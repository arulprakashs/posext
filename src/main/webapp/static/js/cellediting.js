Ext.Loader.setConfig({
    enabled : true,
});
//Ext.Loader.setPath('Ext.ux', 'http://cdn.sencha.io/ext-4.0.2a/examples/ux');

Ext.data.Connection.disableCaching = false;
Ext.data.proxy.Server.prototype.noCache = false;
Ext.Ajax.disableCaching = false;

Ext.require([
    'Ext.selection.CellModel',
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*',
    'Ext.form.*'
]);

Ext.onReady(function () {

    function formatDate(value) {
        return value ? Ext.Date.dateFormat(value, 'd M, Y') : '';
    }

    Ext.define('Company', {
        extend     : 'Ext.data.Model',
        fields     : [
            {name : 'name', type : 'String'},
            {name : 'employees', type : 'String'},
            {name : 'incorporationDate', type : 'date'}
        ]
    });


    // create the Data Store
    var store = Ext.create('Ext.data.Store', {
        // destroy the store if the grid is destroyed
        autoDestroy : true,
        idProperty : 'id',
        autoSync    : false,
        autoLoad    : true,
        model       : 'Company',
        sorters     : [
            {
                property  : 'name',
                direction : 'ASC'
            }
        ],
        proxy: {
            type: 'rest',
            actionMethods: {
                create: 'POST',
                read: 'GET',
                update: 'POST',
                destroy: 'POST'
            },
            api: {
                read    : '/posext/home/getGridData',
                create  : '/posext/home/getGridDataCreate',
                update  : '/posext/home/getGridDataUpdate',
                destroy : '/posext/home/getGridDataDelete'
            },
        	/*type : 'ajax',
            url: '/posext/home/getGridData',*/
            reader: {
                type: 'json',           
                root: 'list'
            },
            writer: {
                type: 'json',
                writeAllFields : false
            }
        }/*,
        onCreateRecords: function(records, operation, success) {
            console.log(records);
        },

        onUpdateRecords: function(records, operation, success) {
            // If update failed, reject all changes
            if(!success) {
                // Call rejectChanges method of the store
                this.rejectChanges();

                Ext.Msg.show({
                    title: 'Update Failed',
                    message: 'The changes you have made are rejected.',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            }
        },

        onDestroyRecords: function(records, operation, success) {
            console.log(records);
        }*/
        /*data : [
                {
                    id            : 1,
                    name          : 'IBM',
                    employees     : 33,
                    incorporation : new Date()
                },
                {
                    id            : 2,
                    name          : 'Hilton',
                    employees     : 411,
                    incorporation : new Date()
                }
            ]
        */
    });

    var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit : 1
    });

    var dateRenderer = function (v) {
        return Ext.isDate(v) ? Ext.Date.format(v, 'd-m-Y') : null;
    }
    // create the grid and specify what field you want
    // to use for the editor at each header.
    var grid = Ext.create('Ext.grid.Panel', {
        store    : store,
        columns  : [
            {
                id        : 'common',
                header    : 'Common Name',
                dataIndex : 'name',
                flex      : 2,
                field     : {
                	xtype      : 'textfield',
                    allowBlank : false,
                    selectOnFocus : true,
                    maskRe: /[\d]/,
                    listeners : {
                    	'blur' : function(text){
                    		var newVal = text.getValue().trim();
                    	}
                    }
                }
            },
            {
                header    : '# of employees',
                dataIndex : 'employees',
                flex      : 1,
                field     : {
                    //xtype      : 'numberfield',
                    allowBlank : false
                }
            },
            {
                header    : 'Incorporation date',
                dataIndex : 'incorporationDate',
                flex      : 1,
                renderer  : dateRenderer,
                field     : {
                    xtype      : 'datefield',
                    allowBlank : false,
                    format     : 'd-m-Y'
                }
            }
        ],
        selModel : {
            selType : 'cellmodel'
        },
        renderTo : 'editor-grid',
        width    : 600,
        height   : 300,
        title    : 'Edit Companies',
        frame    : true,
        tbar     : [
            {
                text    : 'Add Company',
                handler : function () {
                    // Create a record instance through the ModelManager
                    var ts = Ext.Date.format(new Date(), 'U');

                    /*var r = Ext.ModelManager.create({
                        name : 'New Company 1',
                        id   : ts
                    }, 'Company', ts);
                    r.save();*/
                    
                    var count = store.getCount();
                    store.insert(count, new Company());
                    cellEditing.startEdit(count,0);
                }
            },
            {
                text    : 'Clear database',
                handler : function () {
                    /*var p = store.getProxy();
                    store.remove(p);
                    store.load();*/
                	var selection = grid.getView().getSelectionModel().getSelection()[0];
                	var count = store.getCount();
                	 
                    if (selection) {
                    	grid.store.remove(selection);
                    } else if (count > 0 ){
                    	store.removeAt(count-1);
                    }
                }
            },
            {
                text    : 'Print',
                handler : function () {
                	//store.sync();
                	var parms = []; 
                	//getUpdatedRecords() vs getModifiedRecords()
                	var updatedRecords = grid.getStore().getUpdatedRecords();
                	Ext.each(updatedRecords,function(record){
                	 parms.push(record.data);
                	});
                	
                	var deletedRecords = grid.getStore().getRemovedRecords();
                	
                	
                	var newRecords = grid.getStore().getNewRecords();
                	Ext.each(newRecords,function(record){
                		if(record.data.name != '')
                			parms.push(record.data);
                		else
                			grid.getStore().remove(record);
                	});
                	
                	grid.getStore().commitChanges();
                	   
                	if(parms.length > 0){
                	 //Ext.window.MessageBox.progress('Saving Your Changes...');
                	 Ext.Ajax.useDefaultXhrHeader=false;
                	 Ext.Ajax.request({
	                	  url : '/posext/home/getGridDataUpdate',
	                	  headers: {'Content-Type' : 'application/json'},
	                	  method : 'POST',
	                	  timeout: 60000,
	                	  jsonData : {
	                	   //records : Ext.encode(parms)
	                		 records : parms
	                	  },
	                	  scope : this,
	                	  success : function(response){
	                		  //Ext.window.MessageBox.hide();
	                	  },
	                	  failure : function(response){
	                		  
	                	  }
                	 });   
                	}
                }
            }
        ],
        plugins  : [cellEditing]
    });
    
    
    //cellediting - start
    grid.on('edit', function(editor, e) {
        // commit the changes right after editing finished
        //e.record.commit();
    	
    	if (e.colIdx == 0){
    		var nameVal = e.value;
    		var posturl = '/posext/home/getGridDetailData';
    		
    		Ext.Ajax.useDefaultXhrHeader=false;
    		Ext.Ajax.request({
          	  url : posturl,
          	  headers: {'Content-Type' : 'application/json'},
          	  method : 'POST',
          	  timeout: 60000,
          	  jsonData : {
          		"name" : nameVal
          	  },
          	  scope : this,
          	  success : function(response){
          		  //Ext.window.MessageBox.hide();
          		  e.record.get('employees');
          		  e.record.set('employees', 'test');
          		  e.record.set('incorporationDate', 'test');
          		  e.record.commit();
          		  grid.getView().refresh();
          		var count = store.getCount();
                store.insert(count, new Company());
                cellEditing.startEdit(count,0);
          	  },
          	  failure : function(response){
          		  
          	  }
    		});
    		
    	}
    });
    
    grid.on('beforeedit', function(editor,e){
    	//restrict edit col2 and col3
        /*if (e.colIdx == 1 || e.colIdx == 2)
            return false;*/
    	
    	if (e.colIdx == 2) {
            return false;
    	}
    		
    });
    
    
    //cellediting - end
    
    //phantom
    store.on('add', function( store, records, index, eOpts ){
    	store.suspendAutoSync();
    });
    
    //phantom
    store.on('remove', function( store, records, index, eOpts ){
    	store.suspendAutoSync();
    });
    
    store.on('beforesync', function(options, eOpts){
    	if(options == 'Create'){
    		
    	}
    });
    
    store.on('load', function(){
        var count = store.getCount();
        store.insert(count, new Company());
        cellEditing.startEdit(count,0);
        //store.resumeAutoSync();
    });
});
