export const AI_PROMPT = `{
  "location": {Destination},
  "duration": "{days} Days {nights} Night",
  "budget": {
    "min": {MinBugget},
    "max": {MaxBugget}
  },
  "transportation": {
    "flight": {
      "details": "",
      "price": ,
      "booking_url": ""
    },
    "train": {
      "details": "",
      "price": ,
      "booking_url": ""
    },
    "bus": {
      "details": "",
      "price": ,
      "booking_url": ""
    }
  },
  "places_to_visit": [
    {
      "placeName": "",
      "details": "",
      "image_url": "",
      "ticket_price": ,
      "best_time_to_visit": ""
    },
    {
      "placeName": "",
      "details": "",
      "image_url": "",
      "ticket_price": ,
      "best_time_to_visit": ""
    },
  ],
} 
Generate Travel Plan In This format, but number of place to visit is equal to 3 x Days, traveling with Family must fill all. Các miêu tả bằng tiếng việt`