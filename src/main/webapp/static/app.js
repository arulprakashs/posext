/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when upgrading.
*/

Ext.application({
    name: 'pos',
    appFolder : '/app',
    //extend: 'pos.Application',
    
    extend: 'Ext.app.Application',

    views: [
            // TODO: add views here
        	'Display'
    ],

    controllers: [
        'Login'
    ],

    stores: [
        // TODO: add stores here
    	'Users'
    ],
    
    //autoCreateViewport: true,
    
    launch : function(){
    	Ext.create('Ext.panel.Panel', {
            layout: 'fit',
            width : 200,
            renderTo: 'login-grid',
            items: [
                {
                    xtype:'logindisplay'                
                }
            ]
        });
    }
});