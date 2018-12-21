let Utils = {
    getAttr : ( str, name ) => {
        if(name) {
            name = new RegExp( name + '=\"([^\"]+)\"' ).exec( str );
            return name ? window.decodeURIComponent( name[1] ) : '';
        }
    }
};



export default Utils;