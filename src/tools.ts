import { Tool } from "openai/resources/responses/responses";

export function getTools(): Array<Tool> {
    return [
        {
            "type": "function",
            "name": "getEntryDetails",
            "description": "Elvira - Retrieve entry details using the provided ID",
            "strict": true,
            "parameters": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "description": "Unique identifier of the entry to retrieve details for"
                    }
                },
                "required": [
                    "id"
                ],
                "additionalProperties": false
            }
        },
        {
            "type": "function",
            "name": "getEntries",
            "description": "Elvira - Retrieve entries with pagination support",
            "strict": true,
            "parameters": {
                "type": "object",
                "properties": {
                    "page": {
                        "type": "integer",
                        "description": "Page number to retrieve, starting from 1"
                    },
                    "limit": {
                        "type": "integer",
                        "description": "Number of entries per page"
                    }
                },
                "required": [
                    "page",
                    "limit"
                ],
                "additionalProperties": false
            }
        },
        {
            "type": "function",
            "name": "displayBooks",
            "description": "Display books in the UI given an array of book IDs",
            "strict": true,
            "parameters": {
                "type": "object",
                "properties": {
                    "ids": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "description": "Unique identifier of a book"
                        },
                        "description": "Array of book IDs to display"
                    }
                },
                "required": [
                    "ids"
                ],
                "additionalProperties": false
            }
        }
    ];
}
