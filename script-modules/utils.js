'use strict';

var utils = mp.utils;

function arguments2array(args) {
    return Array.prototype.slice.call(args).filter(function (v) { return v !== undefined });
}

function default_value (value, default_value) {
    return value === undefined ? default_value : value;
}

function empty(value) {
    if (value === undefined || value === null) {
        return true;
    }
    if (typeof value === 'string' && value === '') {
        return true;
    }
    if (Array.isArray(value) && value.length === 0) {
        return true;
    }
    return false;
}

function file_exist(file) {
    var info = utils.file_info(file);
    return typeof info === 'object' && info.is_file;
}

function read_file_lines(file, ignore_comments) {
    if (!file_exist(file)) {
        return undefined;
    }
    var ic = default_value(ignore_comments, true);
    var data = utils.read_file(file);
    if (typeof data !== 'string') {
        return undefined;
    }
    var lines = data.replace('\r', '').split('\n');
    var results = lines.filter(function (v) {
        var line = v.trim();
        return line !== '' && !(ic && line.indexOf('#') === 0);
    });
    return results;
}

module.exports = {
    arguments2array: arguments2array,
    default_value: default_value,
    empty: empty,
    file_exist: file_exist,
    read_file_lines: read_file_lines,
};
