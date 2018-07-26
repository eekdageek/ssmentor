export default {
    "attachments": [
        {
            "text": "I am aware of opportunities relating to... ",
            "fallback": "lets try again?",
            "callback_id": "survey_opportunities_response",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [
            	{
            		"name": "field_specific",
            		"text": "Developing field-specific skills",
            		"type": "select",
            		
                	{
                 	   "text": "Strongly Agree",
                    	"value": "Strongly Agree"
                	},
                	{
                    	"text": "Agree",
                    	"value": "Agree"
                	},
                   {
                    	"text": "Neutral",
            	        "value": "Neutral"
                	},
                	{
                    	"text": "Disagree",
                    	"value": "Disagree"
                	},
                	{
                   	 "text": "Strongly Disgree",
                   	 "value": "Strongly Disagree"
                	},
                	{
                   	 "text": "N/A",
                   	 "value": "N/A"
                	}
            ]
        }
    ]
};