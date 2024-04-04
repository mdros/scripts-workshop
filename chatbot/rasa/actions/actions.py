from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher


class ActionUtterGreet(Action):
    def name(self) -> Text:
        return "action_utter_greet"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(text="Hello!")
        return []


class ActionShowMenu(Action):
    def name(self) -> Text:
        return "action_show_menu"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        menu_items = [
            {"name": "Lasagne", "price": 16, "preparation_time": 1},
            {"name": "Pizza", "price": 12, "preparation_time": 0.5},
            {"name": "Hot-dog", "price": 4, "preparation_time": 0.1},
            {"name": "Burger", "price": 12.5, "preparation_time": 0.2},
            {"name": "Spaghetti Carbonara", "price": 15, "preparation_time": 0.5},
            {"name": "Tiramisu", "price": 11, "preparation_time": 0.15},
        ]

        menu_response = "Here's our menu:\n"
        for item in menu_items:
            menu_response += f"- {item['name']}: ${item['price']} (Preparation time: {item['preparation_time']} hours)\n"

        dispatcher.utter_message(text=menu_response)
        return []


class ActionOrderFood(Action):
    def name(self) -> Text:
        return "action_order_food"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        entities = tracker.latest_message.get("entities", [])
        food_item = next(
            (entity["value"] for entity in entities if entity["entity"] == "food_item"),
            None,
        )
        if food_item:
            dispatcher.utter_message(
                text=f"Your order for {food_item} has been placed. It will be ready shortly."
            )
        else:
            dispatcher.utter_message("No food info available")
        return []


class ActionInquirePrice(Action):
    def name(self) -> Text:
        return "action_inquire_price"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        entities = tracker.latest_message.get("entities", [])
        food_item = next(
            (entity["value"] for entity in entities if entity["entity"] == "food_item"),
            None,
        )
        if food_item:
            menu_items = {
                "Lasagne": 16,
                "Pizza": 12,
                "Hot-dog": 4,
                "Burger": 12.5,
                "Spaghetti Carbonara": 15,
                "Tiramisu": 11,
            }
            price = menu_items.get(food_item)
            if price:
                dispatcher.utter_message(text=f"The price of {food_item} is ${price}.")
            else:
                dispatcher.utter_message(
                    text=f"Sorry, {food_item} is not available on our menu."
                )
        else:
            dispatcher.utter_message("No food info available")
        return []


class ActionInquirePreparationTime(Action):
    def name(self) -> Text:
        return "action_inquire_preparation_time"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        entities = tracker.latest_message.get("entities", [])
        food_item = next(
            (entity["value"] for entity in entities if entity["entity"] == "food_item"),
            None,
        )
        if food_item:
            menu_items = {
                "Lasagne": 1,
                "Pizza": 0.5,
                "Hot-dog": 0.1,
                "Burger": 0.2,
                "Spaghetti Carbonara": 0.5,
                "Tiramisu": 0.15,
            }
            preparation_time = menu_items.get(food_item)
            if preparation_time:
                dispatcher.utter_message(
                    text=f"The preparation time for {food_item} is {preparation_time} hours."
                )
            else:
                dispatcher.utter_message(
                    text=f"Sorry, {food_item} is not available on our menu."
                )
        else:
            dispatcher.utter_message("No food info available")
        return []


class ActionInquireOpeningHours(Action):
    def name(self) -> Text:
        return "action_inquire_opening_hours"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        entities = tracker.latest_message.get("entities", [])
        day = next(
            (entity["value"] for entity in entities if entity["entity"] == "day"), None
        )
        if day:
            opening_hours = {
                "Monday": "8 AM - 8 PM",
                "Tuesday": "8 AM - 8 PM",
                "Wednesday": "10 AM - 4 PM",
                "Thursday": "8 AM - 8 PM",
                "Friday": "8 AM - 8 PM",
                "Saturday": "10 AM - 4 PM",
                "Sunday": "Closed",
            }
            hours = opening_hours.get(day)
            if hours:
                dispatcher.utter_message(text=f"We are open on {day} from {hours}.")
            else:
                dispatcher.utter_message(text=f"We are closed on {day}.")
        else:
            dispatcher.utter_message("No day info available")
        return []
