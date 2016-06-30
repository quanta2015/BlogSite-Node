/*权限验证中间件*/
'use strict';

module.exports = {
    /**
     * 登陆权限验证
     */
    isAuthenticated: function (req, res, next) {
        if(typeof(req.session.user) != 'undefined') {
            return next();
        }else{
            res.redirect('/');
        }
    }
};