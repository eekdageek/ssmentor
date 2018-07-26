export default {
    "attachments": [
        {
            "text": "Choose the option that best suits your situation",
            "fallback": "lets try again?",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "q1",
                    "text": "I already have",
                    "type": "button",
                    "value": "complete"
                },
                {
                    "name": "q1",
                    "text": "I have one scheduled",
                    "type": "button",
                    "value": "scheduled"
                },
                {
                    "name": "q1",
                    "text": "Nothing scheduled",
                    "style": "danger",
                    "type": "button",
                    "value": "none_planned",
                    "confirm": {
                        "title": "Are you sure?",
                        "text": "Wouldn't you like to schedule one?",
                        "ok_text": "Yes",
                        "dismiss_text": "No"
                    }
                }
            ]
        }
    ]
};