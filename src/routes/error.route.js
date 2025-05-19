export const error404Route = (req, res, next) => {
    const url = req.url;
    console.log(`Url: ${url} not defined.`);
    res.status(404).json({
        error: `Route '${url}' not defined in the server.`,
    });
};

export const error500Route = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
};
