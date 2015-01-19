Ext.define('pos.store.Users', {
    extend: 'Ext.data.Store',
    model: 'pos.model.User',
	autoLoad: true,
	data : [{'id':'10','userName':'Arul'},{'id':'11111','userName':'OPinside'},{'id':'11111','userName':'OPinside'}],
	/*proxy: {
        type: 'ajax',
        url : '/posext/home/getData',
        reader: {
            type: 'json',           
            root: 'list'
        }
    }*/
});