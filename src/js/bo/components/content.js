import Utils from './../utils';

const Content = data => ({
        title : 'Contenu',
        body: [
            {
                label: 'Type d\'article(s)',
                name: 'post_type',
                type: 'listbox',
                values : [
                    { text: 'Fiches', value: 'fiche' },
                ],
                value: Utils.getAttr( data, 'post_type' ),
            },
            {
                label: 'Nombre d\'article(s)',
                name: 'post_per_page',
                type: 'textbox',
                tooltip: 'Nombre d\'article(s)',
                value: Utils.getAttr( data, 'post_per_page' ),
            },
            {
                label: 'Ordonné par',
                name: 'post_orderby',
                type: 'listbox',
                values : [
                    { text: 'Au hasard', value: 'rand' },
                    { text: 'Titre', value: 'title' },
                    { text: 'Date de publication', value: 'date' },
                ],
                value: Utils.getAttr( data, 'post_order' ),
            },
            {
                label: 'Ordre',
                name: 'post_order',
                type: 'listbox',
                values : [
                    { text: '', value: '' },
                    { text: 'Croissant', value: 'asc' },
                    { text: 'Décroissant', value: 'desc' },
                ],
                value: Utils.getAttr( data, 'post_order' ),
            }
        ],
        onsubmit: function (e) {
            var balise = 'cpt';
            var out = '[' + balise;
            for ( var attr in e.data ) {
                out += ' ' + attr + '="' + e.data[ attr ] + '"';
            }
            out += '/]';
            tinyMCE.activeEditor.insertContent( out );
        },
        balise: 'cpt',
        nom: 'contenu'
});

export default Content;