using System;
using Core.Entity;
using Core.Errors;

namespace Infrastructure.Models.Response
{
  public class CompetitionUserResponse
  {
    public CompetitionUserResponse(User user)
    {
      UserId = user.UserId;
      Name = user.Name;
    }

    public CompetitionUserResponse(ParticipationRequest participationRequest)
    {
      if (participationRequest.User.Name == null)
      {
        throw new ApiError(500, "User's name is not included in request.");
      }
      UserId = participationRequest.UserId;
      Name = participationRequest.User.Name;
    }

    public CompetitionUserResponse(Invitation invitation)
    {
      if (invitation.User.Name == null)
      {
        throw new ApiError(500, "User's name is not included in request.");
      }
      UserId = invitation.UserId;
      Name = invitation.User.Name;
    }

    public Guid UserId { get; set; }
    public string Name { get; set; }
  }
}