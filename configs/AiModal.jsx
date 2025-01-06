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
        {text: "{\n  \"location\": Nha Trang,\n  \"duration\": \"2 Days 1 Night\",\n  \"budget\": {\n    \"min\": 5000000,\n    \"max\": 7000000\n  },\n  \"transportation\": {\n    \"flight\": {\n      \"details\": \"\",\n      \"price\": ,\n      \"booking_url\": \"\",\n      \"isSelectedTransport\": false\n    },\n    \"train\": {\n      \"details\": \"\",\n      \"price\": ,\n      \"booking_url\": \"\",\n      \"isSelectedTransport\": false\n    },\n    \"bus\": {\n      \"details\": \"\",\n      \"price\": ,\n      \"booking_url\": \"\",\n      \"isSelectedTransport\": false\n    },\n    \"self-drive\": {\n      \"details\": \"Tự lái phương tiện của bạn theo kế hoạch cá nhân.\",\n      \"price\": 0,\n      \"isSelectedTransport\": false\n    }\n  },\n  \"places_to_visit\": [\n    {\n      \"placeName\": \"\",\n      \"details\": \"\",\n      \"image_url\": \"\",\n      \"ticket_price\": ,\n      \"best_time_to_visit\": \"\",\n      \"day_visit\" : \"None\"\n    },\n    {\n      \"placeName\": \"\",\n      \"details\": \"\",\n      \"image_url\": \"\",\n      \"ticket_price\": ,\n      \"best_time_to_visit\": \"\",\n      \"day_visit\" : \"None\"\n    },\n  ],\n} \nGenerate Travel Plan In This format, but number of place to visit is equal to 3 x Days, traveling with Cùng người yêu, must fill all, only 1 booking url for eaching kind of transportation, isSelectedTransport keep as False and day_visit keep as None. Các miêu tả bằng tiếng việt"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"location\": \"Nha Trang\",\n  \"duration\": \"2 Days 1 Night\",\n  \"budget\": {\n    \"min\": 5000000,\n    \"max\": 7000000\n  },\n  \"transportation\": {\n    \"flight\": {\n      \"details\": \"Di chuyển bằng máy bay là lựa chọn nhanh chóng và tiện lợi để đến Nha Trang từ các thành phố khác.\",\n      \"price\": 2500000,\n      \"booking_url\": \"https://www.vietnamairlines.com/\",\n      \"isSelectedTransport\": false\n    },\n    \"train\": {\n      \"details\": \"Tàu hỏa là phương tiện di chuyển thoải mái, ngắm cảnh trên đường đi. Thích hợp nếu bạn không vội.\",\n      \"price\": 1500000,\n      \"booking_url\": \"https://dsvn.vn/\",\n       \"isSelectedTransport\": false\n    },\n    \"bus\": {\n      \"details\": \"Xe khách là phương án tiết kiệm chi phí, có nhiều nhà xe khai thác tuyến đến Nha Trang.\",\n      \"price\": 800000,\n      \"booking_url\": \"https://vexere.com/\",\n      \"isSelectedTransport\": false\n    },\n    \"self-drive\": {\n      \"details\": \"Tự lái phương tiện của bạn theo kế hoạch cá nhân.\",\n      \"price\": 0,\n      \"isSelectedTransport\": false\n    }\n  },\n  \"places_to_visit\": [\n    {\n      \"placeName\": \"VinWonders Nha Trang\",\n      \"details\": \"Khu vui chơi giải trí đẳng cấp quốc tế với nhiều trò chơi cảm giác mạnh, thủy cung, công viên nước và các show diễn đặc sắc.\",\n      \"image_url\": \"https://res.cloudinary.com/dtj8x3z8a/image/upload/v1699677116/vinwonder_nt_tq0m3u.jpg\",\n      \"ticket_price\": 880000,\n      \"best_time_to_visit\": \"Cả ngày\",\n      \"day_visit\": \"None\"\n    },\n      {\n      \"placeName\": \"Tháp Bà Ponagar\",\n      \"details\": \"Quần thể kiến trúc Chăm Pa cổ kính, là điểm tham quan văn hóa lịch sử nổi tiếng của Nha Trang.\",\n      \"image_url\": \"https://res.cloudinary.com/dtj8x3z8a/image/upload/v1699677116/thapba_ponaga_q5s9c2.jpg\",\n      \"ticket_price\": 30000,\n      \"best_time_to_visit\": \"Buổi sáng sớm hoặc chiều mát\",\n      \"day_visit\": \"None\"\n    },\n    {\n       \"placeName\": \"Bãi biển Nha Trang\",\n      \"details\": \"Một trong những bãi biển đẹp nhất Việt Nam với bờ cát trắng mịn, nước biển trong xanh.\",\n      \"image_url\": \"https://res.cloudinary.com/dtj8x3z8a/image/upload/v1699677115/bai-bien-nha-trang_rxx7sb.jpg\",\n      \"ticket_price\": 0,\n      \"best_time_to_visit\": \"Cả ngày\",\n      \"day_visit\": \"None\"\n    },\n    {\n      \"placeName\": \"Hòn Mun\",\n      \"details\": \"Khu bảo tồn biển với hệ sinh thái san hô đa dạng, thích hợp cho các hoạt động lặn biển ngắm san hô.\",\n      \"image_url\": \"https://res.cloudinary.com/dtj8x3z8a/image/upload/v1699677115/hon-mun_iz673f.jpg\",\n      \"ticket_price\": 100000,\n      \"best_time_to_visit\": \"Buổi sáng\",\n       \"day_visit\": \"None\"\n    },\n    {\n      \"placeName\": \"Chợ Đầm\",\n      \"details\": \"Khu chợ truyền thống lớn nhất Nha Trang, nơi bạn có thể mua sắm đặc sản địa phương và trải nghiệm văn hóa chợ.\",\n      \"image_url\": \"https://res.cloudinary.com/dtj8x3z8a/image/upload/v1699677115/cho-dam_v34j8t.jpg\",\n       \"ticket_price\": 0,\n      \"best_time_to_visit\": \"Buổi sáng hoặc chiều\",\n      \"day_visit\": \"None\"\n    },\n    {\n      \"placeName\": \"Viện Hải Dương Học\",\n      \"details\": \"Nơi trưng bày và nghiên cứu về các loài sinh vật biển, giúp bạn hiểu thêm về đại dương bao la.\",\n      \"image_url\": \"https://res.cloudinary.com/dtj8x3z8a/image/upload/v1699677116/vien_hai_duong_hoc_gkv30l.jpg\",\n       \"ticket_price\": 50000,\n      \"best_time_to_visit\": \"Buổi sáng hoặc chiều\",\n       \"day_visit\": \"None\"\n    }\n  ]\n}\n```\n"},
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());