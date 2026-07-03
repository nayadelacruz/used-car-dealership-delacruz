

import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import {
    createReview,
    getReviewById,
    getReviewsByUserId,
    editReview,
    deleteReview,
    getAllReviews
} from '../../models/forms/reviews.js';

const reviewValidation = [
    body('comment')
        .trim()
        .notEmpty()
        .withMessage('Review comment is required.')
        .isLength({ min: 5 })
        .withMessage('Review must be at least 5 characters long.')
];

const showReviewForm = (req, res) => {
    const { vehicleId } =req.params;
    res.render('forms/reviews/newReview', {
        title: 'Review',
        vehicleId
    });
};

// create new review has to be loggin
const handleReviewSubmission = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Store each validation error as a separate flash message
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        return res.redirect(`/reviews/new/${req.body.vehicleId}`);
    }

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
        const { reviewId } = req.params;
        const review = await getReviewById(reviewId);

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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });

        return res.redirect(`/reviews/edit/${req.params.reviewId}`);
    }

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

// employee and admin can see all reviews and can delete them


// see all reviews has to be an employee or a manager       

export {
    reviewValidation,
    showReviewForm,
    handleReviewSubmission,
    showUserReviews,
    showEditReviewForm,
    handleReviewEdit
};