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
        {text: "{\n  \"location\": Quy Nhon,\n  \"duration\": \"2 Days 1 Night\",\n  \"budget\": {\n    \"min\": 2000000,\n    \"max\": 5000000\n  },\n  \"transportation\": {\n    \"flight\": {\n      \"details\": \"\",\n      \"price\": ,\n      \"booking_url\": \"\"\n    },\n    \"train\": {\n      \"details\": \"\",\n      \"price\": ,\n      \"booking_url\": \"\"\n    },\n    \"bus\": {\n      \"details\": \"\",\n      \"price\": ,\n      \"booking_url\": \"\"\n    }\n  },\n  \"places_to_visit\": [\n    {\n      \"placeName\": \"\",\n      \"details\": \"\",\n      \"image_url\": \"\",\n      \"ticket_price\": ,\n      \"best_time_to_visit\": \"\"\n    },\n    {\n      \"placeName\": \"\",\n      \"details\": \"\",\n      \"image_url\": \"\",\n      \"ticket_price\": ,\n      \"best_time_to_visit\": \"\"\n    },\n  ],\n} \nGenerate Travel Plan In This format, but number of place to visit is equal to 3 x Days, traveling with Family must fill all, only 1 booking url for eaching kind of transportation. Các miêu tả bằng tiếng việt"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"location\": \"Quy Nhơn\",\n  \"duration\": \"2 Days 1 Night\",\n  \"budget\": {\n    \"min\": 2000000,\n    \"max\": 5000000\n  },\n  \"transportation\": {\n    \"flight\": {\n      \"details\": \"Có thể tìm các chuyến bay đến sân bay Phù Cát (UIH), sau đó di chuyển bằng taxi hoặc xe đưa đón về trung tâm Quy Nhơn. Tuy nhiên, chi phí có thể cao hơn so với các phương tiện khác.\",\n      \"price\": 1500000,\n      \"booking_url\": \"https://www.vietjetair.com/\"\n    },\n    \"train\": {\n        \"details\": \"Tàu hỏa là một lựa chọn thoải mái, bạn có thể đến ga Diêu Trì rồi đi xe bus hoặc taxi vào Quy Nhơn. Thời gian di chuyển sẽ lâu hơn máy bay.\",\n        \"price\": 800000,\n        \"booking_url\": \"https://dsvn.vn/\"\n    },\n    \"bus\": {\n      \"details\": \"Xe khách là phương tiện tiết kiệm chi phí nhất, có nhiều nhà xe chạy tuyến đến Quy Nhơn. Tuy nhiên thời gian di chuyển sẽ lâu hơn và có thể không thoải mái bằng tàu hoặc máy bay.\",\n      \"price\": 600000,\n      \"booking_url\": \"https://vexere.com/\"\n    }\n  },\n  \"places_to_visit\": [\n    {\n      \"placeName\": \"Eo Gió\",\n      \"details\": \"Eo Gió là một trong những điểm đến nổi tiếng nhất ở Quy Nhơn. Nơi đây có những vách đá dựng đứng ôm trọn một vòng cung biển xanh ngắt. Cảnh quan hùng vĩ và những con đường mòn nhỏ xinh rất phù hợp để chụp ảnh và tận hưởng không khí trong lành. Gia đình có thể đi bộ dọc theo con đường ven biển, ngắm nhìn cảnh quan tuyệt đẹp và chụp ảnh lưu niệm.\",\n      \"image_url\": \"https://ik.imagekit.io/tvlk/blog/2023/04/eo-gio-quy-nhon-featured-6.jpg?tr=w-740,q-75\",\n      \"ticket_price\": 40000,\n      \"best_time_to_visit\": \"Sáng sớm hoặc chiều muộn để tránh nắng gắt và có ánh sáng đẹp.\"\n    },\n    {\n      \"placeName\": \"Kỳ Co\",\n      \"details\": \"Kỳ Co được mệnh danh là 'Maldives của Việt Nam' với bãi cát trắng mịn, nước biển trong xanh và những rặng san hô đa dạng. Bạn có thể tham gia các hoạt động như tắm biển, lặn biển ngắm san hô, đi cano hoặc chơi các trò chơi thể thao dưới nước. Bãi biển khá an toàn cho trẻ em. Gia đình có thể dành cả ngày ở đây để vui chơi, thư giãn.\",\n      \"image_url\": \"https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/08/ky-co-quynhon-1.jpg\",\n      \"ticket_price\": 100000,\n      \"best_time_to_visit\": \"Buổi sáng sớm để có thể ngắm nhìn bình minh và tránh được nắng nóng.\"\n    },\n        {\n      \"placeName\": \"Hòn Khô\",\n      \"details\": \"Hòn Khô là một hòn đảo nhỏ nằm gần bờ với vẻ đẹp hoang sơ, thích hợp cho các hoạt động khám phá thiên nhiên. Tại đây, bạn có thể trải nghiệm đi bộ trên bãi cát trắng, lặn biển ngắm san hô hoặc thưởng thức hải sản tươi ngon. Gia đình có thể thuê thuyền để ra đảo và khám phá vẻ đẹp tự nhiên tại đây.\",\n       \"image_url\": \"https://media.travelmag.vn/files/thuhien/2022/05/20/hon-kho-1145.jpg\",\n      \"ticket_price\": 50000,\n      \"best_time_to_visit\": \"Sáng sớm hoặc chiều mát, tránh những giờ nắng gắt.\"\n    },\n        {\n        \"placeName\": \"Ghềnh Ráng Tiên Sa\",\n        \"details\": \"Ghềnh Ráng Tiên Sa là một điểm đến mang tính lịch sử và văn hóa với những tảng đá xếp chồng lên nhau, tạo nên một khung cảnh thiên nhiên độc đáo. Bạn có thể tham quan mộ Hàn Mặc Tử, tìm hiểu về cuộc đời và sự nghiệp của nhà thơ tài hoa này. Nơi đây còn có bãi tắm Hoàng Hậu đẹp và yên bình. Gia đình có thể đi dạo, ngắm cảnh biển và tìm hiểu văn hóa.\",\n         \"image_url\": \"https://media.travelmag.vn/files/thuhien/2022/04/11/113812-20220411-ghenh-rang-01-1142.jpg\",\n        \"ticket_price\": 30000,\n        \"best_time_to_visit\": \"Buổi sáng hoặc chiều mát để không bị nắng nóng.\"\n      },\n     {\n       \"placeName\": \"Bãi Xép\",\n      \"details\": \"Bãi Xép là một bãi biển hoang sơ, yên bình với những tảng đá lớn và bãi cát vàng óng ả. Nơi đây có làng chài nhỏ và không khí rất trong lành. Bạn có thể đi dạo dọc bờ biển, ngắm bình minh hoặc hoàng hôn, chụp ảnh và thư giãn. Gia đình có thể tận hưởng không gian thanh bình và tránh xa sự ồn ào của thành phố.\",\n       \"image_url\":\"https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/08/bai-xep-quynhon.jpg\",\n       \"ticket_price\": 20000,\n       \"best_time_to_visit\":\"Buổi sáng sớm hoặc chiều muộn khi trời mát mẻ.\"\n     },\n    {\n      \"placeName\": \"Chùa Long Khánh\",\n      \"details\": \"Chùa Long Khánh là một ngôi chùa cổ kính nằm ngay trong thành phố. Đây là một nơi linh thiêng, có kiến trúc độc đáo và là một điểm đến văn hóa quan trọng ở Quy Nhơn. Gia đình có thể ghé thăm chùa để cầu bình an, tìm hiểu về văn hóa Phật giáo và tận hưởng không gian thanh tịnh.\",\n       \"image_url\":\"https://upload.wikimedia.org/wikipedia/commons/d/d4/Chua_Long_Khanh.jpg\",\n      \"ticket_price\": 0,\n      \"best_time_to_visit\": \"Bất cứ thời điểm nào trong ngày, nên mặc trang phục lịch sự.\"\n    }\n  ]\n}\n```\n"},
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());