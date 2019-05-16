const Environment = () => {
    if (process.env.NODE_ENV === "development") {
        return {
            apiUrl: "http://localhost:8080/person/arbeidsforhold-api",
            tjenesteUrl: "https://tjenester-q0.nav.no",
            loginUrl: "http://localhost:8080/personbruker-api/local/cookie",
            logoutUrl: "#"
        };
    }
    if (window.location.hostname.indexOf("www-q0") > -1) {
        return {
            apiUrl: "https://www-q0.nav.no/person/arbeidsforhold-api",
            tjenesteUrl: "https://tjenester-q0.nav.no",
            loginUrl: "https://loginservice-q.nav.no/login",
            logoutUrl: "https://loginservice-q.nav.no/slo"
        };
    }
    return {
        apiUrl: "https://www.nav.no/person/arbeidsforhold-api",
        tjenesteUrl: "https://tjenester.nav.no",
        loginUrl: "https://loginservice.nav.no/login",
        logoutUrl: "https://loginservice.nav.no/slo"
    };
};

export default Environment;
