class APIFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        let keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {};

        this.query.find({...keyword})
        return this;
    }

    filter(){
        const queryStrFilter = { ...this.queryStr };

        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach( field => delete queryStrFilter[field]);

        let queryStr = JSON.stringify(queryStrFilter)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)/g, match => `$${match}`)
        // console.log(queryStr);

        this.query.find(JSON.parse(queryStr));

        return this;
    }

    paginate(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1)
        this.query.limit(resultPerPage).skip(skip)
        return this;
    }
}

module.exports = APIFeatures