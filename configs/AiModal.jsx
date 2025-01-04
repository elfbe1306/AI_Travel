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
        {text: "{\n  \"location\": Nha Trang,\n  \"duration\": \"2 Days 1 Night\",\n  \"budget\": {\n    \"min\": 5000000,\n    \"max\": 6000000\n  },\n  \"transportation\": {\n    \"flight\": {\n      \"details\": \"\",\n      \"price\": ,\n      \"booking_url\": \"\",\n      \"isSelectedTransport\": False\n    },\n    \"train\": {\n      \"details\": \"\",\n      \"price\": ,\n      \"booking_url\": \"\",\n      \"isSelectedTransport\": False\n    },\n    \"bus\": {\n      \"details\": \"\",\n      \"price\": ,\n      \"booking_url\": \"\",\n      \"isSelectedTransport\": False\n    }\n  },\n  \"places_to_visit\": [\n    {\n      \"placeName\": \"\",\n      \"details\": \"\",\n      \"image_url\": \"\",\n      \"ticket_price\": ,\n      \"best_time_to_visit\": \"\",\n      \"day_visit\" : \"None\"\n    },\n    {\n      \"placeName\": \"\",\n      \"details\": \"\",\n      \"image_url\": \"\",\n      \"ticket_price\": ,\n      \"best_time_to_visit\": \"\",\n      \"day_visit\" : \"None\"\n    },\n  ],\n} \nGenerate Travel Plan In This format, but number of place to visit is equal to 3 x Days, traveling with Cùng người yêu, must fill all, only 1 booking url for eaching kind of transportation, isSelectedTransport keep as False and day_visit keep as None. Các miêu tả bằng tiếng việt"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"location\": \"Nha Trang\",\n  \"duration\": \"2 Days 1 Night\",\n  \"budget\": {\n    \"min\": 5000000,\n    \"max\": 6000000\n  },\n  \"transportation\": {\n    \"flight\": {\n      \"details\": \"Vé máy bay khứ hồi đến sân bay Cam Ranh (CXR), sau đó di chuyển bằng taxi hoặc xe đưa đón về trung tâm Nha Trang.\",\n      \"price\": 2500000,\n      \"booking_url\": \"https://www.vietjetair.com/\",\n      \"isSelectedTransport\": false\n    },\n    \"train\": {\n      \"details\": \"Vé tàu khứ hồi đến ga Nha Trang. Tàu hỏa là một lựa chọn thoải mái, ngắm cảnh trên đường đi.\",\n      \"price\": 1500000,\n      \"booking_url\": \"https://dsvn.vn/#/\",\n      \"isSelectedTransport\": false\n    },\n    \"bus\": {\n        \"details\": \"Vé xe khách khứ hồi đến Nha Trang. Đây là phương án tiết kiệm chi phí nhất.\",\n        \"price\": 800000,\n        \"booking_url\": \"https://vexere.com/\",\n        \"isSelectedTransport\": false\n    }\n  },\n  \"places_to_visit\": [\n    {\n      \"placeName\": \"VinWonders Nha Trang\",\n      \"details\": \"Khu vui chơi giải trí hàng đầu Nha Trang với nhiều trò chơi cảm giác mạnh, thủy cung, công viên nước và các show diễn đặc sắc. Phù hợp cho các cặp đôi thích khám phá và vui chơi.\",\n      \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Vinpearl_Land_Nha_Trang.jpg/1200px-Vinpearl_Land_Nha_Trang.jpg\",\n      \"ticket_price\": 880000,\n      \"best_time_to_visit\": \"Cả ngày\",\n       \"day_visit\" : \"None\"\n    },\n    {\n      \"placeName\": \"Tháp Bà Ponagar\",\n      \"details\": \"Công trình kiến trúc Chăm cổ kính, linh thiêng với những ngọn tháp gạch đỏ rực rỡ. Một địa điểm văn hóa lý tưởng để hai bạn tìm hiểu về lịch sử và chiêm ngưỡng kiến trúc độc đáo.\",\n      \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Ponagar_Nha_Trang_Vietnam.jpg/1200px-Ponagar_Nha_Trang_Vietnam.jpg\",\n      \"ticket_price\": 30000,\n      \"best_time_to_visit\": \"Buổi sáng hoặc chiều mát\",\n      \"day_visit\" : \"None\"\n    },\n    {\n     \"placeName\": \"Bãi biển Nha Trang\",\n      \"details\": \"Bãi biển dài, cát trắng mịn, nước biển trong xanh. Hai bạn có thể cùng nhau tản bộ, tắm biển, ngắm bình minh hoặc hoàng hôn lãng mạn.\",\n      \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Nha_Trang_Beach_Vietnam_201401_01.jpg/1200px-Nha_Trang_Beach_Vietnam_201401_01.jpg\",\n      \"ticket_price\": 0,\n      \"best_time_to_visit\": \"Buổi sáng sớm hoặc chiều muộn\",\n      \"day_visit\" : \"None\"\n    },\n    {\n      \"placeName\": \"Hòn Mun\",\n      \"details\": \"Khu bảo tồn biển với rạn san hô đa dạng và nhiều loài sinh vật biển. Cả hai có thể lặn biển ngắm san hô, khám phá thế giới dưới lòng đại dương hoặc tham gia các hoạt động thể thao dưới nước.\",\n      \"image_url\": \"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/19/58/3d/hon-mun-island.jpg?w=1200&h=-1&s=1\",\n      \"ticket_price\": 150000,\n      \"best_time_to_visit\": \"Buổi sáng\",\n       \"day_visit\" : \"None\"\n    },\n   {\n      \"placeName\": \"Chợ Đầm\",\n     \"details\": \"Chợ truyền thống lớn nhất Nha Trang, nơi bạn có thể mua sắm đặc sản địa phương, quà lưu niệm và thưởng thức ẩm thực đường phố. Cùng nhau khám phá các món ăn ngon và mua những món quà ý nghĩa.\",\n      \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Cho_Dam_Nha_Trang.jpg/1200px-Cho_Dam_Nha_Trang.jpg\",\n      \"ticket_price\": 0,\n      \"best_time_to_visit\": \"Buổi sáng hoặc chiều\",\n      \"day_visit\" : \"None\"\n    },\n    {\n      \"placeName\": \"Nhà thờ Đá Nha Trang\",\n      \"details\": \"Nhà thờ cổ kính với kiến trúc Pháp độc đáo, là một địa điểm check-in lãng mạn cho các cặp đôi. Cùng nhau chụp những bức ảnh kỷ niệm đẹp.\",\n      \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Nha_Trang_Cathedral_01.jpg/1200px-Nha_Trang_Cathedral_01.jpg\",\n      \"ticket_price\": 0,\n      \"best_time_to_visit\": \"Bất kỳ thời điểm nào trong ngày\",\n      \"day_visit\" : \"None\"\n    }\n  ]\n}\n```\n"},
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());