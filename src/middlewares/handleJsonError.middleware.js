export default function handleJsonError(err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({ error: "Invalid or empty JSON body" });
    }
    next(err);
}
