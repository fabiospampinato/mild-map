
/* IMPORT */

import {SUPPORTS_SYMBOLS_AS_WEAKMAP_KEYS} from './constants';

/* IMPORT */

const isWeakReferrable = ( value: unknown ): value is object | symbol => {

  if ( value === null ) return false;

  const type = typeof value;

  return type === 'object' || type === 'function' || ( SUPPORTS_SYMBOLS_AS_WEAKMAP_KEYS && type === 'symbol' );

};

/* EXPORT */

export {isWeakReferrable};
