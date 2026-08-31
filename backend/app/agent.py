# ruff: noqa
# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import datetime
from zoneinfo import ZoneInfo

from google.adk.agents import Agent
from google.adk.apps import App
from google.adk.models import Gemini
from google.genai import types
from google.adk.tools import McpToolset
from google.adk.tools.mcp_tool.mcp_session_manager import StreamableHTTPConnectionParams

import os
import google.auth


_, project_id = google.auth.default()
os.environ["GOOGLE_CLOUD_PROJECT"] = project_id
os.environ["GOOGLE_CLOUD_LOCATION"] = "global"
os.environ["GOOGLE_GENAI_USE_VERTEXAI"] = "True"
CALLE_TOKEN = os.environ["CALLE_BEARER_TOKEN"]


def get_weather(query: str) -> str:
    """Simulates a web search. Use it get information on weather.

    Args:
        query: A string containing the location to get weather information for.

    Returns:
        A string with the simulated weather information for the queried location.
    """
    if "sf" in query.lower() or "san francisco" in query.lower():
        return "It's 60 degrees and foggy."
    return "It's 90 degrees and sunny."


# Create the MCP toolset for Call-E
connection_params = StreamableHTTPConnectionParams(
    url='https://seleven-mcp-sg.airudder.com/mcp/openagent_oauth',
    headers={"Authorization": f"Bearer {CALLE_TOKEN}"},
)

call_e_toolset = McpToolset(
    connection_params=connection_params,
)

root_agent = Agent(
    model='gemini-3-flash-preview',
    name='root_agent',
    description='An agent that plans and makes phone calls using the Call-E MCP service.',
    instruction=(
        "Greet the user saying your name. You are an AI assistant specializing in planning and making phone calls. "
        "You have access to the Call-E MCP tools: plan_call, run_call, get_call_run, and track_ui_events.\n\n"
        "To make a phone call, follow this exact workflow:\n"
        "1. First, call the 'plan_call' tool. Always pass the user's latest message verbatim in 'user_input' (even if you also set other fields). "
        "Do not guess missing details like region/language, and do not guess country codes for ambiguous phone numbers.\n"
        "2. If 'plan_call' returns 'ready_to_run=false', look at the missing details or clarification questions returned, "
        "and present them to the user. When the user provides additional information, call 'plan_call' again with 'user_input' "
        "set to the user's response, and include the 'plan_id' to continue refining the same plan.\n"
        "3. Once 'plan_call' returns 'ready_to_run=true', call the 'run_call' tool with the 'plan_id' and 'confirm_token' verbatim.\n"
        "4. Once 'run_call' is executed, it starts the call asynchronously and returns a 'run_id'. "
        "Do not call 'run_call' more than once for the same 'plan_id'.\n"
        "5. After 'run_call' starts, wait about 60 seconds before the first 'get_call_run' status check. "
        "After that, poll 'get_call_run' every 5-10 seconds to give the user real-time progress updates about the call, "
        "continuing until the run reaches a terminal state or the response's 'next_step' says otherwise. "
        "Explain the progress of the call clearly to the user.\n"
        "6. Once the call reaches a terminal state, give the user a clear final summary of the outcome — "
        "whether the goal was achieved, any key information gathered (e.g. answers, confirmations, availability), "
        "and how the call ended (e.g. completed, voicemail, no answer, declined). Base this only on what 'get_call_run' "
        "actually returned; do not infer or assume details the response didn't provide."
    ),
    tools=[get_weather, call_e_toolset],
)

app = App(
    root_agent=root_agent,
    name="app",
)
