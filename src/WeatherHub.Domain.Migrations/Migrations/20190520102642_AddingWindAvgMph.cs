// <copyright file="20190520102642_AddingWindAvgMph.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.Domain.Migrations.Migrations
{
    using Microsoft.EntityFrameworkCore.Migrations;

    public partial class AddingWindAvgMph : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "WindGustMph",
                table: "StationReading",
                newName: "WindAvgGustMph");

            migrationBuilder.AddColumn<float>(
                name: "WindAvgMph",
                table: "StationReading",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WindAvgMph",
                table: "StationReading");

            migrationBuilder.RenameColumn(
                name: "WindAvgGustMph",
                table: "StationReading",
                newName: "WindGustMph");
        }
    }
}
