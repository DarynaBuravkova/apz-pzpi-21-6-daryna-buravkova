using AutoMapper;
using BeanBlissAPI.DTO;
using BeanBlissAPI.Interfaces;
using BeanBlissAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BeanBlissAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegionController : ControllerBase
    {
        private readonly IRegionRepository _regionRepository;
        private readonly IMapper _mapper;

        public RegionController(IRegionRepository regionRepository,
            IMapper mapper)
        {
            _regionRepository = regionRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Region>))]
        public IActionResult GetRegions()
        {
            var regions = _mapper.Map<List<RegionDto>>(_regionRepository.GetRegions());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(regions);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Region))]
        [ProducesResponseType(400)]
        public IActionResult GetRegion(int id)
        {
            if (!_regionRepository.RegionExists(id))
                return NotFound();

            var region = _mapper.Map<RegionDto>(_regionRepository.GetRegion(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(region);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateRegion([FromBody] RegionDto regionCreate)
        {
            if (regionCreate == null)
                return BadRequest(ModelState);

            var region = _regionRepository.GetRegions()
                .Where(a => a.City.Trim().ToUpper() == regionCreate.City.TrimEnd().ToUpper())
                .FirstOrDefault();

            if (region != null)
            {
                ModelState.AddModelError("", "Region already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var regionMap = _mapper.Map<Region>(regionCreate);


            if (!_regionRepository.CreateRegion(regionMap))
            {
                ModelState.AddModelError("", "Something went wrong while savin");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully created");
        }

        [HttpPut("{id}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateRegion(int id, [FromBody] RegionDto updatedRegion)
        {
            if (updatedRegion == null)
                return BadRequest(ModelState);

            if (id != updatedRegion.Id)
                return BadRequest(ModelState);

            if (!_regionRepository.RegionExists(id))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest();

            var regionMap = _mapper.Map<Region>(updatedRegion);

            if (!_regionRepository.UpdateRegion(regionMap))
            {
                ModelState.AddModelError("", "Something went wrong updating category");
                return StatusCode(500, ModelState);
            }

            return Ok("Changed");
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteRegion(int id)
        {
            if (!_regionRepository.RegionExists(id))
            {
                return NotFound();
            }

            var RegionToDelete = _regionRepository.GetRegion(id);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_regionRepository.DeleteRegion(RegionToDelete))
            {
                ModelState.AddModelError("", "Something went wrong deleting owner");
            }

            return Ok("Deleted");
        }
    }
}
