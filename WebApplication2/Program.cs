var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
using (HttpClient client = new HttpClient())
{
    // �������� URL �� ���������� �������� Fluidd API
    string apiUrl = "\"http://192.168.5.7\"";
    
    // ��������� GET-������
    HttpResponseMessage response = await client.GetAsync(apiUrl);

    // ��������� ������
    if (response.IsSuccessStatusCode)
    {
        string responseData = await response.Content.ReadAsStringAsync();
        // ��������� ������ �� Fluidd API
    }
    else
    {
        // ��������� ������
    }
}
