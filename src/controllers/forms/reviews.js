import {
    createReview,
    getReviewById,
    getReviewsByUserId,
    editReview,
    deleteReview,
    getAllReviews,
    deleteReviewByAdmin
} from '../../models/forms/reviews.js';

const showReviewForm = (req, res) => {
    const { vehicleId } =req.params;
    res.render('forms/reviews/newReview', {
        title: 'Review',
        vehicleId
    });
};

// create new review has to be loggin
const handleReviewSubmission = async (req, res) => {
    try {
        const userId = req.session.user.id;
        // Extract validated data
        const {vehicleId, comment} = req.body;
        // Save to database
        await createReview(userId, vehicleId, comment);
        // After successfully saving to the database
        req.flash('success', 'Thank you for your review!');
        res.redirect(`/vehicles/${vehicleId}`);
    } catch (error) {
        console.error('Error saving review:', error);
        req.flash('error', 'Unable to submit your review. Please try again later.');
        res.redirect(`/reviews/new/${req.body.vehicleId}`);
    }
};


// user can see own reviews
const showUserReviews = async (req, res) => {
    try {
        const userId = req.session.user.id;

        const reviews = await getReviewsByUserId(userId);

        res.render('forms/reviews/userReviews', {
            title: 'My Reviews',
            reviews
        });
    } catch (error) {
        console.error('Error retrieving user reviews:', error);
        req.flash('error', 'Unable to retrieve your reviews.');
        res.redirect('/');
    }
};

//user can edit own reviews
const showEditReviewForm = async (req, res) => {
    try {
        //const { reviewId } = req.params;
        //const review = await getReviewById(reviewId);
        const { reviewId } = req.params;
        const userId = req.session.user.id;

        const review = await getReviewById(reviewId, userId);

        res.render('forms/reviews/editReview', {
            title: 'Edit Review',
            review
        });
    } catch (error) {
        console.error('Error loading edit review form:', error);
        req.flash('error', 'Unable to load edit review form.');
        res.redirect('/reviews/myReviews');
    }
};

const handleReviewEdit = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { comment } = req.body;

        await editReview(reviewId, comment);

        req.flash('success', 'Review updated successfully.');
        res.redirect('/reviews/myReviews');
    } catch (error) {
        console.error('Error updating review:', error);
        req.flash('error', 'Unable to update your review.');
        res.redirect('/reviews/myReviews');
    }
};

//user can delete own reviews
const handleDeleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const userId = req.session.user.id;

        await deleteReview(reviewId, userId);

        req.flash('success', 'Review deleted successfully.');
        res.redirect('/reviews/myReviews');

    } catch (error) {
        console.error('Error deleting review:', error);
        req.flash('error', 'Unable to delete your review.');
        res.redirect('/reviews/myReviews');
    }
};

// employee and admin can see all reviews and can delete them
const showAllReviews = async (req, res) => {
    try {
        const reviews = await getAllReviews();

        res.render('forms/reviews/allReviews', {
            title: 'Review Moderation',
            reviews
        });
    } catch (error) {
        console.error('Error loading all reviews:', error);
        req.flash('error', 'Unable to load reviews.');
        res.redirect('/dashboard');
    }
};

// delete reviews as employee or manager  
const handleAdminDeleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const deletedReview = await deleteReviewByAdmin(reviewId);

        if (!deletedReview) {
            req.flash('error', 'Review not found.');
            return res.redirect('/reviews/all');
        }

        req.flash('success', 'Review deleted successfully.');
        res.redirect('/reviews/all');
    } catch (error) {
        console.error('Error deleting review:', error);
        req.flash('error', 'Unable to delete review.');
        res.redirect('/reviews/all');
    }
};   

export {
    showReviewForm,
    handleReviewSubmission,
    showUserReviews,
    showEditReviewForm,
    handleReviewEdit,
    handleDeleteReview,
    showAllReviews,
    handleAdminDeleteReview
};