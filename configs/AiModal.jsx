const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.EXPO_PUBLIC_AI_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "{\n  \"location\": Quy Nhon,\n  \"duration\": \"2 Days 1 Night\",\n  \"budget\": {\n    \"min\": 3000000,\n    \"max\": 7000000\n  },\n  \"transportation\": {\n    \"flight\": {\n      \"details\": \"\",\n      \"price\": ,\n      \"booking_url\": \"\"\n    },\n    \"train\": {\n      \"details\": \"\",\n      \"price\": ,\n      \"booking_url\": \"\"\n    },\n    \"bus\": {\n      \"details\": \"\",\n      \"price\": ,\n      \"booking_url\": \"\"\n    }\n  },\n  \"places_to_visit\": [\n    {\n      \"placeName\": \"\",\n      \"details\": \"\",\n      \"image_url\": \"\",\n      \"ticket_price\": ,\n      \"best_time_to_visit\": \"\"\n    },\n    {\n      \"placeName\": \"\",\n      \"details\": \"\",\n      \"image_url\": \"\",\n      \"ticket_price\": ,\n      \"best_time_to_visit\": \"\"\n    },\n  ],\n} \nGenerate Travel Plan In This format, but number of place to visit is equal to 3 x Days, traveling with Family must fill all"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"location\": \"Quy Nhon\",\n  \"duration\": \"2 Days 1 Night\",\n  \"budget\": {\n    \"min\": 3000000,\n    \"max\": 7000000\n  },\n  \"transportation\": {\n    \"flight\": {\n      \"details\": \"Flights are available to Phu Cat Airport (UIH), the closest airport to Quy Nhon. Consider Vietjet Air, Vietnam Airlines, or Bamboo Airways for domestic flights.\",\n      \"price\": 1500000, \n      \"booking_url\": \"https://www.vietjetair.com/, https://www.vietnamairlines.com/, https://www.bambooairways.com/\"\n    },\n    \"train\": {\n      \"details\": \"Train travel to Dieu Tri Station (closest station to Quy Nhon) is also an option, though it might take longer.\",\n       \"price\": 800000,\n       \"booking_url\": \"https://dsvn.vn/\"\n    },\n    \"bus\": {\n      \"details\": \"Buses from major cities in Vietnam to Quy Nhon are available, often more budget-friendly but may involve longer travel time. Consider Phương Trang, Hoàng Long.\",\n      \"price\": 500000,\n      \"booking_url\": \"https://futabus.vn/, https://hoanglongasia.com/\"\n    }\n  },\n    \"places_to_visit\": [\n    {\n      \"placeName\": \"Ky Co Beach\",\n      \"details\": \"Known as a 'Maldives of Vietnam' with stunning clear blue waters and pristine white sand. Perfect for swimming, sunbathing, and snorkeling. Consider a boat tour to get here.\",\n      \"image_url\": \"https://example.com/kyco_beach.jpg\",\n      \"ticket_price\": 100000,\n       \"best_time_to_visit\": \"March to September (dry season)\"\n    },\n    {\n      \"placeName\": \"Eo Gio\",\n      \"details\": \"Dramatic cliffside views with a windy path leading down to the sea. Great for photography and enjoying the natural beauty.\",\n      \"image_url\": \"https://example.com/eogio.jpg\",\n      \"ticket_price\": 40000,\n       \"best_time_to_visit\": \"Year-round, avoid strong winds in the rainy season\"\n    },\n     {\n      \"placeName\": \"Bai Xep\",\n      \"details\": \"A charming fishing village with a beautiful beach. Experience local life and enjoy fresh seafood.\",\n        \"image_url\": \"https://example.com/baixep.jpg\",\n      \"ticket_price\": 0,\n       \"best_time_to_visit\": \"Year-round\"\n    },\n    {\n        \"placeName\": \"Ghenh Rang Tien Sa\",\n        \"details\": \"A picturesque area with rocky outcrops, panoramic views, and the grave of poet Han Mac Tu. Offers a mix of nature and culture.\",\n       \"image_url\": \"https://example.com/ghenhrang.jpg\",\n        \"ticket_price\": 50000,\n        \"best_time_to_visit\": \"Year-round\"\n    },\n     {\n      \"placeName\": \"Twin Towers (Thap Doi)\",\n      \"details\": \"Ancient Cham towers with unique architecture, providing historical insights into the region.\",\n       \"image_url\": \"https://example.com/thapdoi.jpg\",\n      \"ticket_price\": 30000,\n       \"best_time_to_visit\": \"Year-round\"\n    },\n     {\n      \"placeName\": \"Long Khanh Pagoda\",\n      \"details\": \"A prominent Buddhist temple with intricate designs and a peaceful atmosphere. A place for reflection and learning about local beliefs.\",\n        \"image_url\": \"https://example.com/longkhanh.jpg\",\n      \"ticket_price\": 0,\n       \"best_time_to_visit\": \"Year-round\"\n    }\n  ]\n}\n```\n"},
      ],
    },
    {
      role: "user",
      parts: [
        {text: "{\n\"location\": Quy Nhon,\n\"duration\": \"2 Days 1 Night\",\n\"budget\": {\n\"min\": 3000000,\n\"max\": 7000000\n},\n\"transportation\": {\n\"flight\": {\n\"details\": \"\",\n\"price\": ,\n\"booking_url\": \"\"\n},\n\"train\": {\n\"details\": \"\",\n\"price\": ,\n\"booking_url\": \"\"\n},\n\"bus\": {\n\"details\": \"\",\n\"price\": ,\n\"booking_url\": \"\"\n}\n},\n\"places_to_visit\": [\n{\n\"placeName\": \"\",\n\"details\": \"\",\n\"image_url\": \"\",\n\"ticket_price\": ,\n\"best_time_to_visit\": \"\"\n},\n{\n\"placeName\": \"\",\n\"details\": \"\",\n\"image_url\": \"\",\n\"ticket_price\": ,\n\"best_time_to_visit\": \"\"\n},\n],\n}\nGenerate Travel Plan In This format, but number of place to visit is equal to 3 x Days, traveling with Family must fill all. Các miêu tả  bằng tiếng việt"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"location\": \"Quy Nhơn\",\n  \"duration\": \"2 Days 1 Night\",\n  \"budget\": {\n    \"min\": 3000000,\n    \"max\": 7000000\n  },\n  \"transportation\": {\n    \"flight\": {\n      \"details\": \"Các chuyến bay đến sân bay Phù Cát (UIH), sân bay gần nhất đến Quy Nhơn. Bạn có thể cân nhắc các hãng Vietjet Air, Vietnam Airlines hoặc Bamboo Airways cho các chuyến bay nội địa.\",\n      \"price\": 1500000,\n      \"booking_url\": \"https://www.vietjetair.com/, https://www.vietnamairlines.com/, https://www.bambooairways.com/\"\n    },\n    \"train\": {\n      \"details\": \"Đi tàu đến ga Diêu Trì (ga gần Quy Nhơn nhất) cũng là một lựa chọn, tuy nhiên có thể mất nhiều thời gian hơn.\",\n      \"price\": 800000,\n      \"booking_url\": \"https://dsvn.vn/\"\n    },\n    \"bus\": {\n      \"details\": \"Xe khách từ các thành phố lớn ở Việt Nam đến Quy Nhơn có sẵn, thường tiết kiệm chi phí hơn nhưng có thể mất nhiều thời gian di chuyển hơn. Cân nhắc các nhà xe Phương Trang, Hoàng Long.\",\n      \"price\": 500000,\n      \"booking_url\": \"https://futabus.vn/, https://hoanglongasia.com/\"\n    }\n  },\n  \"places_to_visit\": [\n    {\n      \"placeName\": \"Bãi Kỳ Co\",\n      \"details\": \"Được mệnh danh là 'Maldives của Việt Nam' với làn nước trong xanh và bãi cát trắng mịn. Tuyệt vời để bơi lội, tắm nắng và lặn biển. Nên đi bằng thuyền để đến đây.\",\n      \"image_url\": \"https://example.com/kyco_beach.jpg\",\n      \"ticket_price\": 100000,\n      \"best_time_to_visit\": \"Tháng 3 đến tháng 9 (mùa khô)\"\n    },\n    {\n      \"placeName\": \"Eo Gió\",\n      \"details\": \"Khung cảnh vách đá hùng vĩ với con đường quanh co dẫn xuống biển. Tuyệt vời để chụp ảnh và tận hưởng vẻ đẹp tự nhiên.\",\n      \"image_url\": \"https://example.com/eogio.jpg\",\n      \"ticket_price\": 40000,\n      \"best_time_to_visit\": \"Quanh năm, tránh gió lớn vào mùa mưa\"\n    },\n     {\n      \"placeName\": \"Làng chài Bãi Xép\",\n      \"details\": \"Một làng chài quyến rũ với bãi biển tuyệt đẹp. Trải nghiệm cuộc sống địa phương và thưởng thức hải sản tươi ngon.\",\n        \"image_url\": \"https://example.com/baixep.jpg\",\n      \"ticket_price\": 0,\n       \"best_time_to_visit\": \"Quanh năm\"\n    },\n    {\n        \"placeName\": \"Ghềnh Ráng Tiên Sa\",\n        \"details\": \"Một khu vực đẹp như tranh vẽ với những mỏm đá nhấp nhô, tầm nhìn toàn cảnh và mộ của nhà thơ Hàn Mặc Tử. Mang đến sự kết hợp giữa thiên nhiên và văn hóa.\",\n       \"image_url\": \"https://example.com/ghenhrang.jpg\",\n        \"ticket_price\": 50000,\n        \"best_time_to_visit\": \"Quanh năm\"\n    },\n     {\n      \"placeName\": \"Tháp Đôi\",\n      \"details\": \"Những ngọn tháp Chăm cổ với kiến trúc độc đáo, cung cấp những hiểu biết lịch sử về khu vực.\",\n       \"image_url\": \"https://example.com/thapdoi.jpg\",\n      \"ticket_price\": 30000,\n       \"best_time_to_visit\": \"Quanh năm\"\n    },\n     {\n      \"placeName\": \"Chùa Long Khánh\",\n      \"details\": \"Một ngôi chùa Phật giáo nổi bật với những thiết kế tinh xảo và bầu không khí thanh bình. Một nơi để suy ngẫm và tìm hiểu về tín ngưỡng địa phương.\",\n        \"image_url\": \"https://example.com/longkhanh.jpg\",\n      \"ticket_price\": 0,\n       \"best_time_to_visit\": \"Quanh năm\"\n    }\n  ]\n}\n```\n"},
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());