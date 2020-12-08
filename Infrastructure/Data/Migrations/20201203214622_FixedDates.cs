using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Data.Migrations
{
    public partial class FixedDates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CompetitionGoals",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    Duration = table.Column<int>(nullable: false),
                    StartTime = table.Column<DateTime>(nullable: false),
                    Type = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Units = table.Column<string>(maxLength: 20, nullable: true),
                    Frequency = table.Column<int>(nullable: false),
                    isHighestScoreWins = table.Column<bool>(nullable: false),
                    IsPrivate = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompetitionGoals", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    Email = table.Column<string>(maxLength: 50, nullable: false),
                    Password = table.Column<string>(nullable: false),
                    RegisterDate = table.Column<DateTime>(nullable: false),
                    IsSearchable = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CompetitionAdminRequests",
                columns: table => new
                {
                    CompId = table.Column<Guid>(nullable: false),
                    ParticipantId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompetitionAdminRequests", x => new { x.CompId, x.ParticipantId });
                    table.ForeignKey(
                        name: "FK_CompetitionAdminRequests_CompetitionGoals_CompId",
                        column: x => x.CompId,
                        principalTable: "CompetitionGoals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CompetitionAdminRequests_Users_ParticipantId",
                        column: x => x.ParticipantId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CompetitionAdmins",
                columns: table => new
                {
                    CompId = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompetitionAdmins", x => new { x.CompId, x.UserId });
                    table.ForeignKey(
                        name: "FK_CompetitionAdmins_CompetitionGoals_CompId",
                        column: x => x.CompId,
                        principalTable: "CompetitionGoals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CompetitionAdmins_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CompetitionComments",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CompId = table.Column<Guid>(nullable: false),
                    Body = table.Column<string>(nullable: false),
                    AuthorId = table.Column<Guid>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompetitionComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompetitionComments_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CompetitionComments_CompetitionGoals_CompId",
                        column: x => x.CompId,
                        principalTable: "CompetitionGoals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CompetitionInvites",
                columns: table => new
                {
                    CompId = table.Column<Guid>(nullable: false),
                    InviteeId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompetitionInvites", x => new { x.CompId, x.InviteeId });
                    table.ForeignKey(
                        name: "FK_CompetitionInvites_CompetitionGoals_CompId",
                        column: x => x.CompId,
                        principalTable: "CompetitionGoals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CompetitionInvites_Users_InviteeId",
                        column: x => x.InviteeId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CompetitionParticipantRequests",
                columns: table => new
                {
                    CompId = table.Column<Guid>(nullable: false),
                    RequesterId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompetitionParticipantRequests", x => new { x.CompId, x.RequesterId });
                    table.ForeignKey(
                        name: "FK_CompetitionParticipantRequests_CompetitionGoals_CompId",
                        column: x => x.CompId,
                        principalTable: "CompetitionGoals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CompetitionParticipantRequests_Users_RequesterId",
                        column: x => x.RequesterId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CompetitionParticipants",
                columns: table => new
                {
                    CompId = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    Ledger = table.Column<string>(nullable: true),
                    InitialValue = table.Column<decimal>(nullable: true),
                    Target = table.Column<decimal>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompetitionParticipants", x => new { x.CompId, x.UserId });
                    table.ForeignKey(
                        name: "FK_CompetitionParticipants_CompetitionGoals_CompId",
                        column: x => x.CompId,
                        principalTable: "CompetitionGoals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CompetitionParticipants_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserFriendRequests",
                columns: table => new
                {
                    SenderId = table.Column<Guid>(nullable: false),
                    ReceiverId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserFriendRequests", x => new { x.SenderId, x.ReceiverId });
                    table.ForeignKey(
                        name: "FK_UserFriendRequests_Users_ReceiverId",
                        column: x => x.ReceiverId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserFriendRequests_Users_SenderId",
                        column: x => x.SenderId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserFriendships",
                columns: table => new
                {
                    User1Id = table.Column<Guid>(nullable: false),
                    User2Id = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserFriendships", x => new { x.User1Id, x.User2Id });
                    table.ForeignKey(
                        name: "FK_UserFriendships_Users_User1Id",
                        column: x => x.User1Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserFriendships_Users_User2Id",
                        column: x => x.User2Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserGoals",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    Duration = table.Column<int>(nullable: false),
                    StartTime = table.Column<DateTime>(nullable: false),
                    Type = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Units = table.Column<string>(maxLength: 20, nullable: true),
                    Target = table.Column<decimal>(nullable: false),
                    IsPrivate = table.Column<bool>(nullable: false),
                    Ledger = table.Column<string>(nullable: true),
                    InitialValue = table.Column<decimal>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGoals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserGoals_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserNotifications",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    Message = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserNotifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserNotifications_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CompetitionAdminRequests_ParticipantId",
                table: "CompetitionAdminRequests",
                column: "ParticipantId");

            migrationBuilder.CreateIndex(
                name: "IX_CompetitionAdmins_UserId",
                table: "CompetitionAdmins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_CompetitionComments_AuthorId",
                table: "CompetitionComments",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_CompetitionComments_CompId",
                table: "CompetitionComments",
                column: "CompId");

            migrationBuilder.CreateIndex(
                name: "IX_CompetitionInvites_InviteeId",
                table: "CompetitionInvites",
                column: "InviteeId");

            migrationBuilder.CreateIndex(
                name: "IX_CompetitionParticipantRequests_RequesterId",
                table: "CompetitionParticipantRequests",
                column: "RequesterId");

            migrationBuilder.CreateIndex(
                name: "IX_CompetitionParticipants_UserId",
                table: "CompetitionParticipants",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserFriendRequests_ReceiverId",
                table: "UserFriendRequests",
                column: "ReceiverId");

            migrationBuilder.CreateIndex(
                name: "IX_UserFriendships_User2Id",
                table: "UserFriendships",
                column: "User2Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserGoals_UserId",
                table: "UserGoals",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserNotifications_UserId",
                table: "UserNotifications",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CompetitionAdminRequests");

            migrationBuilder.DropTable(
                name: "CompetitionAdmins");

            migrationBuilder.DropTable(
                name: "CompetitionComments");

            migrationBuilder.DropTable(
                name: "CompetitionInvites");

            migrationBuilder.DropTable(
                name: "CompetitionParticipantRequests");

            migrationBuilder.DropTable(
                name: "CompetitionParticipants");

            migrationBuilder.DropTable(
                name: "UserFriendRequests");

            migrationBuilder.DropTable(
                name: "UserFriendships");

            migrationBuilder.DropTable(
                name: "UserGoals");

            migrationBuilder.DropTable(
                name: "UserNotifications");

            migrationBuilder.DropTable(
                name: "CompetitionGoals");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
