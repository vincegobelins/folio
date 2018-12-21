import Utils from './../utils';

const Banner = data => ({
    title : 'Bandeau',
    body: [
        {
            label: 'Texte',
            name: 'text',
            type: 'textbox',
            value: Utils.getAttr( data, 'text' ),
        },
        {
            type: 'textbox',
            subtype: 'hidden',
            name: 'attachment_id',
            id: 'attachment_id',
            value: Utils.getAttr( data, 'id' ),
        },
        {
            label: 'Image',
            type: 'textbox',
            readonly : 1,
            name: 'attachment_title',
            id: 'attachment_title',
            value: Utils.getAttr( data, 'attachment_title' ),
        },
        {
            type: 'button',
            text: 'Choisir une image',
            label: ' ',
            onclick: function(e){
                e.preventDefault();
                var currentSelection = tinyMCE.activeEditor.selection.getNode();
                console.log(currentSelection);
                var id = $('#attachment_id');
                var title = $('#attachment_title');
                var custom_uploader = wp.media.frames.file_frame = wp.media({
                    title: 'Choisir une image',
                    button: {text: 'Ajouter une image'},
                    multiple: false
                });
                custom_uploader.on('select', function() {
                    var attachment = custom_uploader.state().get('selection').first().toJSON();

                    if(attachment.alt)
                        title.val(attachment.alt);
                    else if(attachment.title)
                        title.val(attachment.title);
                    else
                        title.val('Image sans titre');

                    id.val(attachment.id);
                    console.log(currentSelection);
                    tinyMCE.activeEditor.selection.select(currentSelection);
                });
                custom_uploader.open();
            }
        }
    ],
    onsubmit: function (e) {
        var balise = 'section-img';
        var out = '[' + balise;
        for ( var attr in e.data ) {
            out += ' ' + attr + '="' + e.data[ attr ] + '"';
        }
        out += '/]';
        console.log(tinyMCE.activeEditor);
        tinyMCE.activeEditor.insertContent( out );
    },
    balise: 'section-img',
    nom: 'section-img'
});

export default Banner;