using Microsoft.EntityFrameworkCore.Migrations;

namespace WebGal.Migrations
{
    public partial class ProfileModelEdited : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProfileInfo",
                table: "Profiles",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProfileName",
                table: "Profiles",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProfilePicturePath",
                table: "Profiles",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserID",
                table: "Profiles",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProfileInfo",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "ProfileName",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "ProfilePicturePath",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "Profiles");
        }
    }
}
