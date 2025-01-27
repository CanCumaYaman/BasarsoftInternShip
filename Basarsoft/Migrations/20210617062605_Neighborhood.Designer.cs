﻿// <auto-generated />
using Basarsoft.DataContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Basarsoft.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20210617062605_Neighborhood")]
    partial class Neighborhood
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.7")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Basarsoft.Models.Door", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DoorNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NeighborhoodNumber")
                        .HasColumnType("int");

                    b.Property<double>("x")
                        .HasColumnType("float");

                    b.Property<double>("y")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.ToTable("Doors");
                });
#pragma warning restore 612, 618
        }
    }
}
