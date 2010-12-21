

Ext.setup({

    onReady : function() {

        var me = this;

        Ext.regModel('Messages', {
            fields: ['user', 'message']
        });

        var store = new Ext.data.Store({
            model  : 'Messages'
        });

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
                    layout: 'fit',
                    dockedItems: [{
                        dock: 'top',
                        title: 'サンプル',
                        xtype: 'toolbar',
                        type: 'light',
                    },{
                        dock: 'bottom',
                        xtype: 'toolbar',
                        type: 'light',
                        items: [{
                            id: 'comment',
                            xtype: 'textfield',
                        },{
                            text: '送信',
                            handler: function(btn) {

                                var v = Ext.getCmp('comment').getValue();
                                me.socket.send(v);
                                store.add({user: name, message: v});
                                Ext.getCmp('comment').setValue('');

                            }
                        }]
                    }],
                    items: [{
                        xtype: 'list',
                        itemTpl : '[{user}] {message}',
                        store: store,
                    }]
                });

                me.socket = new Ext.ux.util.SocketIO(null, {port: 8080, rememberTransport: false});

                me.socket.on('connect', function() {
                    me.socket.send(name);
                });

                me.socket.on('message', function(obj) {

                    if(obj.buffer) {
                        for(var i=0; i<obj.buffer.length; i++) {
                            var o = obj.buffer[i];
                            var v = o.message[1];
                            store.add({user: o.message[2], message: v});
                        }
                    } else {
                        var o = obj;
                        var v = '';
                        var u = '';
                        if(o.message) {
                            v = o.message[1];
                            u = o.message[2];
                            store.add({user: u, message: v});
                        }
                    }

                });

                me.socket.connect();
            },
            icon: Ext.MessageBox.INFO
        });

    }

});


