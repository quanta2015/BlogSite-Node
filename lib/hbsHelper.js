var moment = require('moment');

'use strict';

moment.locale('zh-cn');

module.exports = {

    timeFromNow: function (date) {
        return moment(date).fromNow();
    },

    formatDate: function (date) {
        return moment(date).format('LL');  ;
    },

    number: function(value) {
        return Number(value);
    }
};