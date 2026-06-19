const addLocalVariables = (req, res, next) => {
    // Make NODE_ENV available to all templates
    res.locals.NODE_ENV = process.env.NODE_ENV.toLowerCase() || 'production';
    next();
}