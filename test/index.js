
/* IMPORT */

import {describe} from 'fava';
import {setTimeout as delay} from 'node:timers/promises';
import MildMap from '../dist/index.js';

/* MAIN */

describe ( 'MildMap', it => {

  it ( 'works', async t => {

    const map = new MildMap ();

    let primitive = 0;
    let object = {};

    t.is ( map.size, 0 );

    t.is ( map.get ( primitive ), undefined );
    t.is ( map.get ( object ), undefined );

    t.false ( map.has ( primitive ) );
    t.false ( map.has ( object ) );

    t.false ( map.delete ( primitive ) );
    t.false ( map.delete ( object ) );

    map.set ( primitive, 'primitive' );
    map.set ( object, 'object' );

    t.is ( map.size, 2 );

    t.is ( map.get ( primitive ), 'primitive' );
    t.is ( map.get ( object ), 'object' );

    t.true ( map.has ( primitive ) );
    t.true ( map.has ( object ) );

    t.true ( map.delete ( primitive ) );
    t.true ( map.delete ( object ) );

    t.is ( map.size, 0 );

    map.set ( primitive, 'primitive' );
    map.set ( object, 'object' );

    t.is ( map.size, 2 );

    /* CLEANUP */

    let deleted = 0;

    const registry = new FinalizationRegistry ( () => deleted++ );

    registry.register ( object );

    object = null;

    await delay ( 500 );
    global.gc ();
    await delay ( 500 );

    t.is ( deleted, 1 );
    t.is ( map.size, 1 );

  });

});
