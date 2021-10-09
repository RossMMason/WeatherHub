// <copyright file="20190509220700_InitialCreate.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.Domain.Migrations.Migrations
{
    using System;
    using Microsoft.EntityFrameworkCore.Migrations;

    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WeatherStations",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Latitudue = table.Column<float>(nullable: false),
                    Longitude = table.Column<float>(nullable: false),
                    AltitudeM = table.Column<float>(nullable: false),
                    Name = table.Column<string>(maxLength: 50, nullable: true),
                    LocationDescriptionHtml = table.Column<string>(maxLength: 999999, nullable: true),
                    StationContact = table.Column<string>(maxLength: 50, nullable: true),
                    FetcherType = table.Column<string>(maxLength: 100, nullable: true),
                    Version = table.Column<byte[]>(rowVersion: true, nullable: true),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeatherStations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FetcherSetting",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    StationId = table.Column<Guid>(nullable: true),
                    Key = table.Column<string>(maxLength: 50, nullable: true),
                    Value = table.Column<string>(maxLength: 500, nullable: true),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FetcherSetting", x => x.Id)
                        .Annotation("SqlServer:Clustered", false);
                    table.ForeignKey(
                        name: "FK_FetcherSetting_WeatherStations_StationId",
                        column: x => x.StationId,
                        principalTable: "WeatherStations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "StationDayStatistics",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    StationId = table.Column<Guid>(nullable: true),
                    Date = table.Column<DateTime>(type: "date", nullable: false),
                    DewpointHighC = table.Column<float>(nullable: false),
                    DewpointHighTime = table.Column<TimeSpan>(nullable: false),
                    DewpointLowC = table.Column<float>(nullable: false),
                    DewpointLowTime = table.Column<TimeSpan>(nullable: false),
                    HeatIndexHighC = table.Column<float>(nullable: false),
                    HeatIndexHighTime = table.Column<TimeSpan>(nullable: false),
                    PressureHighMbar = table.Column<float>(nullable: false),
                    PressureHighTime = table.Column<TimeSpan>(nullable: false),
                    PressureLowMbar = table.Column<float>(nullable: false),
                    PressureLowTime = table.Column<TimeSpan>(nullable: false),
                    TotalRainCm = table.Column<float>(nullable: false),
                    RainRateHighCmPerHour = table.Column<float>(nullable: false),
                    RelativeHumidityHigh = table.Column<float>(nullable: false),
                    RelativeHumidyHighTime = table.Column<TimeSpan>(nullable: false),
                    RelativeHumidityLow = table.Column<float>(nullable: false),
                    RelativeHumidyLowTime = table.Column<TimeSpan>(nullable: false),
                    TempHighC = table.Column<float>(nullable: false),
                    TempHighTime = table.Column<TimeSpan>(nullable: false),
                    TempLowC = table.Column<float>(nullable: false),
                    TempLowTime = table.Column<TimeSpan>(nullable: false),
                    WindHighMph = table.Column<float>(nullable: false),
                    WindHighTime = table.Column<TimeSpan>(nullable: false),
                    WindChillLowC = table.Column<float>(nullable: false),
                    WindChillLowTime = table.Column<TimeSpan>(nullable: false),
                    Version = table.Column<byte[]>(rowVersion: true, nullable: true),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StationDayStatistics", x => x.Id)
                        .Annotation("SqlServer:Clustered", false);
                    table.ForeignKey(
                        name: "FK_StationDayStatistics_WeatherStations_StationId",
                        column: x => x.StationId,
                        principalTable: "WeatherStations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "StationReading",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    StationId = table.Column<Guid>(nullable: true),
                    When = table.Column<DateTime>(nullable: false),
                    DewpointC = table.Column<float>(nullable: false),
                    HeatIndexC = table.Column<float>(nullable: false),
                    PressureMb = table.Column<float>(nullable: false),
                    RelativeHumidity = table.Column<float>(nullable: false),
                    TempC = table.Column<float>(nullable: false),
                    WindDegrees = table.Column<float>(nullable: false),
                    WindMph = table.Column<float>(nullable: false),
                    WindGustMph = table.Column<float>(nullable: false),
                    WindChillC = table.Column<float>(nullable: false),
                    RainCmPerHour = table.Column<float>(nullable: false),
                    Version = table.Column<byte[]>(rowVersion: true, nullable: true),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StationReading", x => x.Id)
                        .Annotation("SqlServer:Clustered", false);
                    table.ForeignKey(
                        name: "FK_StationReading_WeatherStations_StationId",
                        column: x => x.StationId,
                        principalTable: "WeatherStations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FetcherSetting_StationId_Key",
                table: "FetcherSetting",
                columns: new[] { "StationId", "Key" },
                unique: true)
                .Annotation("SqlServer:Clustered", true);

            migrationBuilder.CreateIndex(
                name: "IX_StationDayStatistics_StationId_Date",
                table: "StationDayStatistics",
                columns: new[] { "StationId", "Date" },
                unique: true)
                .Annotation("SqlServer:Clustered", true);

            migrationBuilder.CreateIndex(
                name: "IX_StationReading_StationId_When",
                table: "StationReading",
                columns: new[] { "StationId", "When" },
                unique: true)
                .Annotation("SqlServer:Clustered", true);

            migrationBuilder.CreateIndex(
                name: "IX_WeatherStations_Name",
                table: "WeatherStations",
                column: "Name");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FetcherSetting");

            migrationBuilder.DropTable(
                name: "StationDayStatistics");

            migrationBuilder.DropTable(
                name: "StationReading");

            migrationBuilder.DropTable(
                name: "WeatherStations");
        }
    }
}
