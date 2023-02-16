
/* IMPORT */

import {isWeakReferable} from 'is';

/* HELPERS */

const isWeakabe = ( value: unknown ): value is object => { //FIXME: Overridden type guard for convenience, delete this once TS updates its types
  return isWeakReferable ( value );
};

/* MAIN */

class MildMap<K, V> {

  /* VARIABLES */

  #strong = new Map<K, V> ();
  #weak = new WeakMap<any, V> ();
  #size = 0;

  #finalizationRegistry = new FinalizationRegistry ( () => this.#size -= 1 );
  #finalizationTokens = new WeakMap<object, object> ();

  /* CONSTRUCTOR */

  constructor ( entries?: readonly (readonly [K, V])[] | null ) {

    if ( entries ) {

      for ( const [key, value] of entries ) {

        this.set ( key, value );

      }

    }

  }

  /* GETTER API */

  get size () {

    return this.#size;

  }

  /* API */

  delete ( key: K ): boolean {

    const hasKey = this.has ( key );

    if ( !hasKey ) return false;

    this.#size -= 1;

    if ( isWeakabe ( key ) ) {

      const token = this.#finalizationTokens.get ( key );

      if ( token ) {

        this.#finalizationRegistry.unregister ( token );
        this.#finalizationTokens.delete ( key );

      }

      return this.#weak.delete ( key );

    } else {

      return this.#strong.delete ( key );

    }

  }

  get ( key: K ): V | undefined {

    if ( isWeakabe ( key ) ) {

      return this.#weak.get ( key );

    } else {

      return this.#strong.get ( key );

    }

  }

  has ( key: K ): boolean {

    if ( isWeakabe ( key ) ) {

      return this.#weak.has ( key );

    } else {

      return this.#strong.has ( key );

    }

  }

  set ( key: K, value: V ): this {

    const hasKey = this.has ( key );

    if ( !hasKey ) {

      this.#size += 1;

    }

    if ( isWeakabe ( key ) ) {

      this.#weak.set ( key, value );

      if ( !hasKey ) {

        const token = {};

        this.#finalizationRegistry.register ( key, token, token );
        this.#finalizationTokens.set ( key, token );

      }

    } else {

      this.#strong.set ( key, value );

    }

    return this;

  }

}

/* EXPORT */

export default MildMap;
