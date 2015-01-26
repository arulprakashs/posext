Ext.Loader.setConfig({
    disableCaching: false
});

Ext.application({
    name: 'pos',
    appFolder : '/posext/app',
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
    	displayMenu();
    	displayGrid();
    }
});


function displayGrid(){
	Ext.create('Ext.panel.Panel', {
        layout: 'fit',
        width : 1200,
        renderTo: 'login-grid',
        items: [
            {
                xtype:'logindisplay'                
            }
        ]
    });
}

function displayMenu(){
	Ext.create('Ext.menu.Menu', {
        showSeparator:false,
        cls:'main-menu',
        floating:false,
        ignoreParentClicks:true,
    	renderTo:'menu-div',
        layout:{
            type:'hbox',
            align:'stretch'
        },
        height:44,
    	defaults:{
            menuAlign:'tl-bl?'
        },
        items:[
            {
                text:'Home',
                width:80,
                menu:{
                    cls:'main-sub-menu',
                    items:[
                        {
                            text:'Home'
                        },
                        {
                            text:'Dashboard'
                        }
                    ]
                }
            },
            {
                text:'New',
                 width:80,
                menu:{
                    cls:'main-sub-menu',
                    items:[
                        {
                            text:'Contact'
                        },
                        {
                            text:'Account'
                        },
                        {
                            text:'Company'
                        }
                    ]
                }
            },
            {
                text:'Marketing',
                 width:80,
                menu:{
                    cls:'main-sub-menu',
                    items:[
                        {
                            text:'Contacts'
                        },
                        {
                            text:'Campaigns'
                        },
                        {
                            text:'Activities'
                        },
                        {
                            text:'Lists'
                        }
                    ]
                }
            }
        ]
    });
}
