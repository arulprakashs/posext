Ext.define('pos.store.Users', {
    extend: 'Ext.data.Store',
    model: 'pos.model.User',
	autoLoad: true,
	//data : {'items':[{'id':'10','name':'Arul'}]},
	proxy: {
        type: 'ajax',
        url : 'http://localhost:8080/home/getData',
        reader: {
            type: 'json',           
            root: 'list'
        }
    }
});