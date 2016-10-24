/*CCM Class is an attempt to apply the requirements of OOP (as remembered in
 * my head) later on as informed by an actual specification to javascript.  In
 * other words, I am trying to shape javascript into an OOP environment.
 */

function CCM_Class () {
    var prot = {};    
    var CONSTANTS =function () {
        var data = new Array();
        this.get = function(key) {
            return data[key];
        }
    };
    
    this.constants = new CONSTANTS();
    /* The extender method is a closure acting as a method factory.
     from which each subclass will create their own extend method.
     n.b. extender returns extend (everything's an object in JS!)
    */
    this.implementer = function ( ) {
        var implement = function ( child ) {
            for ( var parent_key in this ){
                key_found = false;
                for ( var child_key in child ) {
                    if ( child_key === parent_key ) {
                        key_found = true;
                        break;
                    }
                }
                if ( !key_found ) {
                    alert ( 'Class must implement ' + parent_key + '.' );                        
                }
            }     
        }
        return implement;
    }
   /*
     The extend method will in turn pass extender on to the subclass.
    */
    this.extender  = function ( parent_prot ) {
        var extend = function ( child, child_prot ) { 
            if ( child.abstract === true ) {
                alert ('You cannot instantiate an abstract class');
            }       
            for ( var parent_key in this ){
                key_found = false;
                for ( var child_key in child ) {
                    if ( child_key === parent_key ) {
                        key_found = true;
                        break;
                    }
                }
                if ( !key_found ) {
                    if ( this.abstract === true && this[parent_key] === 'abstract' ) {
                          alert ( 'Parent class is abstract. ' + parent_key + ' must be implemented by child ' );
                    } else {
                        child[parent_key] = this[parent_key];
                    }        
                }
            }        
            if ( parent_prot ) {
                for ( prot_key in parent_prot ) {
                    var prot_key_found = false;
                    for ( child_key in child_prot ) {
                        if ( prot_key === child_key ) {
                          parent_prot[prot_key] = child_prot[child_key];
                          prot_key_found = true;
                          break;
                        }
                    }
                    if ( !prot_key_found ) {
                        child_prot[prot_key] = parent_prot[prot_key];
                    }
                }
            }
        };
        return extend;
    };   
    this.extend = this.extender ( prot );
    this.implement = this.implementer ( );
}


