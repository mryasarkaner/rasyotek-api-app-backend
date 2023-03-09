using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using workApiApp.Model;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.



builder.Services.AddControllers();
builder.Services.AddDbContext<EmployeeContext>(Options =>
Options.UseSqlServer(builder.Configuration.GetConnectionString("S")));





builder.Services.AddCors(cors => cors.AddPolicy("MyPolicy", builder => {
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
}));


var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseRouting();
app.UseCors("MyPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();

