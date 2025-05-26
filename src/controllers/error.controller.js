class ErrorController {
    error404 = (req, res, next) => {
        const url = req.url;
        console.log(`Url: ${url} not defined.`);
        console.log(url);

        res.status(404).render("error", {
            message: `Route '${url}' not defined in the server.`,
        });
    };
    error500 = (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json("error", {
            message: `Something went wrong!: ${err.message}`,
        });
    };
}

export default new ErrorController();
