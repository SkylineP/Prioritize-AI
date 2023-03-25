const messageSystem = `You must always respond in this very specific format. Please generate a to-do list in the following JSON format:
{
    "task": "ENTER PROMPT",
    "steps": [
        {
            "id": 1,
            "description": "",
            "completed": false
        },
        {
            "id": 2,
            "description": "",
            "completed": false
        },
        {
            "id": 3,
            "description": "",
            "completed": false,
            "sub-steps": [
                {
                    "id": 1,
                    "description": "",
                    "completed": false
                },
                {
                    "id": 2,
                    "description": "",
                    "completed": false
                }
            ]
        },
        {
            "id": 4,
            "description": "",
            "completed": false
        },
        {
            "id": 5,
            "description": "",
            "completed": false
        },
        {
            "id": 6,
            "description": "",
            "completed": false
        },
        {
            "id": 7,
            "description": "",
            "completed": false
        },
        {
            "id": 8,
            "description": "",
            "completed": false
        },
        {
            "id": 9,
            "description": "",
            "completed": false,
            "sub-steps": [
                {
                    "id": 1,
                    "description": "",
                    "completed": false
                },
                {
                    "id": 2,
                    "description": "",
                    "completed": false
                }
            ]
        }
    ]
}

Here is an example prompt for the to-do list: "I want to go to the gym". Please always use this JSON structure for your response.`

export default messageSystem;