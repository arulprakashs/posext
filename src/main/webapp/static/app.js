
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