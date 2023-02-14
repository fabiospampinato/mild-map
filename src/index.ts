
/* IMPORT */

import {isWeakReferrable} from './utils';

/* MAIN */

class MildMap<K, V> {

  /* VARIABLES */

  #strong = new Map<K, V> ();
  #weak = new WeakMap<any, V> ();

  /* CONSTRUCTOR */

  constructor ( entries?: readonly (readonly [K, V])[] | null ) {

    if ( entries ) {

      for ( const [key, value] of entries ) {

        this.set ( key, value );

      }

    }

  }

  /* API */

  delete ( key: K ): boolean {

    if ( isWeakReferrable ( key ) ) {

      return this.#weak.delete ( key );

    } else {

      return this.#strong.delete ( key );

    }

  }

  get ( key: K ): V | undefined {

    if ( isWeakReferrable ( key ) ) {

      return this.#weak.get ( key );

    } else {

      return this.#strong.get ( key );

    }

  }

  has ( key: K ): boolean {

    if ( isWeakReferrable ( key ) ) {

      return this.#weak.has ( key );

    } else {

      return this.#strong.has ( key );

    }

  }

  set ( key: K, value: V ): this {

    if ( isWeakReferrable ( key ) ) {

      this.#weak.set ( key, value );

    } else {

      this.#strong.set ( key, value );

    }

    return this;

  }

}

/* EXPORT */

export default MildMap;
