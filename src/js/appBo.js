import Content from './bo/components/content';
import SVG from './bo/components/svg';
import Banner from './bo/components/banner';

(() => {

    /**
     * Add custom elements to TinyMCE
     */

    let components = [Content, SVG, Banner];
    let menu = [];

    tinymce.PluginManager.add('scripts-bo', function( editor, url ) {

        for(let component of components) {
            menu.push({
                text: component().title,
                onclick: function() {
                    editor.windowManager.open(component());
                }
            })
        }

        editor.addButton('custom_content', {
            image: url + '/images/plus.svg',
            type:'menubutton',
            menu: menu
        });
    });

    /**
     * Replace shortcode by a preview
     */

    for(let component of components) {
        window.wp.mce.views.register( component().balise, {
            initialize: function() {

                var self = this;

                $.ajax({
                    url : ajaxurl,
                    data : { action : 'do_wp_shortcode', text : this.text },
                    type : 'POST',
                    error : function(req, stat, err) {console.log(error)},
                    success : function(data, stat, req) {
                        self.render( data );
                    }
                });

            },edit: function(e ) {
                tinyMCE.activeEditor.windowManager.open( component(this.text));
            },
        } );
    }
})();

