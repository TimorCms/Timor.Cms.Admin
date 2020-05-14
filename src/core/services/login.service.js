var loginService = (function (window) {
    var sessionName = "session";

    var getSession = function () {
        let sessionString = window.localStorage.getItem(sessionName);

        if (!sessionString) {
            return null;
        }

        let session = JSON.parse(sessionString);

        return session;
    };

    return {
        isLogin() {
            var session = getSession();

            if (!session) {
                return false;
            }

            var now = new Date();
            now.setSeconds(now.getSeconds() - 5 * 60);

            if (session && session.token && new Date(session.expireDate) > now) {
                return true;
            }

            return false;
        },
        login(session) {
            var now = new Date();
            session.expireDate = now.setSeconds(
                new Date().getSeconds() + session.expireInSeconds
            );

            window.localStorage.setItem(sessionName, JSON.stringify(session));
        },
        logout() {
            window.localStorage.removeItem(sessionName);
        },
        getToken() {
            var session = getSession();
            
            if (!session) {
                return null;
            }
            return session.tokenType + " " + session.token;
        }
    };
})(window);

export default loginService;
