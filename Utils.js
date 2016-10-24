function typeCheck (types, args) {
    var status = true;
    for ( var i=0;i<types.length;i++)  {
        if (types[i] != args[i].constructor.name ) {
             alert('Error: ' + types[i] + ' expected ' + args[i].constructor.name + ' given!');
             status = false;
        }
    }
    return status;
}

