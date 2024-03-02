using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Net.Http;
using System.Threading.Tasks;

public class FluiddDataModel : PageModel
{
    public async Task OnGet()
    {
        using (HttpClient client = new HttpClient())
        {
            // Замените URL на актуальный эндпоинт Fluidd API
            string apiUrl = "http://192.168.5.7";

            // Выполните GET-запрос
            HttpResponseMessage response = await client.GetAsync(apiUrl);

            // Обработка ответа
            if (response.IsSuccessStatusCode)
            {
                string responseData = await response.Content.ReadAsStringAsync();
                // Обработка данных от Fluidd API, например, сохранение их в свойство модели для передачи в представление
                ViewData["FluiddData"] = responseData;
            }
            else
            {
                // Обработка ошибок
            }
        }
    }
}
