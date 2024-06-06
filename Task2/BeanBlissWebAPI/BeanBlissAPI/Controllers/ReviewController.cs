using AutoMapper;
using BeanBlissAPI.DTO;
using BeanBlissAPI.Interfaces;
using BeanBlissAPI.Models;
using BeanBlissAPI.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.PortableExecutable;

namespace BeanBlissAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewRepository _reviewRepository;
        private readonly ICoffeeRepository _coffeeRepository;
        private readonly IMapper _mapper;

        public ReviewController(IReviewRepository reviewRepository, ICoffeeRepository coffeeRepository, 
            IMapper mapper)
        {
            _reviewRepository = reviewRepository;
            _coffeeRepository = coffeeRepository;
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult CreateReview(int coffeeId, [FromBody] ReviewDto reviewCreate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_coffeeRepository.CoffeeExists(coffeeId))
            {
                return NotFound("Coffee not found.");
            }

            var coffee = _coffeeRepository.GetCoffee(coffeeId);
            if (coffee == null)
            {
                ModelState.AddModelError("", "Coffee price is not available.");
                return BadRequest(ModelState);
            }

            var reviewMap = _mapper.Map<Review>(reviewCreate);
            reviewMap.Coffee = coffee;

            if (!_reviewRepository.CreateReview(reviewMap))
            {
                return StatusCode(500, "Failed to create review.");
            }

            return Ok("Successfully created");
        }


        [HttpGet("Drink/{drinkId}")]
        public IActionResult GetDrinkReviews(int drinkId)
        {
            var reviews = _reviewRepository.GetDrinkReviews(drinkId);

            if (reviews == null || !reviews.Any())
            {
                return NotFound();
            }

            return Ok(reviews);
        }

        [HttpGet("AverageRating/{drinkId}")]
        public IActionResult GetAverageRating(int drinkId)
        {
            var reviews = _reviewRepository.GetDrinkReviews(drinkId);

            if (reviews == null || !reviews.Any())
            {
                return NotFound();
            }

            double averageRating = reviews.Average(r => r.Rating);

            return Ok(averageRating);
        }
    }
}
