

exports.paginatedResults = (model) => {
    return async (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const results = {};
        let totalCount = 0;

        if (endIndex < await model.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }



        try {
            if (req.query.search) {
                const search_key = req.query.search;
                results.results = await model
                    .find({ title: new RegExp(search_key, 'i') })
                    .select('-__v')
                    .limit(limit)
                    .skip(startIndex)
                    .exec();
            }
            if (req.query.genre) {
                const genre_key = req.query.genre;
                results.results = await model
                    .find({ genre: new RegExp(genre_key, 'i') })
                    .select('-__v')
                    .limit(limit)
                    .skip(startIndex)
                    .exec();

            }
            else {
                results.results = await model
                    .find().select('-__v')
                    .limit(limit)
                    .skip(startIndex)
                    .exec();
            }

            if (Object.keys(results.results).length === 0) {
                res.status(404).json({ status: 404, message: 'Not found' });
            }
            else {
                totalCount = await results.results.length;
                results.countFound = totalCount;
                res.paginatedResults = results;
                next()
            }

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}