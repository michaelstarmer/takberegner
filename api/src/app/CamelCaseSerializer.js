'use strict'

const  VanillaSerializer = require('@adonisjs/lucid/src/Lucid/Serializers/Vanilla');
const _ = require('lodash');

class CamelCaseSerializer extends VanillaSerializer {

  toJSON () {
    const output = super.toJSON();
    
    this._identifyAndScan(output, true);

    return output;
  }

  _identifyAndScan (output, scanDeep = false) {
    if (typeof output === 'object' && scanDeep) {
        if (Array.isArray(output)) {
          return this._scanArray(output);
        } 
        return this._scanObjectAndRenameKeys(output);
    }
  }

  _scanArray (array) {
    for (let i = 0; i < array.length; i++) {
        this._identifyAndScan(array[i], true);
    }
  }

  _scanObjectAndRenameKeys (object) {
      for (const key in object) {
        // this._identifyAndScan(object[key]);
        const newKey = this._renameKey(key);

        if (newKey !== key) {
          object[this._renameKey(key)] = object[key];
          delete object[key];
        }
      }
  }

  _renameKey (key) {
    return this._toCamelCase(key);
  }

  _toCamelCase (string) {
    return string[0] + _.camelCase(string.slice(1)).replace(/Id$/, 'ID');
  }

  toJSONRaw () {
    return super.toJSON();
  }
}

module.exports = CamelCaseSerializer