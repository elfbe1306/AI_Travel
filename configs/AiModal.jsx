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
        {text: "{\n  \"location\": Quy Nhơn,\n  \"duration\": \"3 Days 2 Night\",\n  \"budget\": {\n    \"min\": 8,500,000,\n    \"max\": 14,500,000\n  },\n  \"transportation\": {\n    \"flight\": {\n      \"details\": \"\",\n      \"price\": ,\n      \"booking_url\": \"\"\n    },\n    \"train\": {\n      \"details\": \"\",\n      \"price\": ,\n      \"booking_url\": \"\"\n    },\n    \"bus\": {\n      \"details\": \"\",\n      \"price\": ,\n      \"booking_url\": \"\"\n    }\n  },\n  \"accommodation\": [\n    {\n      \"hotelName\": \"\",\n      \"hotelAddress\": \"\",\n      \"price_per_night\": ,\n      \"image_url\": \"\",\n      \"rating\": ,\n      \"description\": \"\"\n    },\n    {\n      \"hotelName\": \"\",\n      \"hotelAddress\": \"\",\n      \"price_per_night\": ,\n      \"image_url\": \"\",\n      \"rating\": ,\n      \"description\": \"\"\n    }\n  ],\n  \"places_to_visit\": [\n    {\n      \"placeName\": \"\",\n      \"details\": \"\",\n      \"image_url\": \"\",\n      \"ticket_price\": ,\n      \"best_time_to_visit\": \"\"\n    },\n    {\n      \"placeName\": \"\",\n      \"details\": \"\",\n      \"image_url\": \"\",\n      \"ticket_price\": ,\n      \"best_time_to_visit\": \"\"\n    },\n  ],\n}\nGenerate Travel Plan In This format, but number of place to visit is equal to 3 x Days, and number of accomodation is equal to 2 x Days, traveling with Cùng người yêu must fill all"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"location\": \"Quy Nhơn\",\n  \"duration\": \"3 Days 2 Night\",\n  \"budget\": {\n    \"min\": 8500000,\n    \"max\": 14500000\n  },\n   \"travel_style\": \"Romantic Getaway\",\n  \"transportation\": {\n    \"flight\": {\n      \"details\": \"Round trip flights from your departure city to Phu Cat Airport (UIH), Quy Nhơn. Consider VietJet Air, Bamboo Airways or Vietnam Airlines.\",\n      \"price\": 4000000,\n      \"booking_url\": \"https://www.vietjetair.com/en\"\n    },\n    \"train\": {\n     \"details\": \"While possible, train travel to Quy Nhơn is less convenient and takes longer than flying, not recommended for this short trip.\",\n      \"price\": null,\n      \"booking_url\": null\n    },\n    \"bus\": {\n      \"details\": \"Not the most comfortable option for a romantic getaway, recommend flight for speed and convenience.\",\n      \"price\": null,\n      \"booking_url\": null\n    }\n  },\n  \"accommodation\": [\n    {\n      \"hotelName\": \"FLC Luxury Hotel Quy Nhơn\",\n      \"hotelAddress\": \"Khu 4, Nhơn Lý, Thành phố Quy Nhơn, Bình Định\",\n      \"price_per_night\": 3000000,\n      \"image_url\": \"https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2023/05/flc-quy-nhon-2023-02.jpg\",\n      \"rating\": 4.5,\n      \"description\": \"Luxury beachfront hotel with stunning ocean views, private beach access, multiple pools, and excellent dining options. Perfect for a romantic and relaxing stay.\"\n    },\n    {\n      \"hotelName\": \"Seagull Hotel\",\n      \"hotelAddress\": \"489 An Dương Vương, Nguyễn Văn Cừ, Thành phố Quy Nhơn, Bình Định\",\n      \"price_per_night\": 1800000,\n      \"image_url\": \"https://media.vneconomy.vn/images/upload/2022/12/09/seahotel2.jpg\",\n      \"rating\": 4.2,\n      \"description\": \"Well-located hotel with comfortable rooms, city and sea views. Features an outdoor pool and a variety of dining choices. A great value option for couples.\"\n    },\n     {\n      \"hotelName\": \"Casa Marina Resort\",\n      \"hotelAddress\": \"QL1D, Khu phố 1, Ghềnh Ráng, Thành phố Quy Nhơn, Bình Định\",\n       \"price_per_night\": 2500000,\n       \"image_url\": \"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/9f/d5/e8/casa-marina-resort.jpg?w=700&h=-1&s=1\",\n       \"rating\": 4.6,\n      \"description\": \"Beautiful hillside resort with traditional architecture, surrounded by lush greenery and overlooking a secluded beach.  Ideal for couples seeking a more intimate and peaceful atmosphere.\"\n    },\n     {\n      \"hotelName\": \"Aurora Villas & Resort\",\n      \"hotelAddress\": \"Khu 1, Nhơn Lý, Thành phố Quy Nhơn, Bình Định\",\n       \"price_per_night\": 2200000,\n       \"image_url\":\"https://cdn1.vntrip.vn/cam-nang/wp-content/uploads/2023/05/aurora-villas-resort-quy-nhon-2023-01.jpg\",\n       \"rating\": 4.3,\n       \"description\":\"Charming resort with private villas, infinity pool, and a beautiful beachfront location, offering a blend of comfort and tranquility. A great choice for couples looking for a relaxing and rejuvenating escape.\"\n    }\n  ],\n  \"places_to_visit\": [\n    {\n      \"placeName\": \"Eo Gió\",\n      \"details\": \"A dramatic cliffside area with stunning panoramic views of the ocean and coastline. Great for taking photos, and enjoy the sea breeze.\",\n      \"image_url\": \"https://media.vov.vn/sites/default/files/styles/large/public/2023-03/z4203223778926_191bc4f79a08e63864189955c8a09e1e.jpg\",\n      \"ticket_price\": 30000,\n      \"best_time_to_visit\": \"Morning or late afternoon for cooler temperatures and great lighting.\"\n    },\n    {\n      \"placeName\": \"Kỳ Co Beach\",\n      \"details\": \"A picturesque beach with crystal-clear turquoise waters, white sand, and unique rock formations. Perfect for swimming, snorkeling, and relaxing.\",\n      \"image_url\": \"https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2023/02/ky-co-beach-quy-nhon-2023-03.jpg\",\n      \"ticket_price\": 50000,\n      \"best_time_to_visit\": \"Any time of day, but morning is best for calmer waters.\"\n    },\n    {\n      \"placeName\": \"Ghenh Rang Tien Sa\",\n      \"details\": \"A historical and scenic area with rocky hills, serene bays, and the tomb of poet Han Mac Tu. Offers a blend of cultural and natural attractions.\",\n       \"image_url\": \"https://www.vietnambooking.com/wp-content/uploads/2017/11/Ganh-Rang-Tien-Sa-Quy-Nhon-du-lich-viet-nam.jpg\",\n      \"ticket_price\": 20000,\n      \"best_time_to_visit\": \"Morning or late afternoon.\"\n    },\n    {\n     \"placeName\": \"Twin Towers\",\n      \"details\": \"Ancient Cham towers that reflect the unique culture of the region. A great place for history and architecture lovers to explore.\",\n       \"image_url\": \"https://media.vneconomy.vn/images/upload/2022/12/09/thap-doi.jpg\",\n       \"ticket_price\": 30000,\n      \"best_time_to_visit\": \"Any time during the day.\"\n   },\n    {\n      \"placeName\": \"Bai Xep Fishing Village\",\n      \"details\": \"A charming and peaceful fishing village with colorful boats and friendly locals. Offers a glimpse into traditional Vietnamese coastal life.\",\n      \"image_url\": \"https://media.vov.vn/sites/default/files/styles/large/public/2023-03/z4203226578139_4cb0a2a80795af117cbdd450309162d7.jpg\",\n      \"ticket_price\": 0,\n       \"best_time_to_visit\":\"Morning or late afternoon to see the fishermen at work.\"\n    },\n     {\n      \"placeName\": \"Queen Beach (Bãi Hoàng Hậu)\",\n      \"details\": \"A historical beach known for its unique egg-shaped stones and association with Queen Nam Phuong. A beautiful spot for a romantic walk.\",\n       \"image_url\": \"https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2023/02/bai-hoang-hau-quy-nhon-2023-02.jpg\",\n       \"ticket_price\": 0,\n      \"best_time_to_visit\":\"Any time of day for a relaxing stroll, sunsets are particularly beautiful.\"\n    },\n     {\n      \"placeName\":\"Hon Kho Island\",\n        \"details\":\"A beautiful island with white sand beaches, clear turquoise water, and vibrant coral reefs. A great spot for swimming, snorkeling and enjoying the tranquility of island life.\",\n       \"image_url\":\"https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2023/02/hon-kho-quy-nhon-2023-03.jpg\",\n       \"ticket_price\":100000,\n       \"best_time_to_visit\":\"Morning or afternoon for best visibility underwater.\"\n    },\n      {\n      \"placeName\":\"Thi Nai Lagoon\",\n        \"details\":\"The largest lagoon in Binh Dinh, known for its serene waters, diverse birdlife, and local fishing activities. Ideal for a boat trip and enjoying the natural beauty.\",\n        \"image_url\":\"https://media.vov.vn/sites/default/files/styles/large/public/2023-03/z4203227614533_264f569278df240d5c5c07002b982f12.jpg\",\n       \"ticket_price\": 0,\n       \"best_time_to_visit\":\"Early morning or late afternoon for cooler weather and beautiful lighting\"\n\n    },\n     {\n       \"placeName\": \"Quy Nhon Night Market\",\n       \"details\": \"Experience local culture, try delicious street food, and shop for souvenirs at this lively night market. A great place for couples to enjoy the local flavors and atmosphere.\",\n       \"image_url\": \"https://images.foody.vn/images/places/foody-228257-545302641814849-640-640.jpg\",\n        \"ticket_price\":0,\n       \"best_time_to_visit\": \"Evening after sunset.\"\n     }\n\n  ]\n}\n```"},
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());