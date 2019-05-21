export default class ReviewsSummary {

    constructor(reviewsSummary) {
        this.reviewsSummary = reviewsSummary;
    }

    getAvgRating() {
        return this.reviewsSummary.avgRating.rating;
    }

    getScaleForAvgRating() {
        return this.reviewsSummary.avgRating.scale;
    }

    getCount() {
        return this.reviewsSummary.count;
    }

    getType() {
        return "ReviewsSummary";
    }

}