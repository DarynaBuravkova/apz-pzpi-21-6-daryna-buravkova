import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function CoffeeConcretePage() {
    const { id } = useParams();
    const coffeeId = id;

    const [coffee, setCoffee] = useState(null);
    const [averageRating, setAverageRating] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`https://localhost:7256/api/Coffee/${coffeeId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setCoffee(data))
            .catch(error => console.error('Error fetching coffee:', error));

        fetch(`https://localhost:7256/api/Review/AverageRating/${coffeeId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setAverageRating(data))
            .catch(error => console.error('Error fetching average rating:', error));

        fetch(`https://localhost:7256/api/Review/Drink/${coffeeId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setReviews(data);
                } else {
                    console.error('Expected an array of reviews but got:', data);
                    setReviews([]);
                }
            })
            .catch(error => console.error('Error fetching reviews:', error));
    }, [coffeeId]);

    const handleAddReview = (review) => {
        fetch(`https://localhost:7256/api/Review?coffeeId=${coffeeId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setReviews(prevReviews => [...prevReviews, data]);
        })
        .catch(error => console.error('Error adding review:', error));
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Інформація про каву</h2>
            <div className="row mb-4">
                <div className="col-md-6">
                    {coffee ? (
                        <div className="card">
                            <div className="card-body">
                                <h4>{coffee.name}</h4>
                                <p>Тип: {coffee.type}</p>
                                <p>Об'єм: {coffee.bulk} мл</p>
                                <p>Ціна: {coffee.price} грн.</p>
                                <p>Опис: {coffee.description}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center">Завантаження інформації про каву...</p>
                    )}
                </div>
                <div className="col-md-6">
                    {averageRating !== null ? (
                        <div className="card">
                            <div className="card-body">
                                <h4>Загальний рейтинг</h4>
                                <p>Середній рейтинг: {averageRating}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="card">
                            <div className="card-body">
                                <h4>Загальний рейтинг</h4>
                                <p className="text-center">Завантаження середнього рейтингу...</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="row justify-content-center mb-4">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h4>Коментарі та рейтинги</h4>
                            <ReviewList reviews={reviews} />
                            <AddReviewForm coffeeId={coffeeId} onAddReview={handleAddReview} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ReviewList({ reviews }) {
    if (!Array.isArray(reviews) || reviews.length === 0) {
        return <p>Немає відгуків для цього напою.</p>;
    }

    return (
        <ul className="list-unstyled">
            {reviews.map(review => (
                <li key={review.id} className="mb-3">
                    <div className="card">
                        <div className="card-body">
                            <p><strong>Рейтинг:</strong> {review.rating}</p>
                            <p><strong>Коментар:</strong> {review.feedback}</p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}

function AddReviewForm({ coffeeId, onAddReview }) {
    const [rating, setRating] = useState(5);
    const [feedback, setFeedback] = useState('');

    const handleRatingChange = (event) => {
        setRating(parseInt(event.target.value));
    };

    const handleFeedbackChange = (event) => {
        setFeedback(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const review = { id: 0, coffeeId: parseInt(coffeeId), rating, feedback };
        onAddReview(review);
        setRating(5);
        setFeedback('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Рейтинг:</label>
                <select className="form-control" value={rating} onChange={handleRatingChange}>
                    {[1, 2, 3, 4, 5].map(value => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Коментар:</label>
                <textarea className="form-control" value={feedback} onChange={handleFeedbackChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Додати коментар</button>
        </form>
    );
}

export default CoffeeConcretePage;
