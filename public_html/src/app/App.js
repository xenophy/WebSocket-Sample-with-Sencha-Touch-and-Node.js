

Ext.setup({

    onReady : function() {

        Ext.Msg.show({
            title: '名前いれて！',
            msg: 'なんでもいいよー',
            width: 300,
            buttons: Ext.MessageBox.OK,
            multiLine: true,
            prompt : { maxlength : 180, autocapitalize : true },
            fn: function(btn, name) {





                new Ext.Panel({
                    fullscreen: true,
                    dockedItems: [{
                        dock: 'top',
                        title: 'サンプル',
                        xtype: 'toolbar',
                        type: 'light',
                    }]
                });

            },
            icon: Ext.MessageBox.INFO
        });

    }

});


