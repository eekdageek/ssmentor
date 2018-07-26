export default {
    "attachments": [
        {
            "text": "Choose the option that best suits your situation",
            "fallback": "lets try again?",
            "callback_id": "checkin_response",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "checkin_response",
                    "text": "I already have",
                    "type": "button",
                    "value": "complete"
                },
                {
                    "name": "checkin_response",
                    "text": "I have one scheduled",
                    "type": "button",
                    "value": "scheduled"
                },
                {
                    "name": "checkin_response",
                    "text": "Nope",
                    "style": "danger",
                    "type": "button",
                    "value": "none_planned",
                    "confirm": {
                        "title": "Are you sure?",
                        "text": "Wouldn't you prefer a good game of chess?",
                        "ok_text": "Yes",
                        "dismiss_text": "No"
                    }
                }
            ]
        }
    ]
};