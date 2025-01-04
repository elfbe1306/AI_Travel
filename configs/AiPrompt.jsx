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
      "booking_url": "",
      "isSelectedTransport": False
    },
    "train": {
      "details": "",
      "price": ,
      "booking_url": "",
      "isSelectedTransport": False
    },
    "bus": {
      "details": "",
      "price": ,
      "booking_url": "",
      "isSelectedTransport": False
    }
  },
  "places_to_visit": [
    {
      "placeName": "",
      "details": "",
      "image_url": "",
      "ticket_price": ,
      "best_time_to_visit": "",
      "day_visit" : "None"
    },
    {
      "placeName": "",
      "details": "",
      "image_url": "",
      "ticket_price": ,
      "best_time_to_visit": "",
      "day_visit" : "None"
    },
  ],
} 
Generate Travel Plan In This format, but number of place to visit is equal to 3 x Days, traveling with {WhoTravel}, must fill all, only 1 booking url for eaching kind of transportation, isSelectedTransport keep as False and day_visit keep as None. Các miêu tả bằng tiếng việt`