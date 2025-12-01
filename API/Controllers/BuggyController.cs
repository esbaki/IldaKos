

using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BuggyController: BaseApiController
{
    [HttpGet("not-found")]
    public IActionResult GetNotFound()
    {
        return NotFound();
    } 
    [HttpGet("bad-request")]
    public IActionResult GetBadRequest()
    {
        return BadRequest("Bad Request");
    } 
    [HttpGet("unauthorized")]
    public IActionResult GetUnauthorized()
    {
        return Unauthorized();
    } 
    [HttpGet("validation-error")]
    public IActionResult GetValidationError()
    {
        ModelState.AddModelError("Problem1", "First Error");
        ModelState.AddModelError("Problem2", "Second Error");

        return ValidationProblem();
    } 
     [HttpGet("server-error")]
    public IActionResult GetServerError()
    {
        throw new Exception("server is fucked up");
    } 

}