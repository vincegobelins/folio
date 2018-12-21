import Utils from './../utils';

const SVG = data => ({
    title : 'SVG',
    body: [
        {
            label: 'Type d\'article(s)',
            name: 'title',
            type: 'listbox',
            values : [
                { text: 'Logo', value: 'logo' },
                { text: 'Utilisateur', value: 'user' },
                { text: 'Graphiques', value: 'charts' },
                { text: 'Trophé', value: 'win' },
            ],
            value: Utils.getAttr( data, 'title' ),
        },
        {
            label: 'Largeur',
            name: 'width',
            type: 'textbox',
            tooltip: 'En pixel',
            value: Utils.getAttr( data, 'width' ),
        },
        {
            label: 'Hauteur',
            name: 'height',
            type: 'textbox',
            tooltip: 'En pixel',
            value: Utils.getAttr( data, 'height' ),
        }
    ],
    onsubmit: function (e) {
        var balise = 'svg';
        var out = '[' + balise;
        for ( var attr in e.data ) {
            out += ' ' + attr + '="' + e.data[ attr ] + '"';
        }
        out += '/]';
        tinyMCE.activeEditor.insertContent( out );
    },
    balise: 'svg',
    nom: 'svg'
});

export default SVG;